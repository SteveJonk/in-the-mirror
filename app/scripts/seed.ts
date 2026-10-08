/**
 * Seed Sanity with the site's content. Runs every target, or only the ones
 * you name.
 *
 * Usage (from app/):
 *   npm run seed                 # everything
 *   npm run seed -- pages        # only the pages (and the episodes they show)
 *
 * Each target only touches its own documents and is safe to re-run. The
 * content itself lives in scripts/seed/content.ts.
 */
import {
  EPISODES,
  FOOTER,
  FORMS,
  FORM_SETTINGS,
  NAVIGATION,
  PAGES,
  SITE_INFORMATION,
} from './seed/content';
import { projectRef, replaceAll } from './seed/shared';

const TARGETS = {
  site: () => replaceAll([SITE_INFORMATION, FOOTER]),
  forms: () => replaceAll([FORM_SETTINGS, ...FORMS]),
  // Pages and the documents they reference (navigation points at the pages),
  // in one transaction so every reference resolves when it is committed.
  pages: () => replaceAll([...EPISODES, ...PAGES, NAVIGATION]),
} as const;

type TargetName = keyof typeof TARGETS;

function parseTargets(args: string[]): TargetName[] {
  if (args.length === 0) return Object.keys(TARGETS) as TargetName[];

  const unknown = args.filter((arg) => !(arg in TARGETS));
  if (unknown.length > 0) {
    throw new Error(`Unknown target(s): ${unknown.join(', ')}. Available: ${Object.keys(TARGETS).join(', ')}`);
  }
  return args as TargetName[];
}

async function main() {
  const targets = parseTargets(process.argv.slice(2));
  console.log(`Seeding Sanity project ${projectRef} — ${targets.join(', ')}\n`);

  for (const target of targets) {
    console.log(target);
    await TARGETS[target]();
    console.log('');
  }

  console.log('Done. Refresh the site to see the changes.');
}

main().catch((error) => {
  console.error('\nSeed failed:', error.message || error);
  process.exit(1);
});
