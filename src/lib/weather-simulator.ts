/**
 * 날씨 시뮬레이션 엔진
 * 계절과 시간에 따라 현실적인 날씨 가격 생성
 * 참고: docs/architecture.md 408-478줄
 */

import { SEASONAL_PATTERNS, TIME_MULTIPLIERS } from '@/constants/weather-patterns';
import type { WeatherType, WeatherTrend } from '@/types';

/**
 * 범위 내 랜덤 숫자 생성
 */
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 특정 날씨의 현재 가격 생성
 * @param type - 날씨 종류
 * @param date - 기준 날짜/시간 (기본값: 현재)
 * @returns 생성된 가격 (에너지)
 */
export function generateWeatherPrice(
  type: WeatherType,
  date: Date = new Date()
): number {
  // 1. 현재 월(1-12)과 시간(0-23) 가져오기
  const month = (date.getMonth() + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  const hour = date.getHours() as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
  
  // 2. 해당 월의 계절 패턴 가져오기
  const pattern = SEASONAL_PATTERNS[type][month];
  
  // 3. 해당 시간의 가중치 가져오기
  const timeMultiplier = TIME_MULTIPLIERS[type][hour];
  
  // 4. 기본 가격 생성 (계절 패턴 범위 내)
  const basePrice = randomInRange(pattern.min, pattern.max);
  
  // 5. 시간대 가중치 적용
  const priceWithTime = basePrice * timeMultiplier;
  
  // 6. 랜덤 변동성 추가 (더 현실적으로)
  // volatility가 0.2면 ±20% 변동
  const volatilityFactor = 1 + (Math.random() - 0.5) * pattern.volatility * 2;
  const finalPrice = priceWithTime * volatilityFactor;
  
  // 7. 최소 가격 보장 (100 이상) 및 반올림
  return Math.max(100, Math.round(finalPrice));
}

/**
 * 4가지 날씨 모두의 가격 생성
 * @param date - 기준 날짜/시간
 * @returns 날씨별 가격 객체
 */
export function generateAllWeatherPrices(
  date: Date = new Date()
): Record<WeatherType, number> {
  return {
    solar: generateWeatherPrice('solar', date),
    wind: generateWeatherPrice('wind', date),
    water: generateWeatherPrice('water', date),
    heat: generateWeatherPrice('heat', date),
  };
}

/**
 * 추세 계산 (이전 가격 대비 변화)
 * @param currentPrice - 현재 가격
 * @param previousPrice - 이전 가격
 * @returns 추세 ('rising', 'falling', 'stable')
 */
export function calculateTrend(
  currentPrice: number,
  previousPrice: number
): WeatherTrend {
  const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
  
  // 1% 이상 올랐으면 상승
  if (changePercent > 1) return 'rising';
  
  // 1% 이상 내렸으면 하락
  if (changePercent < -1) return 'falling';
  
  // 그 외는 안정
  return 'stable';
}

/**
 * 변화율 계산 헬퍼 함수
 */
export function calculateChange(currentPrice: number, previousPrice: number) {
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;
  
  return {
    change,           // 절대값
    changePercent,    // 퍼센트
  };
}
