import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Logo({ className, variant = 'full' }: { className?: string; variant?: 'icon' | 'full' | 'compact' }) {
  if (variant === 'icon') {
    return (
      <div className={cn("relative flex-shrink-0", className)}>
        <div className="w-12 h-12 bg-navy-dark rounded-lg flex items-center justify-center border-2 border-leather-tan shadow-md leather-texture">
          <span className="text-lg font-black text-white">BM</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-shrink-0">
        <div className={cn(
          "bg-navy-dark rounded-xl flex items-center justify-center border-leather-tan shadow-lg leather-texture",
          variant === 'full' ? "w-16 h-16 border-4" : "w-10 h-10 border-2"
        )}>
          <span className={cn("font-black text-white", variant === 'full' ? "text-2xl" : "text-sm")}>BM</span>
        </div>
      </div>
      
      <div className="flex flex-col text-left">
        <h1 className={cn(
          "font-bold tracking-tight text-white leading-none",
          variant === 'full' ? "text-2xl" : "text-base"
        )}>
          Beto Marinzeck
        </h1>
        <div className={cn("bg-leather-tan opacity-60", variant === 'full' ? "h-px w-full my-1.5" : "h-[0.5px] w-full my-1")} />
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-black uppercase tracking-[0.3em] text-leather-tan",
            variant === 'full' ? "text-xs" : "text-[8px]"
          )}>
            CK COUROS
          </span>
        </div>
      </div>
    </div>
  );
}
