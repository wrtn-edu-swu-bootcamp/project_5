/**
 * 유틸리티 함수 모음
 */

/**
 * 숫자를 천 단위 콤마 형식으로 변환
 * @param num - 변환할 숫자
 * @returns 포맷된 문자열
 * @example formatNumber(12350) → "12,350"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

/**
 * 에너지 단위 포맷 (숫자 + ⚡)
 * @param energy - 에너지 값
 * @returns 포맷된 문자열
 * @example formatEnergy(1200) → "1,200 ⚡"
 */
export function formatEnergy(energy: number): string {
  return `${formatNumber(energy)} ⚡`;
}

/**
 * 퍼센트 포맷 (+ 기호 포함)
 * @param percent - 퍼센트 값
 * @param decimals - 소수점 자리수 (기본 1)
 * @returns 포맷된 문자열
 * @example formatPercent(23.5) → "+23.5%"
 * @example formatPercent(-8.2) → "-8.2%"
 */
export function formatPercent(percent: number, decimals: number = 1): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(decimals)}%`;
}

/**
 * 시간 경과 표시 (상대 시간)
 * @param timestamp - Unix timestamp (밀리초)
 * @returns 상대 시간 문자열
 * @example formatTimeAgo(Date.now() - 60000) → "1분 전"
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
}

/**
 * 시간 포맷 (오전/오후 형식)
 * @param timestamp - Unix timestamp (밀리초)
 * @returns 포맷된 시간 문자열
 * @example formatTime(timestamp) → "오후 3:24"
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 날짜 포맷
 * @param timestamp - Unix timestamp (밀리초)
 * @returns 포맷된 날짜 문자열
 * @example formatDate(timestamp) → "12월 24일"
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 현재 계절 가져오기
 * @param date - 기준 날짜 (기본값: 현재)
 * @returns 계절 이름
 */
export function getCurrentSeason(date: Date = new Date()): string {
  const month = date.getMonth() + 1; // 1-12
  
  if (month >= 3 && month <= 5) return '봄';
  if (month >= 6 && month <= 8) return '여름';
  if (month >= 9 && month <= 11) return '가을';
  return '겨울';
}

/**
 * 계절 이모지 가져오기
 */
export function getSeasonEmoji(date: Date = new Date()): string {
  const season = getCurrentSeason(date);
  const emojiMap = {
    '봄': '🌸',
    '여름': '☀️',
    '가을': '🍂',
    '겨울': '❄️',
  };
  return emojiMap[season as keyof typeof emojiMap];
}

/**
 * 클래스명 조합 (Tailwind CSS용)
 * @param classes - 클래스명들
 * @returns 합쳐진 클래스명
 * @example cn('text-blue-500', condition && 'font-bold') → "text-blue-500 font-bold"
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
