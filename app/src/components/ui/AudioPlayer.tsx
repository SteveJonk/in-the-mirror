'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';

const fmt = (s: number) =>
  Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '--:--';

const scrubClass = cn(
  'm-0 block h-11 w-full cursor-pointer appearance-none bg-transparent',
  '[&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-fg)_var(--p,0%),color-mix(in_srgb,var(--color-fg)_22%,transparent)_var(--p,0%))]',
  '[&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-fg',
  '[&::-moz-range-track]:h-0.5 [&::-moz-range-track]:bg-fg/22 [&::-moz-range-progress]:h-0.5 [&::-moz-range-progress]:bg-fg',
  '[&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-fg',
);

const skipClass = 'min-h-11 underline decoration-1 underline-offset-[6px] hover:decoration-2';

/** A quiet audio player: play/pause, a scrubber and 15-second skips. */
export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const known = Number.isFinite(duration);

  // The metadata often arrives before hydration, so the event above is missed.
  useEffect(() => {
    if (audio.current && audio.current.readyState >= 1) setDuration(audio.current.duration);
  }, []);

  const seek = (t: number) => {
    if (audio.current) audio.current.currentTime = t;
  };

  return (
    <div role='group' aria-label='Audiospeler'>
      <audio
        ref={audio}
        preload='metadata'
        src={src}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <div className='flex items-center gap-5'>
        <button
          type='button'
          onClick={() => (audio.current?.paused ? audio.current.play().catch(() => {}) : audio.current?.pause())}
          className='flex size-[4.5rem] shrink-0 items-center justify-center rounded-full border border-fg transition-colors duration-200 hover:border-brand hover:bg-brand aria-pressed:border-brand aria-pressed:bg-brand'
          aria-label={playing ? 'Pauzeren' : 'Afspelen'}
          aria-pressed={playing}
        >
          {playing ? (
            <svg viewBox='0 0 24 24' className='size-6 fill-fg' aria-hidden='true'>
              <rect x='6' y='4.5' width='4.2' height='15' />
              <rect x='13.8' y='4.5' width='4.2' height='15' />
            </svg>
          ) : (
            <svg viewBox='0 0 24 24' className='size-6 translate-x-[2px] fill-fg' aria-hidden='true'>
              <path d='M7 4.5v15l12-7.5z' />
            </svg>
          )}
        </button>
        <div>
          <p className='font-display text-[1.7rem] leading-tight'>{title}</p>
          <p className='text-[0.95rem] text-muted'>
            Duur <span className='tabular-nums'>{fmt(duration)}</span>
          </p>
        </div>
      </div>

      <div className='mt-7'>
        <input
          type='range'
          min='0'
          max={known ? duration : 100}
          step='0.1'
          value={time}
          onChange={(e) => seek(parseFloat(e.currentTarget.value))}
          className={scrubClass}
          style={{ '--p': known ? `${(time / duration) * 100}%` : '0%' } as CSSProperties}
          aria-label='Voortgang van het fragment'
          aria-valuetext={`${fmt(time)}${known ? ` van ${fmt(duration)}` : ''}`}
        />
        <div className='mt-1 flex justify-between text-[0.92rem] text-muted tabular-nums'>
          <span>{fmt(time)}</span>
          <span>{known ? `-${fmt(duration - time)}` : '--:--'}</span>
        </div>
      </div>

      <div className='mt-2 flex gap-8 text-[0.98rem]'>
        <button type='button' onClick={() => seek(Math.max(0, time - 15))} className={skipClass}>
          15 seconden terug
        </button>
        <button
          type='button'
          onClick={() => seek(Math.min(known ? duration : Infinity, time + 15))}
          className={skipClass}
        >
          15 seconden vooruit
        </button>
      </div>
    </div>
  );
}
