/**
 * 메인 홈 페이지
 * 참고: docs/architecture.md 1310-1408줄
 */

'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useWeatherPrices } from '@/hooks/useWeatherPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { formatEnergy, formatNumber, formatPercent, getCurrentSeason, getSeasonEmoji } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  const { weatherData, isLoading, lastUpdate } = useWeatherPrices();
  const { totalValue, profitLoss, profitLossPercent, getHolding } = usePortfolio(weatherData);

  if (isLoading || weatherData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4"
          >
            🌤️
          </motion.div>
          <p className="text-xl text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  const isProfitable = profitLoss >= 0;
  const season = getCurrentSeason();
  const seasonEmoji = getSeasonEmoji();

  return (
    <main className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🌤️ Tweddle</h1>
        <Link href="/settings">
          <button className="text-2xl">⚙️</button>
        </Link>
      </header>

      {/* 원형 레이아웃 */}
      <div className="relative w-full min-h-[400px] flex items-center justify-center mb-[58px] px-6 mt-10">
        {/* 원형 컨테이너 */}
        <div className="relative w-[400px] h-[400px]">
          {/* 중앙: 총 에너지 표시 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center p-6"
          >
            <p className="text-sm text-gray-600 mb-1 drop-shadow">💰 총 자산</p>
            <p className="text-3xl font-bold drop-shadow-md">
              {formatNumber(totalValue)}
            </p>
            <p className="text-sm text-gray-600 mb-2 drop-shadow">⚡ 에너지</p>
            <motion.div
              animate={isProfitable ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className={`text-base font-semibold drop-shadow-md ${
                isProfitable ? 'text-green-600' : 'text-red-600'
              }`}>
                {isProfitable ? '🟢' : '🔴'} {profitLoss >= 0 ? '+' : ''}{formatNumber(profitLoss)} ⚡
                <span className="text-xs ml-1">
                  ({formatPercent(profitLossPercent)})
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* 원형 배치: 4가지 날씨 아이콘 */}
          {weatherData.map((weather, index) => {
            // 12시 방향부터 시계방향으로 90도씩 배치
            // index 0: 위(12시), 1: 오른쪽(3시), 2: 아래(6시), 3: 왼쪽(9시)
            const angle = (index * 90 - 90) * (Math.PI / 180);
            // 태양 에너지(index 0): 180px, 바람/온도(index 1,3): 150px, 수분(index 2): 140px
            const radius = index === 0 ? 180 : (index === 1 || index === 3) ? 150 : 140;
            const centerX = 200; // 컨테이너 너비의 절반
            const centerY = 200; // 컨테이너 높이의 절반
            const iconSize = 96; // lg 사이즈 (w-24 = 96px)
            
            const x = centerX + Math.cos(angle) * radius - iconSize / 2;
            let y = centerY + Math.sin(angle) * radius - iconSize / 2;
            
            // 바람(index 1)과 온도(index 3) 에너지는 높이를 10px 위로
            if (index === 1 || index === 3) {
              y -= 10;
            }

            // 보유량 조회
            const holding = getHolding(weather.type);
            const hasHolding = holding && holding.quantity > 0;

            return (
              <motion.div
                key={weather.type}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute z-20"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              >
                <Link href={`/weather/${weather.type}`}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none flex flex-col items-center"
                  >
                    <WeatherIcon
                      type={weather.type}
                      trend={weather.trend}
                      size="lg"
                      animated={true}
                    />
                    
                    {/* 보유량 표시 */}
                    {hasHolding && (
                      <div className="mt-2 text-center bg-white rounded-lg px-2 py-1 shadow-md">
                        <p className="text-xs font-bold text-gray-800">
                          {holding.quantity}개
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatEnergy(holding.currentValue)}
                        </p>
                      </div>
                    )}
                  </motion.button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 계절 정보 */}
      <section className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <p className="text-center text-gray-700">
            {seasonEmoji} <span className="font-semibold">{new Date().getMonth() + 1}월 {season}</span>
            <span className="mx-2">•</span>
            <span className="text-sm">3분마다 자동 업데이트</span>
          </p>
          <p className="text-center text-sm text-gray-500 mt-1">
            마지막 업데이트: {new Date(lastUpdate).toLocaleTimeString('ko-KR')}
          </p>
        </div>
      </section>

      {/* 내 보관함 버튼 */}
      <section className="px-6">
        <Link href="/portfolio">
          <Button variant="primary" className="w-full">
            내 보관함 보기 →
          </Button>
        </Link>
      </section>
    </main>
  );
}