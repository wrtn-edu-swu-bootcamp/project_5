/**
 * 가격 계산 및 거래 실행 로직
 * 참고: docs/architecture.md 686-860줄
 */

import { v4 as uuidv4 } from 'uuid';
import type { Portfolio, WeatherType, Transaction, Holding } from '@/types';

/**
 * 매수 실행
 * @param portfolio - 현재 포트폴리오
 * @param type - 날씨 종류
 * @param quantity - 구매 수량
 * @param currentPrice - 현재 가격
 * @returns 업데이트된 포트폴리오
 */
export function executeBuy(
  portfolio: Portfolio,
  type: WeatherType,
  quantity: number,
  currentPrice: number
): Portfolio {
  // 1. 총 비용 계산
  const totalCost = quantity * currentPrice;
  
  // 2. 잔액 확인
  if (portfolio.energy < totalCost) {
    throw new Error('에너지가 부족합니다');
  }
  
  // 3. 거래 내역 생성
  const transaction: Transaction = {
    id: uuidv4(),                  // 고유 ID
    type,
    action: 'buy',
    quantity,
    price: currentPrice,
    totalAmount: totalCost,
    timestamp: Date.now(),
  };
  
  // 4. 기존 보유 항목 찾기
  const existingHolding = portfolio.holdings.find(h => h.type === type);
  
  let updatedHoldings: Holding[];
  
  if (existingHolding) {
    // 4-1. 이미 가지고 있으면 → 추가 매수 (평균 매수가 재계산)
    const totalQuantity = existingHolding.quantity + quantity;
    const totalInvested = existingHolding.totalInvested + totalCost;
    const avgBuyPrice = totalInvested / totalQuantity;  // 평균 매수가
    
    updatedHoldings = portfolio.holdings.map(h =>
      h.type === type
        ? {
            type: h.type,
            quantity: totalQuantity,
            avgBuyPrice,
            totalInvested,
            currentPrice,
            currentValue: totalQuantity * currentPrice,
            profitLoss: (currentPrice - avgBuyPrice) * totalQuantity,
            profitLossPercent: ((currentPrice - avgBuyPrice) / avgBuyPrice) * 100,
            firstBoughtAt: h.firstBoughtAt,  // 처음 산 날짜 유지
            lastBoughtAt: Date.now(),        // 마지막 구매 날짜 업데이트
          }
        : h
    );
  } else {
    // 4-2. 처음 사는 거면 → 새 보유 항목 추가
    const now = Date.now();
    updatedHoldings = [
      ...portfolio.holdings,
      {
        type,
        quantity,
        avgBuyPrice: currentPrice,      // 현재 가격이 평균 매수가
        totalInvested: totalCost,
        currentPrice,
        currentValue: totalCost,
        profitLoss: 0,                  // 처음엔 손익 0
        profitLossPercent: 0,
        firstBoughtAt: now,             // 처음 산 날짜
        lastBoughtAt: now,              // 마지막 구매 날짜
      },
    ];
  }
  
  // 5. 업데이트된 포트폴리오 반환
  return {
    ...portfolio,
    energy: portfolio.energy - totalCost,        // 에너지 차감
    holdings: updatedHoldings,
    transactions: [transaction, ...portfolio.transactions],  // 최신순
    lastUpdated: Date.now(),
  };
}

/**
 * 매도 실행
 * @param portfolio - 현재 포트폴리오
 * @param type - 날씨 종류
 * @param quantity - 판매 수량
 * @param currentPrice - 현재 가격
 * @returns 업데이트된 포트폴리오
 */
