/**
 * setInterval을 안전하게 사용하는 훅
 * 참고: Dan Abramov의 useInterval 훅
 */

'use client';

import { useEffect, useRef } from 'react';

/**
 * 인터벌 훅
 * @param callback - 실행할 함수
 * @param delay - 지연 시간 (밀리초), null이면 정지
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // 1. 콜백 함수 저장 (최신 버전 유지)
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 2. 인터벌 설정
  useEffect(() => {
    // delay가 null이면 인터벌 정지
    if (delay === null) {
      return;
    }

    function tick() {
      savedCallback.current?.();
    }

    const id = setInterval(tick, delay);

    // 3. 클린업 (컴포넌트 언마운트 시)
    return () => clearInterval(id);
  }, [delay]);
}
