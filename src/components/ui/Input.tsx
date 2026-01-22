/**
 * Input 컴포넌트
 * 참고: docs/wireframes.md 1019-1034줄
 */

'use client';

import { cn } from '@/lib/utils';

interface InputProps {
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
}

export function Input({
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  className = '',
  min,
  max,
}: InputProps) {
  const baseStyles = 'w-full px-4 py-3 text-base bg-white border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors';
  
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      max={max}
      className={cn(baseStyles, disabled && 'opacity-50 cursor-not-allowed', className)}
    />
  );
}
