/**
 * 버튼 컴포넌트
 * 참고: docs/design-guide.md 967-987줄
 */

'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  // 베이스 스타일
  const baseStyles = 'px-6 py-4 rounded-xl font-semibold transition-colors min-w-[44px] min-h-[44px]';
  
  // 버튼 타입별 스타일
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  };
  
  // disabled 스타일
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={cn(
        baseStyles,
        variants[variant],
        disabled && disabledStyles,
        className
      )}
    >
      {children}
    </motion.button>
  );
}
