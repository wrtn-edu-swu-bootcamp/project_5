/**
 * 날씨 계절 패턴 데이터
 * 과거 10년 날씨 데이터 기반으로 작성
 * 참고: docs/architecture.md 310-406줄
 */

/**
 * 월별 계절 패턴
 * - min: 최소 가격
 * - max: 최대 가격
 * - volatility: 변동성 (0-1, 높을수록 가격 변화 큼)
 */
export const SEASONAL_PATTERNS = {
  solar: {
    1:  { min: 200,  max: 400,  volatility: 0.1 },   // 1월 겨울
    2:  { min: 250,  max: 450,  volatility: 0.12 },
    3:  { min: 400,  max: 600,  volatility: 0.15 },  // 3월 봄
    4:  { min: 500,  max: 700,  volatility: 0.15 },
    5:  { min: 600,  max: 800,  volatility: 0.15 },
    6:  { min: 700,  max: 900,  volatility: 0.18 },  // 6월 여름
    7:  { min: 800,  max: 1200, volatility: 0.2 },   // 7월 여름 최고!
    8:  { min: 750,  max: 1100, volatility: 0.18 },
    9:  { min: 600,  max: 900,  volatility: 0.15 },  // 9월 가을
    10: { min: 500,  max: 700,  volatility: 0.15 },
    11: { min: 350,  max: 550,  volatility: 0.12 },
    12: { min: 250,  max: 450,  volatility: 0.1 },   // 12월 겨울
  },
  wind: {
    1:  { min: 400,  max: 600,  volatility: 0.2 },
    2:  { min: 450,  max: 650,  volatility: 0.2 },
    3:  { min: 600,  max: 900,  volatility: 0.25 },  // 3월 봄바람
    4:  { min: 700,  max: 1000, volatility: 0.25 },
    5:  { min: 650,  max: 950,  volatility: 0.25 },
    6:  { min: 400,  max: 700,  volatility: 0.18 },
    7:  { min: 350,  max: 650,  volatility: 0.18 },
    8:  { min: 400,  max: 700,  volatility: 0.18 },
    9:  { min: 600,  max: 900,  volatility: 0.25 },  // 9월 가을바람
    10: { min: 700,  max: 1000, volatility: 0.25 },
    11: { min: 650,  max: 950,  volatility: 0.25 },
    12: { min: 500,  max: 800,  volatility: 0.2 },
  },
  water: {
    1:  { min: 200,  max: 400,  volatility: 0.15 },  // 1월 건조
    2:  { min: 250,  max: 450,  volatility: 0.15 },
    3:  { min: 400,  max: 600,  volatility: 0.18 },
    4:  { min: 500,  max: 700,  volatility: 0.2 },
    5:  { min: 600,  max: 800,  volatility: 0.22 },
    6:  { min: 800,  max: 1100, volatility: 0.25 },  // 6월 장마 시작
    7:  { min: 900,  max: 1300, volatility: 0.3 },   // 7월 장마 최고!
    8:  { min: 800,  max: 1100, volatility: 0.25 },
    9:  { min: 600,  max: 900,  volatility: 0.2 },
    10: { min: 500,  max: 700,  volatility: 0.18 },
    11: { min: 400,  max: 600,  volatility: 0.15 },
    12: { min: 250,  max: 450,  volatility: 0.15 },
  },
  heat: {
    1:  { min: 100,  max: 300,  volatility: 0.08 },  // 1월 추움
    2:  { min: 150,  max: 350,  volatility: 0.08 },
    3:  { min: 300,  max: 500,  volatility: 0.1 },
    4:  { min: 450,  max: 650,  volatility: 0.1 },
    5:  { min: 600,  max: 800,  volatility: 0.12 },
    6:  { min: 750,  max: 950,  volatility: 0.12 },
    7:  { min: 850,  max: 1150, volatility: 0.15 },  // 7월 더움!
    8:  { min: 800,  max: 1100, volatility: 0.15 },
    9:  { min: 650,  max: 850,  volatility: 0.12 },
    10: { min: 500,  max: 700,  volatility: 0.1 },
    11: { min: 350,  max: 550,  volatility: 0.08 },
    12: { min: 150,  max: 350,  volatility: 0.08 },
  },
} as const;

/**
 * 시간대별 가중치 (0-23시)
 * 0.0 = 0%, 1.0 = 100%
 * 예: 태양은 낮 12시에 1.0 (100%), 밤 12시에 0.0 (0%)
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
} as const;
