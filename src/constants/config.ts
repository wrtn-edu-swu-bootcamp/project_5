/**
 * 앱 설정 및 상수
 * 참고: docs/design-guide.md 89-144줄
 */

import type { WeatherType, WeatherConfig } from '@/types';

/**
 * 3분 업데이트 주기 (밀리초)
 */
export const UPDATE_INTERVAL = 3 * 60 * 1000; // 180,000ms = 3분

/**
 * 초기 에너지 (게임 머니)
 */
export const INITIAL_ENERGY = 10000;

/**
 * 가격 이력 최대 보관 개수 (24시간분)
 * 3분마다 업데이트 = 시간당 20개 = 24시간 480개
 */
export const HISTORY_LENGTH = 480;

/**
 * 4가지 날씨 설정
 */
export const WEATHER_CONFIGS: Record<WeatherType, WeatherConfig> = {
  solar: {
    type: 'solar',
    name: '태양 에너지',
    emoji: '☀️',
    color: '#FFB547',      // 따뜻한 노랑
    bgColor: '#FFF4E0',    // 햇살 배경
  },
  wind: {
    type: 'wind',
    name: '바람 에너지',
    emoji: '💨',
    color: '#7DD3FC',      // 하늘 파랑
    bgColor: '#E8F7FF',    // 구름 배경
  },
  water: {
    type: 'water',
    name: '수분 에너지',
    emoji: '💧',
    color: '#60CFFF',      // 밝은 청록
    bgColor: '#E0F7FF',    // 물방울 배경
  },
  heat: {
    type: 'heat',
    name: '온도 에너지',
    emoji: '🌡️',
    color: '#FF8A80',      // 코랄 레드
    bgColor: '#FFF0EE',    // 따뜻한 배경
  },
};

/**
 * 상태별 색상
 */
export const TREND_COLORS = {
  rising: {
    main: '#FF6B6B',       // 빨강
    bg: '#FFE9E9',         // 연한 빨강 배경
    emoji: '🔥',
    text: '올라가는 중!',
  },
  falling: {
    main: '#74C0FC',       // 파랑
    bg: '#E7F5FF',         // 연한 파랑 배경
    emoji: '❄️',
    text: '내려가는 중',
  },
  stable: {
    main: '#ADB5BD',       // 회색
    bg: '#F1F3F5',         // 연한 회색 배경
    emoji: '⚪',
    text: '변화 없음',
  },
} as const;

/**
 * 성공/경고 색상
 */
export const STATUS_COLORS = {
  success: {
    main: '#5FD4A0',       // 민트 그린
    bg: '#E8F9F1',
    text: '성공!',
  },
  warning: {
    main: '#FF8A65',       // 피치 오렌지
    bg: '#FFEBE5',
    text: '주의!',
  },
} as const;
