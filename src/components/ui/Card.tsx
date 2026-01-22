/**
 * 카드 컴포넌트
 * 참고: docs/design-guide.md 225-238줄
 */

'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) {
  const baseStyles = 'bg-white rounded-3xl p-6 shadow-md';
  
  const Component = hoverable || onClick ? motion.div : 'div';
  
  const motionProps = hoverable || onClick ? {
    whileHover: { scale: 1.02, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' },
    whileTap: onClick ? { scale: 0.98 } : {},
    transition: { duration: 0.2 },
  } : {};

  return (
    <Component
      className={cn(baseStyles, onClick && 'cursor-pointer', className)}
      onClick={onClick}
      {...(Component === motion.div ? motionProps : {})}
    >
      {children}
    </Component>
  );
}
