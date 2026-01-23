/**
 * 온보딩 페이지
 * 참고: docs/wireframes.md 79-105줄
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { saveSettings } from '@/lib/storage';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: 웰컴, 2: 동네 설정, 3: 초기 에너지
  const [location, setLocation] = useState('');

  const handleStart = () => {
    setStep(2);
  };

  const handleSkipLocation = () => {
    setStep(3);
  };

  const handleSetLocation = () => {
    if (location.trim()) {
      saveSettings({
        location: location.trim(),
        notificationsEnabled: true,
        soundEnabled: true,
        theme: 'light',
      });
    }
    setStep(3);
  };

  const handleFinish = () => {
    router.push('/home');
  };

  // 1단계: 웰컴 화면
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="text-4xl font-bold mb-4">🌤️ Tweddle</h1>
          <p className="text-xl mb-2">날씨를 사고 팔면서</p>
          <p className="text-xl mb-8">경제를 배워요!</p>
          
          <div className="flex justify-center gap-4 text-5xl mb-8">
            <span>☀️</span>
            <span>💨</span>
            <span>💧</span>
            <span>🌡️</span>
          </div>
          
          <p className="text-gray-600 mb-2">3분마다 가격이 바뀌어요</p>
          <p className="text-gray-600 mb-8">계절에 맞는 날씨로 게임해요</p>
          
          <Button onClick={handleStart} variant="primary" className="w-full">
            시작하기 →
          </Button>
        </motion.div>
      </div>
    );
  }

  // 2단계: 동네 설정
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <p className="text-sm text-gray-600 mb-6 text-right">1/3</p>
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-2xl font-bold mb-4">어디 사니? (선택)</h2>
            <p className="text-gray-600 mb-2">동네 이름을 알려주면</p>
            <p className="text-gray-600 mb-1">더 재미있어요!</p>
          </div>
          
          <Input
            type="text"
            value={location}
            onChange={setLocation}
            placeholder="예: 서울, 부산, 제주"
            className="mb-4"
          />
          
          <div className="space-y-3">
            <Button onClick={handleSkipLocation} variant="secondary" className="w-full">
              다음에 하기
            </Button>
            <Button onClick={handleSetLocation} variant="primary" className="w-full">
              확인 →
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3단계: 초기 에너지
  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <p className="text-sm text-gray-600 mb-6 text-right">2/3</p>
          
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-2xl font-bold mb-4">처음 주는 돈</h2>
          
          <motion.p
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-bold mb-8"
          >
            10,000 에너지
          </motion.p>
          
          <p className="text-gray-600 mb-2">이 돈으로 날씨를 사고 팔아요</p>
          <p className="text-gray-600 mb-8">많이 벌어보세요!</p>
          
          <Button onClick={handleFinish} variant="primary" className="w-full">
            좋아요! →
          </Button>
        </motion.div>
      </div>
    );
  }

  return null;
}
