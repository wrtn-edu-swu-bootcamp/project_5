# 날씨 에너지 앱 코드 아키텍처

> 초등학교 고학년(10-12세) 대상 날씨 기반 경제 교육 앱 기술 설계서

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [데이터 모델](#4-데이터-모델)
5. [핵심 기능 구현](#5-핵심-기능-구현)
6. [주요 컴포넌트 설계](#6-주요-컴포넌트-설계)
7. [라우팅 구조](#7-라우팅-구조)
8. [상태 관리](#8-상태-관리)
9. [성능 최적화](#9-성능-최적화)
10. [애니메이션 구현](#10-애니메이션-구현)
11. [배포 전략](#11-배포-전략)
12. [개발 가이드](#12-개발-가이드)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 정보

**프로젝트명:** 날씨 에너지 (Weather Energy App)

**설명:** 과거 날씨 데이터 패턴을 기반으로 4가지 날씨 타입을 사고 팔면서 경제 개념을 배우는 교육용 시뮬레이션 앱

**타겟 사용자:** 초등학교 고학년 (10-12세)

### 1.2 핵심 기능

- **날씨 거래 시스템**: 태양☀️, 바람💨, 수분💧, 온도🌡️ 4가지 날씨를 사고 팔기
- **3분 자동 업데이트**: 계절/시간 패턴 기반으로 3분마다 가격 자동 변동
- **포트폴리오 관리**: 보유 날씨 현황, 손익 계산, 거래 내역
- **시각적 피드백**: 색상 + 이모지로 상승/하락 직관적 표시
- **계절 패턴 학습**: 1월 겨울, 7월 여름 등 현실적인 계절감

### 1.3 개발 목표

- **개발 기간**: 1-2일 (14-18시간)
- **배포 환경**: Vercel (원클릭 배포)
- **복잡도**: 최소화 (외부 API 없음, 인증 없음, DB 없음)

---

## 2. 기술 스택

### 2.1 프론트엔드 프레임워크

| 기술 | 버전 | 용도 |
|-----|------|-----|
| **Next.js** | 15.5 | React 프레임워크, Turbopack 지원 |
| **React** | 19.2 | UI 라이브러리, Server Components |
| **TypeScript** | 5.7 | 타입 안정성 |
| **Tailwind CSS** | 4.1 | 스타일링, 5배 빠른 빌드 |

### 2.2 주요 라이브러리

| 라이브러리 | 버전 | 용도 |
|-----------|------|-----|
| **Motion** | 12.x | 애니메이션 (Framer Motion 후속, 120fps) |
| **Recharts** | 3.6 | 차트/그래프 |
| **date-fns** | latest | 날짜 처리 |

### 2.3 상태 관리 & 저장소

- **React 19 Actions**: 폼 처리 및 상태 업데이트
- **useOptimistic Hook**: 낙관적 UI 업데이트
- **localStorage**: 포트폴리오 영구 저장

### 2.4 배포

- **Vercel**: Next.js 네이티브 지원, 자동 배포

### 2.5 기술 선택 이유

#### Next.js 15.5
- Turbopack 안정화로 빌드 속도 2-5배 향상
- React 19 완벽 지원
- Vercel 최적화

#### React 19.2
- Server Components로 초기 로딩 빠름
- React Compiler로 자동 최적화
- useOptimistic으로 즉각적 UI 반응

#### Tailwind CSS v4.1
- 완전히 재작성되어 5배 빠른 빌드
- CSS-first 설정으로 단순화
- 디자인 가이드와 완벽 호환

#### Motion v12
- 120fps 고성능 애니메이션
- 간결한 선언적 API
- GPU 가속 지원

---

## 3. 프로젝트 구조

```
project_v2/
├── docs/                           # 문서
│   ├── plan.md                    # 기획서
│   ├── design-guide.md            # 디자인 가이드
│   ├── wireframes.md              # 와이어프레임
│   └── architecture.md            # 이 문서
├── src/
│   ├── app/                       # Next.js 15 App Router
│   │   ├── layout.tsx            # 루트 레이아웃 (폰트, 메타데이터)
│   │   ├── page.tsx              # 온보딩 페이지
│   │   ├── globals.css           # Tailwind 설정
│   │   ├── home/
│   │   │   └── page.tsx          # 메인 홈 (원형 레이아웃)
│   │   ├── weather/
│   │   │   └── [type]/
│   │   │       └── page.tsx      # 날씨 상세 (solar, wind, water, heat)
│   │   ├── portfolio/
│   │   │   └── page.tsx          # 내 보관함
│   │   └── settings/
│   │       └── page.tsx          # 설정 (동네 설정)
│   ├── components/                # React 컴포넌트
│   │   ├── ui/                   # 기본 UI 컴포넌트
│   │   │   ├── Button.tsx        # 버튼 (Primary, Secondary, Danger)
│   │   │   ├── Card.tsx          # 카드 컨테이너
│   │   │   ├── Input.tsx         # 입력 필드
│   │   │   ├── Slider.tsx        # 슬라이더
│   │   │   └── Modal.tsx         # 모달
│   │   ├── weather/              # 날씨 관련 컴포넌트
│   │   │   ├── WeatherCard.tsx   # 날씨 카드 (가격, 상태, 미니차트)
│   │   │   ├── WeatherChart.tsx  # 24시간 영역 차트
│   │   │   ├── WeatherIcon.tsx   # 날씨 아이콘 (애니메이션)
│   │   │   └── TrendIndicator.tsx # 상승/하락 표시
│   │   ├── portfolio/            # 포트폴리오 컴포넌트
│   │   │   ├── PortfolioSummary.tsx # 총 자산 요약
│   │   │   ├── HoldingCard.tsx   # 보유 날씨 카드
│   │   │   └── TransactionList.tsx # 거래 내역
│   │   ├── trading/              # 거래 컴포넌트
│   │   │   ├── TradingModal.tsx  # 사기/팔기 모달
│   │   │   └── TradeForm.tsx     # 거래 폼
│   │   └── layout/               # 레이아웃 컴포넌트
│   │       ├── Navigation.tsx    # 네비게이션
│   │       └── CircularLayout.tsx # 원형 레이아웃
│   ├── lib/                      # 유틸리티 & 비즈니스 로직
│   │   ├── weather-simulator.ts  # 날씨 시뮬레이션
│   │   ├── price-calculator.ts   # 가격 계산
│   │   ├── pattern-generator.ts  # 패턴 생성
│   │   ├── storage.ts           # localStorage 관리
│   │   └── utils.ts             # 유틸리티 함수
│   ├── hooks/                    # 커스텀 훅
│   │   ├── useWeatherPrices.ts  # 날씨 가격 관리
│   │   ├── usePortfolio.ts      # 포트폴리오 관리
│   │   ├── useInterval.ts       # 인터벌 타이머
│   │   └── useLocalStorage.ts   # localStorage 훅
│   ├── types/                    # TypeScript 타입 정의
│   │   └── index.ts             # 모든 타입 정의
│   └── constants/                # 상수
│       ├── weather-patterns.ts   # 계절 패턴 데이터
│       ├── colors.ts            # 색상 시스템
│       └── config.ts            # 앱 설정
├── public/                       # 정적 파일
│   ├── fonts/                   # 폰트 (Pretendard)
│   └── images/                  # 이미지
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── vercel.json
```

### 3.1 폴더 규칙

- **app/**: 페이지 라우팅 (Next.js App Router)
- **components/**: 재사용 가능한 React 컴포넌트
- **lib/**: 비즈니스 로직 및 유틸리티
- **hooks/**: 커스텀 React 훅
- **types/**: TypeScript 타입 정의
- **constants/**: 앱 전역 상수

---

## 4. 데이터 모델

### 4.1 날씨 타입

```typescript
// types/index.ts

/**
 * 4가지 날씨 타입
 */
export type WeatherType = 'solar' | 'wind' | 'water' | 'heat';

/**
 * 날씨 데이터 구조
 */
export interface WeatherData {
  type: WeatherType;                    // 날씨 타입
  name: string;                         // 이름 (태양 에너지, 바람 에너지...)
  emoji: string;                        // 이모지 (☀️, 💨, 💧, 🌡️)
  price: number;                        // 현재 가격
  change: number;                       // 변화량 (절대값)
  changePercent: number;                // 변화율 (%)
  trend: 'rising' | 'falling' | 'stable'; // 추세
  history: PriceHistory[];              // 가격 이력 (24시간)
}

/**
 * 가격 이력
 */
export interface PriceHistory {
  timestamp: number;                    // Unix timestamp
  price: number;                        // 가격
}

/**
 * 날씨 설정
 */
export interface WeatherConfig {
  type: WeatherType;
  name: string;
  emoji: string;
  color: string;                        // 메인 색상
  bgColor: string;                      // 배경 색상
}
```

### 4.2 포트폴리오

```typescript
/**
 * 사용자 포트폴리오
 */
export interface Portfolio {
  energy: number;                       // 보유 에너지 (게임 머니)
  totalValue: number;                   // 총 자산 가치
  profitLoss: number;                   // 총 손익
  profitLossPercent: number;            // 총 손익률
  holdings: Holding[];                  // 보유 날씨 목록
  transactions: Transaction[];          // 거래 내역
  createdAt: number;                    // 계정 생성 시간
  lastUpdated: number;                  // 마지막 업데이트
}

/**
 * 보유 날씨
 */
export interface Holding {
  type: WeatherType;                    // 날씨 타입
  quantity: number;                     // 수량
  avgBuyPrice: number;                  // 평균 매수가
  totalInvested: number;                // 총 투자금액
  currentPrice: number;                 // 현재 가격
  currentValue: number;                 // 현재 가치
  profitLoss: number;                   // 손익
  profitLossPercent: number;            // 손익률
}

/**
 * 거래 내역
 */
export interface Transaction {
  id: string;                           // 고유 ID
  type: WeatherType;                    // 날씨 타입
  action: 'buy' | 'sell';               // 매수/매도
  quantity: number;                     // 수량
  price: number;                        // 거래 가격
  totalAmount: number;                  // 총 거래 금액
  timestamp: number;                    // 거래 시간
  profitLoss?: number;                  // 손익 (매도시)
}
```

### 4.3 앱 설정

```typescript
/**
 * 앱 설정
 */
export interface AppSettings {
  location?: string;                    // 동네 이름 (선택)
  notificationsEnabled: boolean;        // 알림 설정
  soundEnabled: boolean;                // 사운드 설정
  theme: 'light' | 'dark';              // 테마 (현재는 light만)
}

/**
 * 앱 상태
 */
export interface AppState {
  weather: WeatherData[];               // 모든 날씨 데이터
  portfolio: Portfolio;                 // 포트폴리오
  settings: AppSettings;                // 설정
  isLoading: boolean;                   // 로딩 상태
  lastUpdate: number;                   // 마지막 업데이트 시간
}
```

---

## 5. 핵심 기능 구현

### 5.1 날씨 시뮬레이션 알고리즘

#### 5.1.1 계절 패턴 데이터

```typescript
// constants/weather-patterns.ts

/**
 * 월별 계절 패턴 (과거 10년 데이터 기반)
 */
export const SEASONAL_PATTERNS = {
  solar: {
    1: { min: 200, max: 400, volatility: 0.1 },    // 1월 겨울
    2: { min: 250, max: 450, volatility: 0.12 },
    3: { min: 400, max: 600, volatility: 0.15 },   // 3월 봄
    4: { min: 500, max: 700, volatility: 0.15 },
    5: { min: 600, max: 800, volatility: 0.15 },
    6: { min: 700, max: 900, volatility: 0.18 },   // 6월 여름
    7: { min: 800, max: 1200, volatility: 0.2 },   // 7월 여름 최고
    8: { min: 750, max: 1100, volatility: 0.18 },
    9: { min: 600, max: 900, volatility: 0.15 },   // 9월 가을
    10: { min: 500, max: 700, volatility: 0.15 },
    11: { min: 350, max: 550, volatility: 0.12 },
    12: { min: 250, max: 450, volatility: 0.1 },   // 12월 겨울
  },
  wind: {
    1: { min: 400, max: 600, volatility: 0.2 },
    2: { min: 450, max: 650, volatility: 0.2 },
    3: { min: 600, max: 900, volatility: 0.25 },   // 3월 봄 바람
    4: { min: 700, max: 1000, volatility: 0.25 },
    5: { min: 650, max: 950, volatility: 0.25 },
    6: { min: 400, max: 700, volatility: 0.18 },
    7: { min: 350, max: 650, volatility: 0.18 },
    8: { min: 400, max: 700, volatility: 0.18 },
    9: { min: 600, max: 900, volatility: 0.25 },   // 9월 가을 바람
    10: { min: 700, max: 1000, volatility: 0.25 },
    11: { min: 650, max: 950, volatility: 0.25 },
    12: { min: 500, max: 800, volatility: 0.2 },
  },
  water: {
    1: { min: 200, max: 400, volatility: 0.15 },   // 1월 건조
    2: { min: 250, max: 450, volatility: 0.15 },
    3: { min: 400, max: 600, volatility: 0.18 },
    4: { min: 500, max: 700, volatility: 0.2 },
    5: { min: 600, max: 800, volatility: 0.22 },
    6: { min: 800, max: 1100, volatility: 0.25 },  // 6월 장마 시작
    7: { min: 900, max: 1300, volatility: 0.3 },   // 7월 장마 최고
    8: { min: 800, max: 1100, volatility: 0.25 },
    9: { min: 600, max: 900, volatility: 0.2 },
    10: { min: 500, max: 700, volatility: 0.18 },
    11: { min: 400, max: 600, volatility: 0.15 },
    12: { min: 250, max: 450, volatility: 0.15 },
  },
  heat: {
    1: { min: 100, max: 300, volatility: 0.08 },   // 1월 추움
    2: { min: 150, max: 350, volatility: 0.08 },
    3: { min: 300, max: 500, volatility: 0.1 },
    4: { min: 450, max: 650, volatility: 0.1 },
    5: { min: 600, max: 800, volatility: 0.12 },
    6: { min: 750, max: 950, volatility: 0.12 },
    7: { min: 850, max: 1150, volatility: 0.15 },  // 7월 더움
    8: { min: 800, max: 1100, volatility: 0.15 },
    9: { min: 650, max: 850, volatility: 0.12 },
    10: { min: 500, max: 700, volatility: 0.1 },
    11: { min: 350, max: 550, volatility: 0.08 },
    12: { min: 150, max: 350, volatility: 0.08 },
  },
};

/**
 * 시간대별 가중치 (0-23시)
 */
export const TIME_MULTIPLIERS = {
  solar: {
    0: 0.0, 1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 0.1,
    6: 0.3, 7: 0.5, 8: 0.7, 9: 0.85, 10: 0.95, 11: 1.0,
    12: 1.0, 13: 0.95, 14: 0.9, 15: 0.8, 16: 0.65, 17: 0.5,
    18: 0.3, 19: 0.1, 20: 0.0, 21: 0.0, 22: 0.0, 23: 0.0,
  },
  wind: {
    0: 0.6, 1: 0.5, 2: 0.5, 3: 0.5, 4: 0.6, 5: 0.7,
    6: 0.8, 7: 0.9, 8: 1.0, 9: 1.0, 10: 1.0, 11: 1.0,
    12: 1.0, 13: 1.0, 14: 1.0, 15: 0.9, 16: 0.8, 17: 0.7,
    18: 0.7, 19: 0.7, 20: 0.7, 21: 0.6, 22: 0.6, 23: 0.6,
  },
  water: {
    0: 0.9, 1: 0.9, 2: 0.9, 3: 0.9, 4: 0.9, 5: 1.0,
    6: 1.0, 7: 1.0, 8: 0.95, 9: 0.9, 10: 0.85, 11: 0.8,
    12: 0.75, 13: 0.7, 14: 0.7, 15: 0.75, 16: 0.8, 17: 0.85,
    18: 0.9, 19: 0.95, 20: 1.0, 21: 1.0, 22: 0.95, 23: 0.9,
  },
  heat: {
    0: 0.3, 1: 0.25, 2: 0.2, 3: 0.2, 4: 0.2, 5: 0.25,
    6: 0.4, 7: 0.6, 8: 0.75, 9: 0.85, 10: 0.92, 11: 0.97,
    12: 1.0, 13: 1.0, 14: 1.0, 15: 0.95, 16: 0.85, 17: 0.7,
    18: 0.55, 19: 0.45, 20: 0.4, 21: 0.35, 22: 0.32, 23: 0.3,
  },
};
```

#### 5.1.2 가격 생성 로직

```typescript
// lib/weather-simulator.ts

import { SEASONAL_PATTERNS, TIME_MULTIPLIERS } from '@/constants/weather-patterns';
import type { WeatherType, WeatherData } from '@/types';

/**
 * 랜덤 범위 내 값 생성
 */
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 날씨 가격 생성
 */
export function generateWeatherPrice(
  type: WeatherType,
  date: Date = new Date()
): number {
  const month = date.getMonth() + 1; // 1-12
  const hour = date.getHours();      // 0-23
  
  // 계절 패턴 가져오기
  const pattern = SEASONAL_PATTERNS[type][month];
  
  // 시간대 가중치
  const timeMultiplier = TIME_MULTIPLIERS[type][hour];
  
  // 기본 가격 생성 (계절 패턴 범위 내)
  const basePrice = randomInRange(pattern.min, pattern.max);
  
  // 시간대 적용
  const priceWithTime = basePrice * timeMultiplier;
  
  // 랜덤 변동성 추가
  const volatilityFactor = 1 + (Math.random() - 0.5) * pattern.volatility * 2;
  const finalPrice = priceWithTime * volatilityFactor;
  
  // 최소 가격 보장 (100)
  return Math.max(100, Math.round(finalPrice));
}

/**
 * 모든 날씨 가격 생성
 */
export function generateAllWeatherPrices(date: Date = new Date()): Record<WeatherType, number> {
  return {
    solar: generateWeatherPrice('solar', date),
    wind: generateWeatherPrice('wind', date),
    water: generateWeatherPrice('water', date),
    heat: generateWeatherPrice('heat', date),
  };
}

/**
 * 추세 계산 (이전 가격 대비)
 */
export function calculateTrend(
  currentPrice: number,
  previousPrice: number
): 'rising' | 'falling' | 'stable' {
  const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
  
  if (changePercent > 1) return 'rising';
  if (changePercent < -1) return 'falling';
  return 'stable';
}
```

### 5.2 3분 자동 업데이트 시스템

```typescript
// hooks/useWeatherPrices.ts

import { useState, useEffect, useCallback } from 'react';
import { generateAllWeatherPrices, calculateTrend } from '@/lib/weather-simulator';
import { WEATHER_CONFIGS } from '@/constants/config';
import type { WeatherData, WeatherType } from '@/types';

const UPDATE_INTERVAL = 3 * 60 * 1000; // 3분 (180초)
const HISTORY_LENGTH = 48; // 24시간 (3분 * 48 = 144분 = 2.4시간... 실제로는 조정 필요)

/**
 * 날씨 가격 관리 훅
 */
export function useWeatherPrices() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  /**
   * 가격 업데이트
   */
  const updatePrices = useCallback(() => {
    const now = new Date();
    const newPrices = generateAllWeatherPrices(now);
    const timestamp = now.getTime();

    setWeatherData(prevData => {
      // 첫 업데이트
      if (prevData.length === 0) {
        return Object.entries(WEATHER_CONFIGS).map(([type, config]) => ({
          type: type as WeatherType,
          name: config.name,
          emoji: config.emoji,
          price: newPrices[type as WeatherType],
          change: 0,
          changePercent: 0,
          trend: 'stable' as const,
          history: [{
            timestamp,
            price: newPrices[type as WeatherType],
          }],
        }));
      }

      // 기존 데이터 업데이트
      return prevData.map(weather => {
        const newPrice = newPrices[weather.type];
        const oldPrice = weather.price;
        const change = newPrice - oldPrice;
        const changePercent = (change / oldPrice) * 100;
        const trend = calculateTrend(newPrice, oldPrice);

        // 이력 추가 (최대 48개 유지)
        const newHistory = [
          ...weather.history,
          { timestamp, price: newPrice },
        ].slice(-HISTORY_LENGTH);

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

  // 초기 로드 및 자동 업데이트
  useEffect(() => {
    updatePrices();
    setIsLoading(false);

    const interval = setInterval(updatePrices, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [updatePrices]);

  return {
    weatherData,
    isLoading,
    lastUpdate,
    updatePrices, // 수동 업데이트용
  };
}
```

### 5.3 로컬스토리지 관리

```typescript
// lib/storage.ts

import type { Portfolio, AppSettings } from '@/types';

const STORAGE_KEYS = {
  PORTFOLIO: 'weather-app-portfolio',
  SETTINGS: 'weather-app-settings',
  VERSION: 'weather-app-version',
} as const;

const CURRENT_VERSION = '1.0.0';

/**
 * 포트폴리오 저장
 */
export function savePortfolio(portfolio: Portfolio): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
  } catch (error) {
    console.error('Failed to save portfolio:', error);
  }
}

/**
 * 포트폴리오 로드
 */
export function loadPortfolio(): Portfolio | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    const version = localStorage.getItem(STORAGE_KEYS.VERSION);
    
    // 버전 체크
    if (version !== CURRENT_VERSION) {
      console.warn('Version mismatch, clearing storage');
      clearAllStorage();
      return null;
    }
    
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load portfolio:', error);
    return null;
  }
}

/**
 * 초기 포트폴리오 생성
 */
export function createInitialPortfolio(): Portfolio {
  return {
    energy: 10000, // 초기 에너지
    totalValue: 10000,
    profitLoss: 0,
    profitLossPercent: 0,
    holdings: [],
    transactions: [],
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  };
}

/**
 * 설정 저장
 */
export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

/**
 * 설정 로드
 */
export function loadSettings(): AppSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      notificationsEnabled: true,
      soundEnabled: true,
      theme: 'light',
    };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return {
      notificationsEnabled: true,
      soundEnabled: true,
      theme: 'light',
    };
  }
}

/**
 * 모든 저장소 초기화
 */
export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
}
```

### 5.4 거래 시스템

```typescript
// lib/price-calculator.ts

import type { Portfolio, WeatherType, Transaction, Holding } from '@/types';
import { v4 as uuidv4 } from 'uuid';

/**
 * 매수 처리
 */
export function executeBuy(
  portfolio: Portfolio,
  type: WeatherType,
  quantity: number,
  currentPrice: number
): Portfolio {
  const totalCost = quantity * currentPrice;
  
  // 잔액 확인
  if (portfolio.energy < totalCost) {
    throw new Error('에너지가 부족합니다');
  }
  
  // 거래 내역 추가
  const transaction: Transaction = {
    id: uuidv4(),
    type,
    action: 'buy',
    quantity,
    price: currentPrice,
    totalAmount: totalCost,
    timestamp: Date.now(),
  };
  
  // 보유 항목 업데이트
  const existingHolding = portfolio.holdings.find(h => h.type === type);
  
  let updatedHoldings: Holding[];
  if (existingHolding) {
    // 기존 보유 항목 업데이트 (평균 매수가 재계산)
    const totalQuantity = existingHolding.quantity + quantity;
    const totalInvested = existingHolding.totalInvested + totalCost;
    const avgBuyPrice = totalInvested / totalQuantity;
    
    updatedHoldings = portfolio.holdings.map(h =>
      h.type === type
        ? {
            ...h,
            quantity: totalQuantity,
            avgBuyPrice,
            totalInvested,
            currentPrice,
            currentValue: totalQuantity * currentPrice,
            profitLoss: (currentPrice - avgBuyPrice) * totalQuantity,
            profitLossPercent: ((currentPrice - avgBuyPrice) / avgBuyPrice) * 100,
          }
        : h
    );
  } else {
    // 새 보유 항목 추가
    updatedHoldings = [
      ...portfolio.holdings,
      {
        type,
        quantity,
        avgBuyPrice: currentPrice,
        totalInvested: totalCost,
        currentPrice,
        currentValue: totalCost,
        profitLoss: 0,
        profitLossPercent: 0,
      },
    ];
  }
  
  return {
    ...portfolio,
    energy: portfolio.energy - totalCost,
    holdings: updatedHoldings,
    transactions: [transaction, ...portfolio.transactions],
    lastUpdated: Date.now(),
  };
}

/**
 * 매도 처리
 */
export function executeSell(
  portfolio: Portfolio,
  type: WeatherType,
  quantity: number,
  currentPrice: number
): Portfolio {
  const holding = portfolio.holdings.find(h => h.type === type);
  
  // 보유 확인
  if (!holding || holding.quantity < quantity) {
    throw new Error('보유 수량이 부족합니다');
  }
  
  const totalRevenue = quantity * currentPrice;
  const soldCost = (holding.totalInvested / holding.quantity) * quantity;
  const profitLoss = totalRevenue - soldCost;
  
  // 거래 내역 추가
  const transaction: Transaction = {
    id: uuidv4(),
    type,
    action: 'sell',
    quantity,
    price: currentPrice,
    totalAmount: totalRevenue,
    timestamp: Date.now(),
    profitLoss,
  };
  
  // 보유 항목 업데이트
  const remainingQuantity = holding.quantity - quantity;
  let updatedHoldings: Holding[];
  
  if (remainingQuantity === 0) {
    // 전량 매도 - 항목 제거
    updatedHoldings = portfolio.holdings.filter(h => h.type !== type);
  } else {
    // 일부 매도 - 수량 감소
    updatedHoldings = portfolio.holdings.map(h =>
      h.type === type
        ? {
            ...h,
            quantity: remainingQuantity,
            totalInvested: h.totalInvested - soldCost,
            currentValue: remainingQuantity * currentPrice,
            profitLoss: (currentPrice - h.avgBuyPrice) * remainingQuantity,
            profitLossPercent: ((currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100,
          }
        : h
    );
  }
  
  return {
    ...portfolio,
    energy: portfolio.energy + totalRevenue,
    holdings: updatedHoldings,
    transactions: [transaction, ...portfolio.transactions],
    lastUpdated: Date.now(),
  };
}

/**
 * 포트폴리오 총 가치 계산
 */
export function calculateTotalValue(
  portfolio: Portfolio,
  currentPrices: Record<WeatherType, number>
): {
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
} {
  const holdingsValue = portfolio.holdings.reduce((sum, holding) => {
    const currentPrice = currentPrices[holding.type];
    return sum + (holding.quantity * currentPrice);
  }, 0);
  
  const totalValue = portfolio.energy + holdingsValue;
  const profitLoss = totalValue - 10000; // 초기 자본 10000
  const profitLossPercent = (profitLoss / 10000) * 100;
  
  return {
    totalValue,
    profitLoss,
    profitLossPercent,
  };
}
```

---

## 6. 주요 컴포넌트 설계

### 6.1 WeatherCard

날씨 카드 - 홈 화면의 핵심 컴포넌트

```typescript
// components/weather/WeatherCard.tsx

import { motion } from 'motion/react';
import { TrendIndicator } from './TrendIndicator';
import { MiniChart } from './MiniChart';
import type { WeatherData } from '@/types';

interface WeatherCardProps {
  weather: WeatherData;
  onClick: () => void;
}

export function WeatherCard({ weather, onClick }: WeatherCardProps) {
  const bgColor = {
    rising: 'bg-red-50',
    falling: 'bg-blue-50',
    stable: 'bg-gray-50',
  }[weather.trend];

  const emoji = {
    rising: '🔥',
    falling: '❄️',
    stable: '⚪',
  }[weather.trend];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${bgColor}
        rounded-3xl p-6
        shadow-md hover:shadow-lg
        transition-shadow duration-200
        cursor-pointer
      `}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{weather.emoji}</span>
          <h3 className="text-lg font-semibold">{weather.name}</h3>
        </div>
        <span className="text-2xl">{emoji}</span>
      </div>

      {/* 가격 */}
      <div className="mb-3">
        <p className="text-2xl font-bold">
          {weather.price.toLocaleString()} ⚡
        </p>
        <TrendIndicator
          change={weather.change}
          changePercent={weather.changePercent}
          trend={weather.trend}
        />
      </div>

      {/* 미니 차트 */}
      <MiniChart history={weather.history} trend={weather.trend} />
    </motion.div>
  );
}
```

### 6.2 WeatherChart

24시간 영역 차트 - 상세 화면

```typescript
// components/weather/WeatherChart.tsx

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { PriceHistory } from '@/types';

interface WeatherChartProps {
  history: PriceHistory[];
  trend: 'rising' | 'falling' | 'stable';
}

export function WeatherChart({ history, trend }: WeatherChartProps) {
  const colors = {
    rising: { stroke: '#FF6B6B', fill: '#FFE9E9' },
    falling: { stroke: '#74C0FC', fill: '#E7F5FF' },
    stable: { stroke: '#ADB5BD', fill: '#F1F3F5' },
  };

  const color = colors[trend];

  // 데이터 포맷
  const data = history.map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    price: h.price,
  }));

  return (
    <div className="w-full h-64 bg-white rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.stroke} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color.stroke} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color.stroke}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### 6.3 TradingModal

거래 모달 - 사기/팔기

```typescript
// components/trading/TradingModal.tsx

'use client';

import { useState, useOptimistic } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import type { WeatherData, Portfolio } from '@/types';

interface TradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather: WeatherData;
  portfolio: Portfolio;
  onTrade: (action: 'buy' | 'sell', quantity: number) => Promise<void>;
}

export function TradingModal({
  isOpen,
  onClose,
  weather,
  portfolio,
  onTrade,
}: TradingModalProps) {
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(1);
  const [optimisticPending, addOptimistic] = useOptimistic(
    false,
    () => true
  );

  const holding = portfolio.holdings.find(h => h.type === weather.type);
  const maxBuy = Math.floor(portfolio.energy / weather.price);
  const maxSell = holding?.quantity || 0;
  const maxQuantity = action === 'buy' ? maxBuy : maxSell;

  const totalAmount = quantity * weather.price;
  const remainingEnergy = action === 'buy' 
    ? portfolio.energy - totalAmount 
    : portfolio.energy + totalAmount;

  const handleTrade = async () => {
    addOptimistic();
    await onTrade(action, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 딤 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl p-6 shadow-2xl z-50"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {weather.emoji} {weather.name}
              </h2>
              <button onClick={onClose} className="text-2xl">×</button>
            </div>

            {/* 탭 */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setAction('buy')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  action === 'buy'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                사기
              </button>
              <button
                onClick={() => setAction('sell')}
                disabled={maxSell === 0}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  action === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                } disabled:opacity-50`}
              >
                팔기
              </button>
            </div>

            {/* 현재 가격 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">현재 가격</p>
              <p className="text-2xl font-bold">
                {weather.price.toLocaleString()} ⚡
              </p>
            </div>

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
                max={maxQuantity}
                disabled={maxQuantity === 0}
              />
              <p className="text-center text-xl font-bold mt-2">{quantity}개</p>
            </div>

            {/* 예상 결과 */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">총 금액</span>
                <span className="font-semibold">
                  {totalAmount.toLocaleString()} ⚡
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">남은 에너지</span>
                <span className="font-semibold">
                  {remainingEnergy.toLocaleString()} ⚡
                </span>
              </div>
              {action === 'sell' && holding && (
                <div className="flex justify-between">
                  <span className="text-sm">예상 손익</span>
                  <span className={`font-semibold ${
                    (weather.price - holding.avgBuyPrice) > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {((weather.price - holding.avgBuyPrice) * quantity).toLocaleString()} ⚡
                  </span>
                </div>
              )}
            </div>

            {/* 확인 버튼 */}
            <Button
              onClick={handleTrade}
              disabled={maxQuantity === 0 || optimisticPending}
              className="w-full"
            >
              {optimisticPending ? '처리 중...' : 
               action === 'buy' ? '확인! 사기 →' : '확인! 팔기 →'}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### 6.4 CircularLayout

원형 레이아웃 - 홈 화면 중앙

```typescript
// components/layout/CircularLayout.tsx

import { motion } from 'motion/react';
import type { Portfolio } from '@/types';

interface CircularLayoutProps {
  portfolio: Portfolio;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
  children: React.ReactNode; // 4개의 날씨 아이콘
}

export function CircularLayout({
  portfolio,
  totalValue,
  profitLoss,
  profitLossPercent,
  children,
}: CircularLayoutProps) {
  const isProfitable = profitLoss >= 0;

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* 중앙 에너지 표시 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute z-10 text-center"
      >
        <p className="text-4xl font-bold mb-2">
          💎 {totalValue.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mb-1">내 에너지</p>
        <motion.div
          animate={isProfitable ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className={`text-lg font-semibold ${
            isProfitable ? 'text-green-600' : 'text-red-600'
          }`}>
            {isProfitable ? '🟢' : '🔴'} {profitLoss >= 0 ? '+' : ''}{profitLoss.toLocaleString()}
            <span className="text-sm ml-1">
              ({profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(1)}%)
            </span>
          </p>
        </motion.div>
      </motion.div>

      {/* 원형으로 배치된 날씨 아이콘 */}
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
```

---

## 7. 라우팅 구조

### 7.1 페이지 구조

```
app/
├── layout.tsx              # 루트 레이아웃
├── page.tsx               # / (온보딩)
├── globals.css
├── home/
│   └── page.tsx          # /home (메인 홈)
├── weather/
│   └── [type]/
│       └── page.tsx      # /weather/solar, /weather/wind, etc.
├── portfolio/
│   └── page.tsx          # /portfolio (내 보관함)
└── settings/
    └── page.tsx          # /settings (설정)
```

### 7.2 루트 레이아웃

```typescript
// app/layout.tsx

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/Pretendard-Variable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '날씨 에너지 - 날씨로 배우는 경제',
  description: '초등학생을 위한 날씨 기반 경제 교육 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans antialiased bg-[#FFFCF7]`}>
        {children}
      </body>
    </html>
  );
}
```

### 7.3 메인 홈 페이지

```typescript
// app/home/page.tsx

'use client';

import { useState } from 'react';
import { useWeatherPrices } from '@/hooks/useWeatherPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { CircularLayout } from '@/components/layout/CircularLayout';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { TradingModal } from '@/components/trading/TradingModal';
import { Navigation } from '@/components/layout/Navigation';

export default function HomePage() {
  const { weatherData, isLoading, lastUpdate } = useWeatherPrices();
  const { portfolio, totalValue, profitLoss, profitLossPercent, executeTrade } = usePortfolio(weatherData);
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-2xl">로딩 중...</p>
    </div>;
  }

  return (
    <main className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🌤️ 날씨 에너지</h1>
          <p className="text-sm text-gray-600">
            {new Date(lastUpdate).toLocaleTimeString('ko-KR')} 업데이트
          </p>
        </div>
      </header>

      {/* 원형 레이아웃 */}
      <CircularLayout
        portfolio={portfolio}
        totalValue={totalValue}
        profitLoss={profitLoss}
        profitLossPercent={profitLossPercent}
      >
        {weatherData.map((weather, index) => {
          const angle = (index * 90 - 90) * (Math.PI / 180);
          const radius = 140;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={weather.type}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <button
                onClick={() => setSelectedWeather(weather)}
                className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl hover:scale-110 transition"
              >
                {weather.emoji}
              </button>
            </div>
          );
        })}
      </CircularLayout>

      {/* 날씨 카드 그리드 */}
      <section className="px-6 mt-8">
        <h2 className="text-xl font-bold mb-4">날씨 현황</h2>
        <div className="grid grid-cols-2 gap-4">
          {weatherData.map(weather => (
            <WeatherCard
              key={weather.type}
              weather={weather}
              onClick={() => setSelectedWeather(weather)}
            />
          ))}
        </div>
      </section>

      {/* 거래 모달 */}
      <TradingModal
        isOpen={selectedWeather !== null}
        onClose={() => setSelectedWeather(null)}
        weather={selectedWeather!}
        portfolio={portfolio}
        onTrade={executeTrade}
      />

      {/* 네비게이션 */}
      <Navigation />
    </main>
  );
}
```

---

## 8. 상태 관리

### 8.1 포트폴리오 관리 훅

```typescript
// hooks/usePortfolio.ts

import { useState, useEffect, useCallback } from 'react';
import { loadPortfolio, savePortfolio, createInitialPortfolio } from '@/lib/storage';
import { executeBuy, executeSell, calculateTotalValue } from '@/lib/price-calculator';
import type { Portfolio, WeatherType, WeatherData } from '@/types';

export function usePortfolio(weatherData: WeatherData[]) {
  const [portfolio, setPortfolio] = useState<Portfolio>(() => {
    return loadPortfolio() || createInitialPortfolio();
  });

  // 현재 가격 맵
  const currentPrices = weatherData.reduce((acc, w) => {
    acc[w.type] = w.price;
    return acc;
  }, {} as Record<WeatherType, number>);

  // 총 가치 계산
  const { totalValue, profitLoss, profitLossPercent } = calculateTotalValue(
    portfolio,
    currentPrices
  );

  // 포트폴리오 저장
  useEffect(() => {
    savePortfolio(portfolio);
  }, [portfolio]);

  // 거래 실행
  const executeTrade = useCallback(async (
    action: 'buy' | 'sell',
    type: WeatherType,
    quantity: number
  ) => {
    const currentPrice = currentPrices[type];
    
    try {
      const updatedPortfolio = action === 'buy'
        ? executeBuy(portfolio, type, quantity, currentPrice)
        : executeSell(portfolio, type, quantity, currentPrice);
      
      setPortfolio(updatedPortfolio);
    } catch (error) {
      console.error('Trade failed:', error);
      throw error;
    }
  }, [portfolio, currentPrices]);

  return {
    portfolio,
    totalValue,
    profitLoss,
    profitLossPercent,
    executeTrade,
  };
}
```

---

## 9. 성능 최적화

### 9.1 React 19 기능 활용

#### Server Components
```typescript
// 정적 콘텐츠는 Server Component로
// app/about/page.tsx

export default function AboutPage() {
  // 서버에서 렌더링, 클라이언트로 HTML만 전송
  return (
    <div>
      <h1>날씨 에너지 소개</h1>
      <p>초등학생을 위한 경제 교육 앱입니다.</p>
    </div>
  );
}
```

#### React Compiler
```typescript
// React 19 Compiler가 자동으로 최적화
// useMemo, useCallback 불필요

function WeatherCard({ weather }) {
  // 자동으로 메모이제이션됨
  const formattedPrice = weather.price.toLocaleString();
  
  return <div>{formattedPrice}</div>;
}
```

### 9.2 번들 최적화

#### Dynamic Import
```typescript
// 큰 컴포넌트는 동적 로드
import dynamic from 'next/dynamic';

const TradingModal = dynamic(() => import('@/components/trading/TradingModal'), {
  ssr: false,
  loading: () => <p>로딩 중...</p>,
});
```

#### Image Optimization
```typescript
import Image from 'next/image';

// Next.js가 자동으로 이미지 최적화
<Image
  src="/weather-bg.png"
  width={800}
  height={600}
  alt="날씨 배경"
  priority // 중요 이미지는 우선 로드
/>
```

### 9.3 Turbopack 설정

```javascript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack 활성화 (Next.js 15.5 기본값)
  experimental: {
    turbo: {
      // Turbopack 옵션
    },
  },
};

export default nextConfig;
```

---

## 10. 애니메이션 구현

### 10.1 Motion 설정

```typescript
// components/ui/AnimatedPage.tsx

import { motion } from 'motion/react';

export function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### 10.2 주요 애니메이션

#### 페이지 전환
```typescript
// app/layout.tsx에 AnimatePresence 추가

import { AnimatePresence } from 'motion/react';

export default function Layout({ children }) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}
```

#### 숫자 카운팅
```typescript
// components/ui/CountingNumber.tsx

import { motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export function CountingNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}
```

#### 카드 호버
```typescript
<motion.div
  whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {/* 카드 내용 */}
</motion.div>
```

---

## 11. 배포 전략

### 11.1 Vercel 배포 설정

#### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "devCommand": "npm run dev"
}
```

#### 환경 변수
필요 없음 - 외부 API 미사용

### 11.2 배포 절차

1. **GitHub 연동**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Vercel 연결**
- Vercel 대시보드에서 New Project
- GitHub 저장소 선택
- 자동 배포 시작

3. **커스텀 도메인 (선택)**
- Vercel 프로젝트 설정에서 도메인 추가

### 11.3 빌드 최적화

```json
// package.json

{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 12. 개발 가이드

### 12.1 개발 환경 설정

```bash
# 프로젝트 생성
npx create-next-app@latest weather-energy-app --typescript --tailwind --app

# 의존성 설치
npm install motion recharts date-fns uuid
npm install -D @types/uuid

# 개발 서버 실행
npm run dev
```

### 12.2 개발 순서

#### Day 1 (8-10시간)

1. **프로젝트 초기화** (1시간)
   - Next.js 15 + TypeScript 설정
   - Tailwind CSS 설정
   - 폴더 구조 생성

2. **타입 정의** (30분)
   - `types/index.ts` 작성
   - 모든 인터페이스 정의

3. **날씨 시뮬레이션** (2시간)
   - `constants/weather-patterns.ts` 작성
   - `lib/weather-simulator.ts` 작성
   - `hooks/useWeatherPrices.ts` 작성

4. **기본 UI 컴포넌트** (2시간)
   - Button, Card, Input, Slider, Modal
   - Tailwind 스타일 적용

5. **홈 화면** (2.5시간)
   - CircularLayout 구현
   - WeatherCard 구현
   - 3분 자동 업데이트 확인

6. **로컬스토리지** (1시간)
   - `lib/storage.ts` 작성
   - 포트폴리오 저장/로드

#### Day 2 (6-8시간)

1. **거래 시스템** (2시간)
   - `lib/price-calculator.ts` 작성
   - TradingModal 구현
   - useOptimistic 적용

2. **포트폴리오 화면** (2시간)
   - 보유 날씨 목록
   - 거래 내역
   - 총 자산 그래프

3. **애니메이션 & 디자인** (2시간)
   - Motion 애니메이션 추가
   - 디자인 가이드 색상 적용
   - 반응형 레이아웃

4. **최종 테스트 & 배포** (1시간)
   - 기능 테스트
   - Vercel 배포
   - 버그 수정

### 12.3 예상 개발 시간

| 작업 | 시간 |
|-----|------|
| 프로젝트 설정 | 1h |
| 타입 정의 | 0.5h |
| 날씨 시뮬레이션 | 2h |
| 기본 UI | 2h |
| 홈 화면 | 2.5h |
| 로컬스토리지 | 1h |
| 거래 시스템 | 2h |
| 포트폴리오 | 2h |
| 애니메이션 | 2h |
| 배포 & 테스트 | 1h |
| **총계** | **16h** |

### 12.4 체크리스트

#### 필수 기능
- [ ] 4가지 날씨 표시
- [ ] 3분마다 가격 자동 업데이트
- [ ] 매수/매도 기능
- [ ] 포트폴리오 관리
- [ ] 로컬스토리지 저장
- [ ] 원형 레이아웃

#### 선택 기능
- [ ] 24시간 차트
- [ ] 거래 내역
- [ ] 애니메이션
- [ ] 동네 설정
- [ ] 계절 힌트

#### 배포
- [ ] Vercel 배포 완료
- [ ] 모바일 반응형 확인
- [ ] 크로스 브라우저 테스트

---

## 부록

### A. 패키지 버전

```json
{
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "typescript": "^5.7.0",
    "tailwindcss": "^4.1.0",
    "motion": "^12.0.0",
    "recharts": "^3.6.0",
    "date-fns": "^3.0.0",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/uuid": "^10.0.0"
  }
}
```

### B. 주요 명령어

```bash
# 개발 서버 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start

# 린트 체크
npm run lint

# 타입 체크
npx tsc --noEmit
```

### C. 유용한 리소스

- [Next.js 15 문서](https://nextjs.org/docs)
- [React 19 문서](https://react.dev)
- [Tailwind CSS v4 문서](https://tailwindcss.com)
- [Motion 문서](https://motion.dev)
- [Recharts 문서](https://recharts.org)

---

## 결론

이 아키텍처 문서는 **1-2일 내 개발 가능한** 날씨 에너지 앱의 완전한 기술 설계를 제공합니다.

### 핵심 특징

- **최신 기술**: Next.js 15, React 19, Tailwind v4 등 2026년 최신 안정 버전
- **간단한 구조**: 외부 API 없음, 인증 없음, DB 없음
- **빠른 개발**: 클라이언트 시뮬레이션으로 복잡도 최소화
- **Vercel 최적화**: 원클릭 배포

### 다음 단계

1. 이 문서를 참고하여 프로젝트 초기화
2. Day 1 일정대로 핵심 기능 구현
3. Day 2 일정대로 UI/UX 완성
4. Vercel에 배포

**예상 개발 시간: 14-18시간 (1-2일)**

문서 작성일: 2026년 1월 22일
