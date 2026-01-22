/**
 * localStorage를 React 상태처럼 사용하는 훅
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * localStorage 훅
 * @param key - 저장소 키
 * @param initialValue - 초기값
 * @returns [값, 설정 함수]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // 1. 초기 state (localStorage에서 불러오기 또는 초기값)
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;  // 서버 사이드에서는 초기값 사용
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // 2. 값 설정 함수
  const setValue = (value: T) => {
    try {
      // state 업데이트
      setStoredValue(value);
      
      // localStorage에 저장
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}
