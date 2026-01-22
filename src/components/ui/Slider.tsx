/**
 * Slider 컴포넌트
 * 참고: docs/wireframes.md 1026-1034줄
 */

'use client';

import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className = '',
}: SliderProps) {
  return (
    <div className={cn('w-full', className)}>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
          'accent-blue-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      <div className="flex justify-between mt-1 text-sm text-gray-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
