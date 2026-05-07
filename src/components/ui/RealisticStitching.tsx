import React from 'react';
import { cn } from '../../lib/utils';

interface RealisticStitchingProps {
  className?: string;
  variant?: 'card' | 'background';
}

export default function RealisticStitching({ className, variant = 'card' }: RealisticStitchingProps) {
  if (variant === 'background') {
    return (
      <div className={cn("artisan-stitching-bl", className)}>
        <div className="curve" />
      </div>
    );
  }

  return (
    <div className={cn("realistic-stitching-corner", className)}>
      {/* Top Stitch */}
      <div className="stitch-pos-top stitch-h">
        <div className="stitch-hole-pattern stitch-h" />
        <div className="stitch-thread-pattern stitch-h" />
      </div>
      {/* Bottom Stitch */}
      <div className="stitch-pos-bottom stitch-h">
        <div className="stitch-hole-pattern stitch-h" />
        <div className="stitch-thread-pattern stitch-h" />
      </div>
      {/* Left Stitch */}
      <div className="stitch-pos-left stitch-v">
        <div className="stitch-hole-pattern stitch-v" />
        <div className="stitch-thread-pattern stitch-v" />
      </div>
      {/* Right Stitch */}
      <div className="stitch-pos-right stitch-v">
        <div className="stitch-hole-pattern stitch-v" />
        <div className="stitch-thread-pattern stitch-v" />
      </div>
    </div>
  );
}
