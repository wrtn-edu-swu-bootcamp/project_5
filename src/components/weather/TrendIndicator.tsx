/**
 * TrendIndicator 컴포넌트
 * 참고: docs/design-guide.md 145-214줄
 */

'use client';

import { motion } from 'motion/react';
import { formatNumber, formatPercent } from '@/lib/utils';
import type { WeatherTrend } from '@/types';

interface TrendIndicatorProps {
  change: number;           // 변화량 (절대값)
  changePercent: number;    // 변화율 (%)
  trend: WeatherTrend;
}

export function TrendIndicator({
  change,
  changePercent,
  trend,
}: TrendIndicatorProps) {
  // 상태별 설정
  const trendConfig = {
    rising: {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      emoji: '🔥',
      arrow: '↗',
    },
    falling: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      emoji: '❄️',
      arrow: '↘',
    },
    stable: {
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      emoji: '⚪',
      arrow: '→',
    },
  };
  
  const config = trendConfig[trend];
  const sign = change >= 0 ? '+' : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${config.bgColor}`}
    >
      <span>{config.emoji}</span>
      <span className={`${config.color} font-semibold text-sm`}>
        {config.arrow} {sign}{formatNumber(Math.abs(change))} ({formatPercent(changePercent)})
      </span>
    </motion.div>
  );
}
