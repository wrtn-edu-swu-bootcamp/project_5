/**
 * 설정 페이지
 * 참고: docs/wireframes.md 869-949줄
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loadSettings, saveSettings, clearAllStorage } from '@/lib/storage';
import { getCurrentSeason, getSeasonEmoji } from '@/lib/utils';
import type { AppSettings } from '@/types';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<AppSettings>({
    notificationsEnabled: true,
    soundEnabled: true,
    theme: 'light',
  });
  const [location, setLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    setLocation(loaded.location || '');
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    saveSettings({
      ...settings,
      location: location.trim() || undefined,
    });
    setTimeout(() => {
      setIsSaving(false);
      alert('저장되었습니다!');
    }, 500);
  };

  const handleReset = () => {
    if (confirm('정말 모든 데이터를 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
      clearAllStorage();
      alert('초기화되었습니다. 앱을 새로고침합니다.');
      window.location.href = '/';
    }
  };

  const season = getCurrentSeason();
  const seasonEmoji = getSeasonEmoji();

  return (
    <main className="min-h-screen pb-6">
      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">설정</h1>
        <div className="w-6" />
      </header>

      {/* 동네 설정 */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold mb-3">📍 내 동네</h2>
        <Card>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              동네 이름 (선택)
            </label>
            <Input
              type="text"
              value={location}
              onChange={setLocation}
              placeholder="예: 서울, 부산, 제주"
            />
            <p className="text-xs text-gray-500 mt-2">
              * 실제 날씨와는 상관없어요. 게임용 이름이에요.
            </p>
          </div>

          {location && (
            <div className="p-3 bg-blue-50 rounded-xl mb-4">
              <p className="text-sm font-semibold mb-1">
                {seasonEmoji} {location}의 계절 날씨
              </p>
              <p className="text-sm text-gray-700">
                지금은 {new Date().getMonth() + 1}월 {season}이에요
              </p>
            </div>
          )}

          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? '저장 중...' : '저장하기'}
          </Button>
        </Card>
      </section>

      {/* 앱 정보 */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold mb-3">ℹ️ 앱 정보</h2>
        <Card>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold">버전</p>
              <p className="text-sm text-gray-600">1.0.0</p>
            </div>
            <div className="h-px bg-gray-200" />
            <div>
              <p className="text-sm font-semibold">설명</p>
              <p className="text-sm text-gray-600">
                초등학생을 위한 날씨 기반 경제 교육 앱
              </p>
            </div>
            <div className="h-px bg-gray-200" />
            <div>
              <p className="text-sm font-semibold">업데이트 주기</p>
              <p className="text-sm text-gray-600">
                3분마다 자동 업데이트
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* 데이터 관리 */}
      <section className="px-6 mb-6">
        <h2 className="text-lg font-bold mb-3">🗑️ 데이터 관리</h2>
        <Card>
          <p className="text-sm text-gray-600 mb-4">
            모든 데이터를 초기화하고 처음부터 다시 시작할 수 있어요.
          </p>
          <Button onClick={handleReset} variant="danger" className="w-full">
            전체 초기화 (리셋)
          </Button>
        </Card>
      </section>
    </main>
  );
}
