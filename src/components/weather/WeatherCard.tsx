/**
 * WeatherCard 컴포넌트
 * 참고: docs/architecture.md 866-935줄
 */

'use client';

import { motion } from 'motion/react';
import { WeatherIcon } from './WeatherIcon';
import { TrendIndicator } from './TrendIndicator';
import { formatEnergy } from '@/lib/utils';
import type { WeatherData } from '@/types';
import { TREND_COLORS } from '@/constants/config';

interface WeatherCardProps {
  weather: WeatherData;
  onClick: () => void;
}

export function WeatherCard({ weather, onClick }: WeatherCardProps) {
  const trendConfig = TREND_COLORS[weather.trend];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${trendConfig.bg}
        rounded-3xl p-6
        shadow-md hover:shadow-lg
        transition-shadow duration-200
        cursor-pointer
      `}
    >
      {/* 헤더: 이름 + 상태 이모지 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <WeatherIcon type={weather.type} trend={weather.trend} size="sm" animated={false} />
          <h3 className="text-lg font-semibold">{weather.name}</h3>
        </div>
        <span className="text-2xl">{trendConfig.emoji}</span>
      </div>

      {/* 가격 */}
      <div className="mb-3">
        <p className="text-2xl font-bold">
          {formatEnergy(weather.price)}
        </p>
        <TrendIndicator
          change={weather.change}
          changePercent={weather.changePercent}
          trend={weather.trend}
        />
      </div>

      {/* 미니 스파크라인 (간단한 버전) */}
      <div className="h-8 flex items-end gap-0.5">
        {weather.history.slice(-8).map((h, i) => {
          const maxPrice = Math.max(...weather.history.slice(-8).map(h => h.price));
          const minPrice = Math.min(...weather.history.slice(-8).map(h => h.price));
          const range = maxPrice - minPrice || 1;
          const height = ((h.price - minPrice) / range) * 100;
          
          return (
            <div
              key={i}
              className="flex-1 bg-gray-300 rounded-t"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
