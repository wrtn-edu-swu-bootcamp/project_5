/**
 * 날씨 가격 관리 훅
 * 3분마다 자동으로 가격 업데이트
 * 참고: docs/architecture.md 480-572줄
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateAllWeatherPrices, calculateTrend, calculateChange } from '@/lib/weather-simulator';
import { WEATHER_CONFIGS, UPDATE_INTERVAL, HISTORY_LENGTH } from '@/constants/config';
import type { WeatherData, WeatherType } from '@/types';

/**
 * 날씨 가격 자동 업데이트 훅
 * @returns 날씨 데이터, 로딩 상태, 마지막 업데이트 시간
 */
export function useWeatherPrices() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  /**
   * 가격 업데이트 함수
   */
  const updatePrices = useCallback(() => {
    const now = new Date();
    const newPrices = generateAllWeatherPrices(now);
    const timestamp = now.getTime();

    setWeatherData(prevData => {
      // 첫 업데이트 (초기 로드)
      if (prevData.length === 0) {
        return Object.entries(WEATHER_CONFIGS).map(([type, config]) => {
          // 과거 48개 데이터 생성 (3분 간격 = 144분 = 2.4시간)
          const initialHistory = [];
          for (let i = 47; i >= 0; i--) {
            const pastTime = new Date(now.getTime() - i * UPDATE_INTERVAL);
            const pastPrice = generateAllWeatherPrices(pastTime)[type as WeatherType];
            initialHistory.push({
              timestamp: pastTime.getTime(),
              price: pastPrice,
            });
          }
          
          const currentPrice = initialHistory[initialHistory.length - 1].price;
          
          return {
            type: type as WeatherType,
            name: config.name,
            emoji: config.emoji,
            price: currentPrice,
            change: 0,
            changePercent: 0,
            trend: 'stable' as const,
            history: initialHistory,
          };
        });
      }

      // 기존 데이터 업데이트 (2번째 업데이트부터)
      return prevData.map(weather => {
        const newPrice = newPrices[weather.type];
        const oldPrice = weather.price;
        
        // 변화 계산
        const { change, changePercent } = calculateChange(newPrice, oldPrice);
        const trend = calculateTrend(newPrice, oldPrice);

        // 이력 추가 (최대 HISTORY_LENGTH개 유지)
        const newHistory = [
          ...weather.history,
          { timestamp, price: newPrice },
        ].slice(-HISTORY_LENGTH);  // 최근 480개만 유지

        return {
          ...weather,
          price: newPrice,
          change,
          changePercent,
          trend,
          history: newHistory,
        };
      });
    });

    setLastUpdate(timestamp);
  }, []);

  // 초기 로드 및 3분 주기 자동 업데이트
  useEffect(() => {
    // 1. 즉시 첫 업데이트
    updatePrices();
    setIsLoading(false);

    // 2. 3분마다 자동 업데이트 설정
    const interval = setInterval(updatePrices, UPDATE_INTERVAL);

    // 3. 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(interval);
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  return {
    weatherData,      // 4가지 날씨 데이터
    isLoading,        // 로딩 상태
    lastUpdate,       // 마지막 업데이트 시간
    updatePrices,     // 수동 업데이트 함수 (필요시)
  };
}

/**
 * 특정 날씨 하나의 데이터 가져오기 (편의 함수)
 */
export function useWeatherData(type: WeatherType) {
  const { weatherData, isLoading } = useWeatherPrices();
  const weather = weatherData.find(w => w.type === type);
  
  return {
    weather,
    isLoading,
  };
}
