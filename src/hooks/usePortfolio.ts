/**
 * 포트폴리오 관리 훅
 * 참고: docs/architecture.md 1414-1474줄
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { loadPortfolio, savePortfolio, createInitialPortfolio } from '@/lib/storage';
import { executeBuy, executeSell, calculateTotalValue, updateHoldingsPrices } from '@/lib/price-calculator';
import type { Portfolio, WeatherType, WeatherData } from '@/types';

/**
 * 포트폴리오 관리 훅
 * @param weatherData - 현재 날씨 데이터 (가격 정보)
 * @returns 포트폴리오, 총 가치, 손익, 거래 함수
 */
export function usePortfolio(weatherData: WeatherData[]) {
  // 1. 포트폴리오 상태 (로컬스토리지에서 불러오기 또는 새로 생성)
  const [portfolio, setPortfolio] = useState<Portfolio>(() => {
    // 초기 state는 함수로 lazy 초기화 (한 번만 실행)
    const saved = loadPortfolio();
    return saved || createInitialPortfolio();
  });

  // 2. 현재 가격 맵 (WeatherType → price)
  const currentPrices = useMemo(() => {
    return weatherData.reduce((acc, w) => {
      acc[w.type] = w.price;
      return acc;
    }, {} as Record<WeatherType, number>);
  }, [weatherData]);

  // 3. 총 가치 계산 (현재 가격 기준)
  const { totalValue, profitLoss, profitLossPercent } = useMemo(() => {
    // weatherData가 비어있으면 기본값
    if (weatherData.length === 0) {
      return {
        totalValue: portfolio.energy,
        profitLoss: 0,
        profitLossPercent: 0,
      };
    }
    
    return calculateTotalValue(portfolio, currentPrices);
  }, [portfolio, weatherData, currentPrices]);

  // 4. 가격 변동 시 보유 날씨 업데이트
  useEffect(() => {
    if (weatherData.length === 0 || portfolio.holdings.length === 0) {
      return;  // 아직 데이터 없으면 스킵
    }

    setPortfolio(prev => {
      const updatedHoldings = updateHoldingsPrices(prev.holdings, currentPrices);
      
      return {
        ...prev,
        holdings: updatedHoldings,
        totalValue,
        profitLoss,
        profitLossPercent,
      };
    });
  }, [currentPrices, weatherData.length, totalValue, profitLoss, profitLossPercent]);

  // 5. 포트폴리오 변경 시 자동 저장
  useEffect(() => {
    savePortfolio(portfolio);
  }, [portfolio]);

  /**
   * 거래 실행 함수
   */
  const executeTrade = useCallback(async (
    action: 'buy' | 'sell',
    type: WeatherType,
    quantity: number
  ) => {
    const currentPrice = currentPrices[type];
    
    if (!currentPrice) {
      throw new Error('가격 정보를 불러올 수 없습니다');
    }
    
    try {
      const updatedPortfolio = action === 'buy'
        ? executeBuy(portfolio, type, quantity, currentPrice)
        : executeSell(portfolio, type, quantity, currentPrice);
      
      setPortfolio(updatedPortfolio);
      
      // 성공 피드백 (선택 사항)
      return { success: true };
    } catch (error) {
      // 에러 처리
      console.error('거래 실패:', error);
      throw error;
    }
  }, [portfolio, currentPrices]);

  /**
   * 특정 날씨 보유 정보 가져오기
   */
  const getHolding = useCallback((type: WeatherType) => {
    return portfolio.holdings.find(h => h.type === type);
  }, [portfolio.holdings]);

  /**
   * 최대 매수 가능 수량 계산
   */
  const getMaxBuyQuantity = useCallback((type: WeatherType): number => {
    const currentPrice = currentPrices[type];
    if (!currentPrice || currentPrice === 0) return 0;
    
    return Math.floor(portfolio.energy / currentPrice);
  }, [portfolio.energy, currentPrices]);

  /**
   * 최대 매도 가능 수량 (보유 수량)
   */
  const getMaxSellQuantity = useCallback((type: WeatherType): number => {
    const holding = getHolding(type);
    return holding?.quantity || 0;
  }, [getHolding]);

  return {
    portfolio,              // 전체 포트폴리오
    totalValue,             // 총 가치
    profitLoss,             // 손익 (절대값)
    profitLossPercent,      // 손익률 (%)
    executeTrade,           // 거래 실행 함수
    getHolding,             // 특정 날씨 보유 정보
    getMaxBuyQuantity,      // 최대 매수 가능 수량
    getMaxSellQuantity,     // 최대 매도 가능 수량
  };
}
