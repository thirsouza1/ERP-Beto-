import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Logo({ className, variant = 'full' }: { className?: string; variant?: 'icon' | 'full' | 'compact' }) {
  if (variant === 'icon') {
    return (
      <div className={cn("relative flex-shrink-0 flex items-center justify-center group", className)}>
        <div className="absolute inset-0 bg-leather-tan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-4xl font-serif text-leather-dark tracking-tighter drop-shadow-md font-bold relative z-10">BM</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="w-10 h-10 bg-navy-dark rounded-xl flex items-center justify-center text-white leather-texture shadow-lg border border-white/10">
          <span className="text-xl font-black tracking-tighter">BM</span>
        </div>
        <div className="text-left">
          <h1 className="text-sm font-black text-white uppercase leading-none tracking-wider">Beto Marinzeck</h1>
          <p className="text-[7px] font-black text-leather-tan uppercase tracking-[0.3em] mt-0.5">Representações</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center text-center group", className)}>
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
