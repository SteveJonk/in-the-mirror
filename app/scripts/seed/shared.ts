/**
 * Sanity write helpers for the seed.
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor or Admin) in app/.env
 * Create one at: https://www.sanity.io/manage -> your project -> API -> Tokens
 *
 * Every write is idempotent: documents have fixed ids and are replaced in
 * place, and assets are reused by filename. Re-running the seed updates
 * rather than duplicates.
 */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient, type SanityClient } from '@sanity/client';
import { pageId } from './content';

const ASSETS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
}
if (!token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN. Create a token with Editor rights at https://www.sanity.io/manage and add it to app/.env',
  );
}

export const projectRef = `${projectId}/${dataset}`;

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-26',
  token,
  useCdn: false,
});

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
};

const uploads = new Map<string, Promise<string>>();

/**
 * Upload once per filename; later runs reuse the asset that is already there.
 * Memoised, because the same image appears in several places of one run.
 */
function upload(kind: 'image' | 'file', filename: string, read: () => Promise<Buffer>) {
  if (!uploads.has(filename)) uploads.set(filename, uploadOnce(kind, filename, read));
  return uploads.get(filename)!;
}

async function uploadOnce(kind: 'image' | 'file', filename: string, read: () => Promise<Buffer>) {
  const type = kind === 'image' ? 'sanity.imageAsset' : 'sanity.fileAsset';
  const existing = await client.fetch<string | null>(
    `*[_type == $type && originalFilename == $filename][0]._id`,
    { type, filename },
  );
  if (existing) {
    console.log(`  ↻ ${kind} ${filename}`);
    return existing;
  }
  const contentType = CONTENT_TYPES[path.extname(filename).toLowerCase()];
  const created = await client.assets
    .upload(kind, await read(), { filename, contentType })
    .catch((error: Error) => {
      throw new Error(`${filename}: ${error.message}`);
    });
  console.log(`  ↑ ${kind} ${filename}`);
  return created._id;
}

const local = (file: string) => () => readFile(path.join(ASSETS_DIR, file));

async function download(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed (${response.status}): ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

const reference = (_ref: string) => ({ _type: 'reference', _ref });

type Node = unknown;

/**
 * Walks seed content and turns its markers (see `content.ts`) into what Sanity
 * stores: uploaded assets and page references. Objects in arrays get a `_key`
 * derived from their position, so re-seeding keeps the same keys.
 */
export async function resolve(node: Node, keyPath = 'root'): Promise<Node> {
  if (Array.isArray(node)) {
    return Promise.all(
      node.map(async (item, index) => {
        const resolved = await resolve(item, `${keyPath}.${index}`);
        if (resolved && typeof resolved === 'object' && !Array.isArray(resolved) && !('_key' in resolved)) {
          const _key = createHash('sha1').update(`${keyPath}.${index}`).digest('hex').slice(0, 12);
          return { _key, ...resolved };
        }
        return resolved;
      }),
    );
  }
  if (!node || typeof node !== 'object') return node;

  const object = node as Record<string, unknown>;
  if ('__asset' in object) {
    const file = String(object.__asset);
    const id = await upload('image', file, local(file));
    return { _type: 'image', asset: reference(id), ...(object.alt ? { alt: object.alt } : {}) };
  }
  if ('__remote' in object) {
    const id = await upload('image', String(object.filename), () => download(String(object.__remote)));
    return { _type: 'image', asset: reference(id), ...(object.alt ? { alt: object.alt } : {}) };
  }
  if ('__file' in object) {
    const file = String(object.__file);
    const id = await upload('file', file, local(file));
    return { _type: 'file', asset: reference(id) };
  }
  if ('__page' in object) {
    return reference(pageId(String(object.__page)));
  }

  const entries = await Promise.all(
    Object.entries(object).map(async ([key, value]) => [key, await resolve(value, `${keyPath}.${key}`)]),
  );
  return Object.fromEntries(entries);
}

/** Resolve and write a set of documents in one transaction, replacing each by id. */
export async function replaceAll(documents: Array<{ _id: string; _type: string }>) {
  // One by one rather than as an array: array items get a `_key`, documents must not.
  const resolved = (await Promise.all(documents.map((document) => resolve(document, document._id)))) as Array<{
    _id: string;
    _type: string;
  }>;
  const transaction = client.transaction();
  for (const document of resolved) transaction.createOrReplace(document);
  await transaction.commit();
  for (const document of resolved) console.log(`✓ ${document._type} ${document._id}`);
}
