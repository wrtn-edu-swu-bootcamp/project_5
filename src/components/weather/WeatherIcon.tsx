/**
 * WeatherIcon 컴포넌트
 * 참고: docs/design-guide.md 579-686줄
 */

'use client';

import { motion } from 'motion/react';
import type { WeatherType, WeatherTrend } from '@/types';
import { WEATHER_CONFIGS } from '@/constants/config';

interface WeatherIconProps {
  type: WeatherType;
  trend?: WeatherTrend;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function WeatherIcon({
  type,
  trend = 'stable',
  size = 'md',
  animated = true,
}: WeatherIconProps) {
  const config = WEATHER_CONFIGS[type];
  
  // 크기 설정
  const sizes = {
    sm: 'text-2xl w-10 h-10',  // 24px
    md: 'text-4xl w-16 h-16',  // 48px
    lg: 'text-6xl w-24 h-24',  // 60px
  };
  
  // 상태별 링 색상
  const ringColors = {
    rising: 'ring-2 ring-red-500',
    falling: 'ring-2 ring-blue-500',
    stable: 'ring-2 ring-gray-300',
  };
  
  // 애니메이션 설정
  const shouldAnimate = trend !== 'stable' && animated;

  return (
    <motion.div
      className={`
        ${sizes[size]}
        ${ringColors[trend]}
        rounded-full
        flex items-center justify-center
        glass
      `}
      animate={shouldAnimate ? {
        scale: [1, 1.1, 1],
      } : undefined}
      transition={shouldAnimate ? {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
    >
      <span className="leading-none">{config.emoji}</span>
    </motion.div>
  );
}
