# 🌤️ 날씨 에너지 앱

> 초등학생을 위한 날씨 기반 경제 교육 앱

4가지 날씨(태양, 바람, 수분, 온도)를 사고 팔면서 경제 개념을 배우는 교육용 게임입니다.

---

## ✨ 주요 기능

### 🌈 4가지 날씨 거래
- **☀️ 태양 에너지**: 여름 낮에 비싸요
- **💨 바람 에너지**: 봄/가을에 강해요
- **💧 수분 에너지**: 장마철에 최고!
- **🌡️ 온도 에너지**: 여름에 올라가요

### 📊 실시간 가격 시스템
- 3분마다 자동 가격 업데이트
- 계절과 시간에 따른 현실적인 가격 변동
- 24시간 가격 차트로 추세 확인

### 💰 포트폴리오 관리
- 보유 날씨 현황 및 손익 확인
- 거래 내역 자동 기록
- 평균 매수가 자동 계산

### 🎨 아름다운 UI/UX
- 부드러운 애니메이션
- 직관적인 원형 레이아웃
- 모바일 최적화 (반응형)

---

## 🚀 빠른 시작

### 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 🛠️ 기술 스택

| 카테고리 | 기술 | 버전 |
|----------|------|------|
| **프레임워크** | Next.js | 15.5.9 |
| **언어** | TypeScript | 5.x |
| **스타일링** | Tailwind CSS | 4.1.0 |
| **애니메이션** | Motion | 12.28.1 |
| **차트** | Recharts | 3.7.0 |
| **상태 관리** | React Hooks | - |
| **데이터 저장** | LocalStorage | - |
| **배포** | Vercel | - |

---

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 페이지
│   ├── page.tsx           # 온보딩 페이지
│   ├── home/              # 메인 홈
│   ├── weather/[type]/    # 날씨 상세 & 거래
│   ├── portfolio/         # 내 보관함
│   └── settings/          # 설정
├── components/
│   ├── ui/                # 기본 UI 컴포넌트
│   └── weather/           # 날씨 컴포넌트
├── lib/                   # 비즈니스 로직
│   ├── weather-simulator.ts  # 가격 시뮬레이션
│   ├── price-calculator.ts   # 거래 로직
│   ├── storage.ts            # 데이터 저장
│   └── utils.ts              # 유틸리티
├── hooks/                 # 커스텀 훅
│   ├── useWeatherPrices.ts  # 가격 관리
│   ├── usePortfolio.ts       # 포트폴리오
│   └── ...
├── types/                 # TypeScript 타입
├── constants/             # 상수 (날씨 패턴, 색상)
└── ...
```

---

## 🎮 사용 방법

### 1️⃣ 온보딩
- 앱 시작 시 10,000 에너지 제공
- 동네 설정 (선택 사항)

### 2️⃣ 날씨 확인
- 홈 화면에서 4가지 날씨 아이콘 표시
- 현재 가격과 변화 추세 확인
- 아이콘 클릭 시 상세 페이지 이동

### 3️⃣ 거래하기
- **사기**: 슬라이더로 수량 선택 → 확인
- **팔기**: 보유 날씨 선택 → 수량 선택 → 확인
- 거래 시 평균 매수가와 예상 손익 표시

### 4️⃣ 포트폴리오
- 보유 날씨와 총 자산 확인
- 개별 날씨별 손익 확인
- 거래 내역 최신순 확인

### 5️⃣ 설정
- 동네 설정 변경
- 데이터 전체 초기화 (리셋)

---

## 🎨 디자인 시스템

### 색상 팔레트

**날씨별 색상**:
- 태양: `#FFB547` (따뜻한 노랑)
- 바람: `#7DD3FC` (하늘 파랑)
- 수분: `#60CFFF` (밝은 청록)
- 온도: `#FF8A80` (코랄 레드)

**상태 색상**:
- 상승: `#FF6B6B` (빨강)
- 하락: `#74C0FC` (파랑)
- 안정: `#ADB5BD` (회색)

