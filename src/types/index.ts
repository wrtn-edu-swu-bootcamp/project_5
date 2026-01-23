/**
 * Tweddle 앱 타입 정의
 * 참고: docs/architecture.md 186-302줄
 */

// ===== 날씨 관련 타입 =====

/**
 * 4가지 날씨 타입
 */
export type WeatherType = 'solar' | 'wind' | 'water' | 'heat';

/**
 * 날씨 추세 (가격 변화 방향)
 */
export type WeatherTrend = 'rising' | 'falling' | 'stable';

/**
 * 가격 이력 (24시간 그래프용)
 */
export interface PriceHistory {
  timestamp: number;    // Unix timestamp (밀리초)
  price: number;        // 가격 (에너지)
}

/**
 * 날씨 데이터 구조
 * 화면에 표시되는 모든 날씨 정보
 */
export interface WeatherData {
  type: WeatherType;              // 날씨 종류
  name: string;                   // 이름 (예: "태양 에너지")
  emoji: string;                  // 이모지 (예: "☀️")
  price: number;                  // 현재 가격
  change: number;                 // 변화량 (절대값)
  changePercent: number;          // 변화율 (%)
  trend: WeatherTrend;            // 추세 (상승/하락/안정)
  history: PriceHistory[];        // 24시간 가격 이력
}

/**
 * 날씨 설정 (색상, 이름 등)
 */
export interface WeatherConfig {
  type: WeatherType;
  name: string;
  emoji: string;
  color: string;        // 메인 색상 (예: #FFB547)
  bgColor: string;      // 배경 색상 (예: #FFF4E0)
}

// ===== 포트폴리오 관련 타입 =====

/**
 * 거래 내역
 */
export interface Transaction {
  id: string;                    // 고유 ID (UUID)
  type: WeatherType;             // 날씨 종류
  action: 'buy' | 'sell';        // 매수/매도
  quantity: number;              // 수량
  price: number;                 // 거래 가격 (단가)
  totalAmount: number;           // 총 거래 금액
  timestamp: number;             // 거래 시간
  profitLoss?: number;           // 손익 (매도 시)
}

/**
 * 보유 날씨
 */
export interface Holding {
  type: WeatherType;             // 날씨 종류
  quantity: number;              // 수량
  avgBuyPrice: number;           // 평균 매수가
  totalInvested: number;         // 총 투자금액
  currentPrice: number;          // 현재 가격
  currentValue: number;          // 현재 가치
  profitLoss: number;            // 손익
  profitLossPercent: number;     // 손익률 (%)
  firstBoughtAt?: number;        // 처음 산 날짜 (timestamp)
  lastBoughtAt?: number;         // 마지막으로 산 날짜 (timestamp)
}

/**
 * 사용자 포트폴리오
 */
export interface Portfolio {
  energy: number;                // 보유 에너지 (게임 머니)
  totalValue: number;            // 총 자산 가치
  profitLoss: number;            // 총 손익
  profitLossPercent: number;     // 총 손익률
  holdings: Holding[];           // 보유 날씨 목록
  transactions: Transaction[];   // 거래 내역
  createdAt: number;             // 계정 생성 시간
  lastUpdated: number;           // 마지막 업데이트
}

// ===== 앱 설정 관련 타입 =====

/**
 * 앱 설정
 */
export interface AppSettings {
  location?: string;              // 동네 이름 (선택)
  notificationsEnabled: boolean;  // 알림 설정
  soundEnabled: boolean;          // 사운드 설정
  theme: 'light' | 'dark';        // 테마 (현재는 light만)
}

/**
 * 앱 전체 상태
 */
export interface AppState {
  weather: WeatherData[];         // 모든 날씨 데이터
  portfolio: Portfolio;           // 포트폴리오
  settings: AppSettings;          // 설정
  isLoading: boolean;             // 로딩 상태
  lastUpdate: number;             // 마지막 업데이트 시간
}
