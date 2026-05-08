import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Logo({ className, variant = 'full' }: { className?: string; variant?: 'icon' | 'full' | 'compact' }) {
  const size = variant === 'icon' ? 'w-16 h-16' : variant === 'compact' ? 'w-18 h-18' : 'w-24 h-24';
  
  return (
    <div className={cn("relative flex items-center justify-center transition-all duration-300", size, className)}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full fill-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Double Border - Slightly thicker */}
        <circle cx="50" cy="50" r="48" stroke="#c19a6b" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="44" stroke="#c19a6b" strokeWidth="0.8" />
        
        {/* Top Text Path - Larger Font */}
        <path id="topTextCurve" d="M 18 50 A 32 32 0 0 1 82 50" fill="none" />
        <text className="fill-[#c19a6b] font-black uppercase text-[8px] tracking-[0.1em]">
          <textPath xlinkHref="#topTextCurve" startOffset="50%" textAnchor="middle">
            Beto Marinzeck
          </textPath>
        </text>

        {/* Center BM - Slightly larger */}
        <text 
          x="50" 
          y="58" 
          textAnchor="middle" 
          className="fill-[#c19a6b] font-serif text-[32px] font-bold"
          style={{ letterSpacing: '-0.05em' }}
        >
          BM
        </text>

        {/* Bottom Text Path - Larger Font */}
        <path id="bottomTextCurve" d="M 18 50 A 32 32 0 0 0 82 50" fill="none" />
        <text className="fill-[#c19a6b] font-black uppercase text-[6px] tracking-[0.2em]">
          <textPath xlinkHref="#bottomTextCurve" startOffset="50%" textAnchor="middle">
            CK COUROS
          </textPath>
        </text>

        {/* Side Diamonds - Slightly larger */}
        <path d="M 10 50 L 13 47 L 16 50 L 13 53 Z" fill="#c19a6b" />
        <path d="M 84 50 L 87 47 L 90 50 L 87 53 Z" fill="#c19a6b" />
      </svg>
    </div>
  );
}
