/**
 * 날씨 상세 페이지
 * 참고: docs/wireframes.md 468-663줄
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useWeatherPrices } from '@/hooks/useWeatherPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { WeatherChart } from '@/components/weather/WeatherChart';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { TrendIndicator } from '@/components/weather/TrendIndicator';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { formatEnergy, getCurrentSeason } from '@/lib/utils';
import { WEATHER_CONFIGS, TREND_COLORS } from '@/constants/config';
import type { WeatherType } from '@/types';

export default function WeatherDetailPage({ params }: { params: Promise<{ type: WeatherType }> }) {
  const router = useRouter();
  const { weatherData } = useWeatherPrices();
  const { portfolio, executeTrade, getHolding, getMaxBuyQuantity, getMaxSellQuantity } = usePortfolio(weatherData);
  
  // Next.js 15: params is now a Promise
  const [weatherType, setWeatherType] = useState<WeatherType | null>(null);
  
  useEffect(() => {
    params.then(p => setWeatherType(p.type));
  }, [params]);
  
  const weather = weatherData.find(w => w.type === weatherType);
  const holding = weatherType ? getHolding(weatherType) : undefined;
  
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!weather || !weatherType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">로딩 중...</p>
      </div>
    );
  }

  const config = WEATHER_CONFIGS[weather.type];
  const trendConfig = TREND_COLORS[weather.trend];
  const maxBuy = getMaxBuyQuantity(weather.type);
  const maxSell = getMaxSellQuantity(weather.type);
  const maxQuantity = action === 'buy' ? maxBuy : maxSell;

  const totalAmount = quantity * weather.price;
  const remainingEnergy = action === 'buy'
    ? portfolio.energy - totalAmount
    : portfolio.energy + totalAmount;

  const handleTrade = async () => {
    if (maxQuantity === 0) return;
    
    setIsProcessing(true);
    try {
      await executeTrade(action, weather.type, quantity);
      router.push('/home');
    } catch (error) {
      alert(error instanceof Error ? error.message : '거래 실패');
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen pb-6">
      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">{config.name}</h1>
        <div className="w-6" />
      </header>

      {/* 가격 정보 */}
      <section className="px-6 mb-6 text-center">
        <WeatherIcon type={weather.type} trend={weather.trend} size="lg" />
        <p className="text-3xl font-bold mt-4 mb-2">
          {formatEnergy(weather.price)}
        </p>
        <TrendIndicator
          change={weather.change}
          changePercent={weather.changePercent}
          trend={weather.trend}
        />
      </section>

      {/* 24시간 차트 */}
      <section className="px-6 mb-6">
        <WeatherChart history={weather.history} trend={weather.trend} />
        <div className="text-center mt-4">
          <p className="text-2xl mb-2">{trendConfig.emoji}</p>
          <p className="font-semibold">{trendConfig.text}</p>
        </div>
      </section>

      {/* 계절 힌트 */}
      <section className="px-6 mb-6">
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-sm font-semibold mb-1">💡 지금 계절</p>
          <p className="text-sm text-gray-700">
            {getCurrentSeason()} - 이 시기에 {config.name}는 어떻게 변할까요?
          </p>
        </div>
      </section>

      {/* 거래 인터페이스 */}
      <section className="px-6">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          {/* 사기/팔기 탭 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => { setAction('buy'); setQuantity(1); }}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                action === 'buy'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              사기
            </button>
            <button
              onClick={() => { setAction('sell'); setQuantity(1); }}
              disabled={maxSell === 0}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                action === 'sell'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              } disabled:opacity-50`}
            >
              팔기 {holding && `(${holding.quantity}개)`}
            </button>
          </div>

          {/* 보유 정보 (팔기 모드) */}
          {action === 'sell' && holding && (
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">가지고 있는 것: {holding.quantity}개</p>
              <p className="text-sm text-gray-600">평균 매수가: {formatEnergy(holding.avgBuyPrice)}</p>
            </div>
          )}

          {/* 수량 선택 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">수량</label>
              <span className="text-sm text-gray-600">
                최대: {maxQuantity}개
              </span>
            </div>
            <Slider
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={Math.max(maxQuantity, 1)}
              disabled={maxQuantity === 0}
            />
            <p className="text-center text-2xl font-bold mt-2">{quantity}개</p>
          </div>

          {/* 예상 결과 */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">총 금액</span>
              <span className="font-semibold">{formatEnergy(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">남은 에너지</span>
              <span className="font-semibold">{formatEnergy(remainingEnergy)}</span>
            </div>
            {action === 'sell' && holding && (
              <div className="flex justify-between">
                <span className="text-sm">예상 손익</span>
                <span className={`font-semibold ${
                  (weather.price - holding.avgBuyPrice) > 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {formatEnergy((weather.price - holding.avgBuyPrice) * quantity)}
                </span>
              </div>
            )}
          </div>

          {/* 확인 버튼 */}
          <Button
            onClick={handleTrade}
            disabled={maxQuantity === 0 || isProcessing}
            variant={action === 'buy' ? 'primary' : 'danger'}
            className="w-full"
          >
            {isProcessing ? '처리 중...' : 
             action === 'buy' ? '확인! 사기 →' : '확인! 팔기 →'}
          </Button>
        </div>
      </section>
    </main>
  );
}
