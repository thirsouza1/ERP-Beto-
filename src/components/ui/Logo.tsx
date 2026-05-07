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
        <span className="text-4xl font-serif text-leather-dark tracking-tighter drop-shadow-sm font-bold">BM</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="relative mb-2">
        <span className="text-7xl sm:text-8xl font-sans text-leather-dark leading-none tracking-[-0.08em] font-[900] uppercase">
          B<span className="text-leather-dark/90">M</span>
        </span>
      </div>
      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-sans text-[18px] sm:text-[20px] tracking-[0.1em] uppercase mb-1 leather-debossed">
          Beto Marinzeck
        </h1>
        <div className="flex items-center gap-2 w-full max-w-[180px]">
          <div className="h-[1.5px] flex-1 bg-leather-dark/20" />
          <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] uppercase whitespace-nowrap leather-debossed">
            CK COUROS
          </span>
          <div className="h-[1.5px] flex-1 bg-leather-dark/20" />
        </div>
      </div>
    </div>
  );
}