export function executeSell(
  portfolio: Portfolio,
  type: WeatherType,
  quantity: number,
  currentPrice: number
): Portfolio {
  // 1. 보유 확인
  const holding = portfolio.holdings.find(h => h.type === type);
  
  if (!holding || holding.quantity < quantity) {
    throw new Error('보유 수량이 부족합니다');
  }
  
  // 2. 수익 계산
  const totalRevenue = quantity * currentPrice;                    // 판매 금액
  const soldCost = (holding.totalInvested / holding.quantity) * quantity;  // 원래 샀던 금액
  const profitLoss = totalRevenue - soldCost;                      // 손익
  
  // 3. 거래 내역 생성
  const transaction: Transaction = {
    id: uuidv4(),
    type,
    action: 'sell',
    quantity,
    price: currentPrice,
    totalAmount: totalRevenue,
    timestamp: Date.now(),
    profitLoss,                  // 매도는 손익 기록
  };
  
  // 4. 보유 항목 업데이트
  const remainingQuantity = holding.quantity - quantity;
  let updatedHoldings: Holding[];
  
  if (remainingQuantity === 0) {
    // 4-1. 전량 매도 → 항목 제거
    updatedHoldings = portfolio.holdings.filter(h => h.type !== type);
  } else {
    // 4-2. 일부 매도 → 수량 감소 (날짜는 유지)
    updatedHoldings = portfolio.holdings.map(h =>
      h.type === type
        ? {
            type: h.type,
            quantity: remainingQuantity,
            avgBuyPrice: h.avgBuyPrice,              // 평균 매수가 유지
            totalInvested: h.totalInvested - soldCost,
            currentPrice,
            currentValue: remainingQuantity * currentPrice,
            profitLoss: (currentPrice - h.avgBuyPrice) * remainingQuantity,
            profitLossPercent: ((currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100,
            firstBoughtAt: h.firstBoughtAt,          // 처음 산 날짜 유지
            lastBoughtAt: h.lastBoughtAt,            // 마지막 구매 날짜 유지
          }
        : h
    );
  }
  
  // 5. 업데이트된 포트폴리오 반환
  return {
    ...portfolio,
    energy: portfolio.energy + totalRevenue,     // 에너지 증가
    holdings: updatedHoldings,
    transactions: [transaction, ...portfolio.transactions],
    lastUpdated: Date.now(),
  };
}

/**
 * 포트폴리오 총 가치 계산
 * @param portfolio - 현재 포트폴리오
 * @param currentPrices - 현재 가격들
 * @returns 총 가치, 손익, 손익률
 */
export function calculateTotalValue(
  portfolio: Portfolio,
  currentPrices: Record<WeatherType, number>
): {
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
} {
  // 1. 보유 날씨들의 현재 가치 합산
  const holdingsValue = portfolio.holdings.reduce((sum, holding) => {
    const currentPrice = currentPrices[holding.type];
    return sum + (holding.quantity * currentPrice);
  }, 0);
  
  // 2. 총 가치 = 보유 에너지 + 보유 날씨 가치
  const totalValue = portfolio.energy + holdingsValue;
  
  // 3. 손익 = 현재 가치 - 초기 자본 (10,000)
  const profitLoss = totalValue - 10000;
  
  // 4. 손익률 = (손익 / 초기 자본) × 100
  const profitLossPercent = (profitLoss / 10000) * 100;
  
  return {
    totalValue,
    profitLoss,
    profitLossPercent,
  };
}

/**
 * 보유 날씨 업데이트 (현재 가격 반영)
 * @param holdings - 현재 보유 목록
 * @param currentPrices - 현재 가격들
 * @returns 업데이트된 보유 목록
 */
export function updateHoldingsPrices(
  holdings: Holding[],
  currentPrices: Record<WeatherType, number>
): Holding[] {
  return holdings.map(holding => {
    const currentPrice = currentPrices[holding.type];
    const currentValue = holding.quantity * currentPrice;
    const profitLoss = (currentPrice - holding.avgBuyPrice) * holding.quantity;
    const profitLossPercent = ((currentPrice - holding.avgBuyPrice) / holding.avgBuyPrice) * 100;
    
    return {
      ...holding,
      currentPrice,
      currentValue,
      profitLoss,
      profitLossPercent,
      // 날짜 정보는 유지
    };
  });
}
