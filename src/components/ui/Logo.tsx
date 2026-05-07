import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Logo({ className, variant = 'full' }: { className?: string; variant?: 'icon' | 'full' | 'compact' }) {
  if (variant === 'icon') {
    return (
      <div className={cn("relative flex-shrink-0 flex items-center justify-center", className)}>
        <span className="text-3xl font-serif text-leather-dark tracking-tighter">BM</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <span className="text-6xl font-serif text-leather-dark leading-none">BM</span>
      <div className="mt-4 flex flex-col items-center">
        <h1 className="font-serif text-xl tracking-widest text-leather-dark uppercase">
          Beto Marinzeck
        </h1>
        <div className="h-px w-24 bg-leather-dark/20 my-2" />
        <span className="font-sans text-[10px] font-medium tracking-[0.4em] text-leather-dark/60 uppercase">
          CK COUROS
        </span>
      </div>
    </div>
  );
}
