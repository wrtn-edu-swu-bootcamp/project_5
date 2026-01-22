/**
 * localStorage를 사용한 데이터 영구 저장
 * 참고: docs/architecture.md 574-683줄
 */

import { INITIAL_ENERGY } from '@/constants/config';
import type { Portfolio, AppSettings } from '@/types';

/**
 * 저장소 키 정의
 */
const STORAGE_KEYS = {
  PORTFOLIO: 'weather-app-portfolio',
  SETTINGS: 'weather-app-settings',
  VERSION: 'weather-app-version',
} as const;

/**
 * 현재 앱 버전
 * 버전이 바뀌면 기존 데이터 삭제 (호환성 문제 방지)
 */
const CURRENT_VERSION = '1.0.0';

/**
 * 포트폴리오 저장
 * @param portfolio - 저장할 포트폴리오
 */
export function savePortfolio(portfolio: Portfolio): void {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const jsonString = JSON.stringify(portfolio);
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, jsonString);
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
  } catch (error) {
    console.error('포트폴리오 저장 실패:', error);
    // 저장소가 꽉 찼을 수 있음 (QuotaExceededError)
  }
}

/**
 * 포트폴리오 불러오기
 * @returns 저장된 포트폴리오 또는 null
 */
export function loadPortfolio(): Portfolio | null {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    // 1. 버전 확인
    const savedVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (savedVersion !== CURRENT_VERSION) {
      console.warn('버전 불일치, 저장소 초기화');
      clearAllStorage();
      return null;
    }
    
    // 2. 데이터 불러오기
    const jsonString = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (!jsonString) {
      return null;  // 저장된 데이터 없음
    }
    
    // 3. JSON 파싱
    const portfolio = JSON.parse(jsonString) as Portfolio;
    
    // 4. 데이터 유효성 검사 (기본적인)
    if (!portfolio.energy || !Array.isArray(portfolio.holdings)) {
      console.warn('잘못된 데이터 형식');
      return null;
    }
    
    return portfolio;
  } catch (error) {
    console.error('포트폴리오 불러오기 실패:', error);
    return null;
  }
}

/**
 * 초기 포트폴리오 생성 (처음 시작할 때)
 * @returns 새 포트폴리오
 */
export function createInitialPortfolio(): Portfolio {
  return {
    energy: INITIAL_ENERGY,        // 10,000
    totalValue: INITIAL_ENERGY,
    profitLoss: 0,
    profitLossPercent: 0,
    holdings: [],                  // 비어있음
    transactions: [],              // 비어있음
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  };
}

/**
 * 설정 저장
 * @param settings - 저장할 설정
 */
export function saveSettings(settings: AppSettings): void {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const jsonString = JSON.stringify(settings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, jsonString);
  } catch (error) {
    console.error('설정 저장 실패:', error);
  }
}

/**
 * 설정 불러오기
 * @returns 저장된 설정 또는 기본값
 */
export function loadSettings(): AppSettings {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return {
      notificationsEnabled: true,
      soundEnabled: true,
      theme: 'light',
    };
  }
  
  try {
    const jsonString = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!jsonString) {
      // 기본 설정 반환
      return {
        notificationsEnabled: true,
        soundEnabled: true,
        theme: 'light',
      };
    }
    
    const settings = JSON.parse(jsonString) as AppSettings;
    return settings;
  } catch (error) {
    console.error('설정 불러오기 실패:', error);
    // 기본 설정 반환
    return {
      notificationsEnabled: true,
      soundEnabled: true,
      theme: 'light',
    };
  }
}

/**
 * 모든 저장소 초기화 (리셋)
 */
export function clearAllStorage(): void {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('저장소 초기화 완료');
  } catch (error) {
    console.error('저장소 초기화 실패:', error);
  }
}

/**
 * 저장소 사용량 확인 (디버깅용)
 */
export function checkStorageSize(): number {
  // SSR 환경 체크
  if (typeof window === 'undefined') {
    return 0;
  }
  
  try {
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        totalSize += value.length;
      }
    });
    // 바이트 단위 반환
    return totalSize;
  } catch {
    return 0;
  }
}
