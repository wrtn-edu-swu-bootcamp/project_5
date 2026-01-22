/**
 * 내 보관함 페이지
 * 참고: docs/wireframes.md 669-831줄
 */

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useWeatherPrices } from '@/hooks/useWeatherPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { formatEnergy, formatPercent, formatTimeAgo } from '@/lib/utils';
import { WEATHER_CONFIGS } from '@/constants/config';

export default function PortfolioPage() {
  const router = useRouter();
  const { weatherData } = useWeatherPrices();
  const { portfolio, totalValue, profitLoss, profitLossPercent } = usePortfolio(weatherData);

  const isProfitable = profitLoss >= 0;
  const hasHoldings = portfolio.holdings.length > 0;

  return (
    <main className="min-h-screen pb-6">
      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">내 보관함</h1>
        <Link href="/settings">
          <button className="text-2xl">⚙️</button>
        </Link>
      </header>

      {/* 총 자산 요약 */}
      <section className="px-6 mb-6">
        <Card>
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">내가 가진 전부</p>
            <p className="text-4xl font-bold mb-2">
              {formatEnergy(totalValue)}
            </p>
            <div className="h-px bg-gray-200 my-4" />
            <p className="text-sm text-gray-600 mb-1">얼마나 벌었는지</p>
            <motion.p
              animate={isProfitable ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`text-2xl font-bold ${
                isProfitable ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isProfitable ? '🟢' : '🔴'} {profitLoss >= 0 ? '+' : ''}{formatEnergy(profitLoss)}
              <span className="text-lg ml-2">
                ({formatPercent(profitLossPercent)})
              </span>
            </motion.p>
            <p className="text-sm text-gray-600 mt-2">
              {isProfitable ? '잘했어요! 🎉' : '조금 손해 봤어요 😔'}
            </p>
          </div>
        </Card>
      </section>

      {/* 가지고 있는 날씨 */}
      <section className="px-6 mb-6">
        <h2 className="text-xl font-bold mb-4">가지고 있는 날씨</h2>
        
        {hasHoldings ? (
          <div className="space-y-4">
            {portfolio.holdings.map((holding) => {
              const config = WEATHER_CONFIGS[holding.type];
              const weather = weatherData.find(w => w.type === holding.type);
              const isProfit = holding.profitLoss >= 0;

              return (
                <Card key={holding.type} hoverable>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <WeatherIcon type={holding.type} trend={weather?.trend || 'stable'} size="sm" />
                      <div>
                        <h3 className="font-semibold">{config.name} {holding.quantity}개</h3>
                        <p className="text-sm text-gray-600">
                          샀을 때: {formatEnergy(holding.avgBuyPrice)}
                        </p>
                        <p className="text-sm text-gray-600">
                          지금: {formatEnergy(holding.currentPrice)}
                        </p>
                      </div>
                    </div>
                    {weather && (
                      <span className="text-2xl">
                        {weather.trend === 'rising' ? '🔥' : weather.trend === 'falling' ? '❄️' : '⚪'}
                      </span>
                    )}
                  </div>

                  <div className={`mb-3 p-2 rounded-lg ${
                    isProfit ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      isProfit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isProfit ? '🟢' : '🔴'} 번 돈: {formatEnergy(holding.profitLoss)} ({formatPercent(holding.profitLossPercent)})
                    </p>
                  </div>

                  <Link href={`/weather/${holding.type}`}>
                    <Button variant="secondary" className="w-full">
                      팔기
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <p className="text-center text-gray-600 py-8">
              아직 날씨를 사지 않았어요<br />
              홈에서 날씨를 사보세요!
            </p>
            <Link href="/home">
              <Button variant="primary" className="w-full mt-4">
                홈으로 가기
              </Button>
            </Link>
          </Card>
        )}
      </section>

      {/* 사고 판 기록 */}
      {portfolio.transactions.length > 0 && (
        <section className="px-6 mb-6">
          <h2 className="text-xl font-bold mb-4">사고 판 기록</h2>
          <div className="space-y-3">
            {portfolio.transactions.slice(0, 10).map((tx) => {
              const config = WEATHER_CONFIGS[tx.type];
              const isBuy = tx.action === 'buy';

              return (
                <Card key={tx.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{config.emoji}</span>
                      <div>
                        <p className="font-semibold">
                          {config.name} {tx.quantity}개 {isBuy ? '샀어요' : '팔았어요'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatEnergy(tx.totalAmount)}
                          {!isBuy && tx.profitLoss !== undefined && (
                            <span className={`ml-2 ${tx.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {tx.profitLoss >= 0 ? '🟢' : '🔴'} {formatEnergy(tx.profitLoss)}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(tx.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