**배경**:
- 메인 배경: `#FFFCF7` (따뜻한 크림)
- 카드 배경: `#FFFFFF` (흰색)

### 타이포그래피
- 폰트: **Pretendard** Variable
- 크기: 12px ~ 48px
- 무게: 400 ~ 700

---

## 📚 문서

- **[개발 가이드](DEVELOPMENT_TODO.md)**: 단계별 개발 지침
- **[테스트 가이드](TESTING_GUIDE.md)**: 기능 테스트 체크리스트
- **[배포 가이드](DEPLOYMENT_GUIDE.md)**: Vercel 배포 방법
- **[아키텍처](docs/architecture.md)**: 기술 설계 문서
- **[디자인 가이드](docs/design-guide.md)**: UI/UX 디자인 시스템
- **[와이어프레임](docs/wireframes.md)**: 화면 설계
- **[프로젝트 계획](docs/plan.md)**: 전체 계획서

---

## ✅ 개발 완료 현황

### Phase 1: 프로젝트 초기 설정 ✅
- Next.js 15.5 프로젝트 생성
- 필수 라이브러리 설치
- Tailwind CSS v4 설정
- Git 초기화

### Phase 2-3: 데이터 & 로직 ✅
- TypeScript 타입 정의 (25개)
- 날씨 시뮬레이션 엔진
- 거래 로직 (매수/매도)
- localStorage 관리
- 커스텀 훅 (4개)

### Phase 4-5: UI 컴포넌트 ✅
- 기본 UI (Button, Card, Input, Slider, Modal)
- 날씨 컴포넌트 (Icon, Chart, Card, Trend)
- Motion 애니메이션 적용

### Phase 6: 페이지 개발 ✅
- 온보딩 (3단계)
- 메인 홈 (원형 레이아웃)
- 날씨 상세 (거래 인터페이스)
- 포트폴리오
- 설정

### Phase 7: 테스트 & 최적화 ✅
- 기능 테스트 체크리스트
- TypeScript 타입 체크 (0 errors)
- Production 빌드 (성공)
- 모바일 반응형 테스트

### Phase 8: 배포 준비 ✅
- 배포 가이드 문서화
- Git 저장소 준비
- Vercel 배포 지침

---

## 🎯 성능 지표

| 항목 | 값 |
|------|-----|
| **First Load JS** | 102-259 kB |
| **TypeScript Errors** | 0 |
| **ESLint Warnings** | 1 (non-critical) |
| **Build Time** | ~6-8초 |
| **페이지 수** | 5개 |
| **컴포넌트 수** | 9개 |

---

## 🧪 테스트

### 자동 테스트
```bash
# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 검사
npm run lint
```

### 수동 테스트
[TESTING_GUIDE.md](TESTING_GUIDE.md) 참고

---

## 🚀 배포

### Vercel (권장)

상세한 배포 방법은 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) 참고

**간단 요약**:
1. GitHub에 푸시
2. Vercel에서 Import
3. 자동 배포 시작
4. URL 생성됨 (`https://[project-name].vercel.app`)

---

## 🔄 업데이트 방법

```bash
# 코드 수정 후
git add .
git commit -m "Update: 기능 추가/수정"
git push origin main

# Vercel이 자동으로 재배포 ✅
```

---

## 📝 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

---

## 👥 기여

버그 제보나 기능 제안은 Issues에 등록해주세요.

---

## 🙏 감사

- **Next.js** - React 프레임워크
- **Tailwind CSS** - 유틸리티 CSS
- **Motion** - 애니메이션 라이브러리
- **Recharts** - 차트 라이브러리
- **Vercel** - 무료 호스팅

---

## 📞 문의

프로젝트 관련 문의사항이 있으시면 Issues를 통해 연락해주세요.

---

**제작일**: 2026년 1월 22일  
**버전**: 1.0.0  
**상태**: ✅ 완료
