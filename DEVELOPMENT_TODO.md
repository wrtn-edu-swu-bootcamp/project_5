# 날씨 에너지 앱 개발 TODO 리스트

> 초등학생을 위한 날씨 기반 경제 교육 앱 개발 상세 가이드  
> 비개발자도 이해할 수 있도록 모든 단계를 자세히 설명합니다.

---

## 📋 프로젝트 개요

**목표**: 초등학교 고학년(10-12세)이 날씨를 사고팔면서 경제를 배우는 교육 앱  
**핵심 기능**: 4가지 날씨(태양☀️, 바람💨, 수분💧, 온도🌡️)를 3분마다 변하는 가격으로 거래  
**예상 개발 기간**: 14-18시간 (1-2일)  
**배포 플랫폼**: Vercel (무료)

**기술 스택 (2026년 최신 버전)**:
- Next.js 15.5 (React 프레임워크)
- React 19.2 (UI 라이브러리)
- TypeScript 5.7 (타입 안정성)
- Tailwind CSS v4.1 (스타일링)
- Motion v12 (애니메이션)
- Recharts 3.6 (차트)

---

## 📚 참고 문서 안내

개발 중 항상 참고해야 할 문서들:

1. **`docs/architecture.md`** (1871줄)
   - 기술 스택 상세 설명 (50-101줄)
   - 프로젝트 구조 (103-184줄)
   - 데이터 모델 정의 (186-302줄)
   - 날씨 시뮬레이션 알고리즘 (308-478줄)
   - 컴포넌트 설계 (864-1252줄)

2. **`docs/design-guide.md`** (1717줄)
   - 색상 시스템 (84-297줄)
   - 타이포그래피 (313-563줄)
   - 일러스트레이션 (565-888줄)
   - 여백과 레이아웃 (890-1108줄)
   - 애니메이션 (1110-1553줄)

3. **`docs/plan.md`** (400줄)
   - 서비스 기획 (26-45줄)
   - 날씨 거래 시스템 (48-180줄)
   - 사용자 시나리오 (286-375줄)

4. **`docs/wireframes.md`** (1183줄)
   - 모든 화면 와이어프레임 (79-949줄)
   - 인터랙션 플로우 (389-404줄)
   - 컴포넌트 상세 (951-1083줄)

5. **`.cursorrules`** (673줄)
   - 코딩 컨벤션 (53-101줄)
   - 디자인 시스템 규칙 (103-248줄)
   - 성능 최적화 가이드 (478-537줄)

---

## 🎯 Phase 1: 프로젝트 초기 설정 (예상 시간: 1-1.5시간)

### ✅ 1.1 개발 환경 준비

**목표**: 컴퓨터에 필요한 프로그램 설치하기

**참고 문서**:
- `docs/architecture.md` 50-79줄 (기술 스택 정의)
- `docs/architecture.md` 1687-1700줄 (개발 환경 설정)

**작업 내용**:

1. **Node.js 설치** (JavaScript 실행 환경)
   - 웹사이트: https://nodejs.org
   - 버전: LTS (Long Term Support) 최신 버전 다운로드
   - 설치 확인 명령어: 터미널에서 `node -v` 입력 → 버전 번호 표시되면 성공
   - 왜 필요한가?: Next.js와 React를 실행하기 위한 기본 환경

2. **코드 에디터 설치** (코드를 작성하는 프로그램)
   - 추천: Visual Studio Code (VS Code)
   - 웹사이트: https://code.visualstudio.com
   - 설치 후 추천 확장 프로그램:
     - ESLint (코드 오류 찾기)
     - Prettier (코드 정리)
     - Tailwind CSS IntelliSense (스타일 자동완성)
     - TypeScript Vue Plugin (타입 지원)

3. **Git 설치** (코드 버전 관리)
   - 웹사이트: https://git-scm.com
   - 설치 확인: `git --version`
   - 왜 필요한가?: 코드 변경 이력 관리 및 Vercel 배포에 필수

**체크리스트**:
- [ ] Node.js 설치 완료 (`node -v` 확인)
- [ ] npm 설치 확인 (`npm -v` 확인, Node.js와 함께 설치됨)
- [ ] VS Code 설치 및 확장 프로그램 설치
- [ ] Git 설치 완료 (`git --version` 확인)

---

### ✅ 1.2 Next.js 프로젝트 생성

**목표**: Next.js 15.5로 새 프로젝트 만들기

**참고 문서**:
- `docs/architecture.md` 1692-1700줄
- 웹 리서치 결과: Next.js 15.5는 Turbopack 베타 지원

**작업 내용**:

1. **터미널 열기**
   - VS Code에서: 상단 메뉴 → Terminal → New Terminal
   - 또는 단축키: Ctrl + ` (백틱)

2. **프로젝트 폴더로 이동**
   ```bash
   cd c:\Users\PC\Desktop\project_v2
   ```

3. **Next.js 프로젝트 생성 명령어 실행**
   ```bash
   npx create-next-app@15.5 . --typescript --tailwind --app
   ```
   
   **명령어 설명**:
   - `npx`: npm 패키지를 설치하지 않고 실행
   - `create-next-app@15.5`: Next.js 15.5 버전으로 프로젝트 생성
   - `.`: 현재 폴더에 생성 (project_v2)
   - `--typescript`: TypeScript 사용 설정
   - `--tailwind`: Tailwind CSS 자동 설정
   - `--app`: App Router 사용 (최신 방식)

4. **설치 중 질문에 답하기**
   - "Would you like to use ESLint?" → **Yes** (코드 품질 검사)
   - "Would you like to use Turbo?" → **Yes** (빠른 개발 서버)
   - "Would you like to customize import alias?" → **No** (기본 설정 사용)

**예상 소요 시간**: 5-10분 (인터넷 속도에 따라 다름)

**체크리스트**:
- [ ] 프로젝트 생성 완료
- [ ] `src/app` 폴더 생성 확인
- [ ] `package.json` 파일 존재 확인
- [ ] `next.config.js` 파일 존재 확인

---

### ✅ 1.3 필수 라이브러리 설치

**목표**: 프로젝트에 필요한 추가 라이브러리 설치하기

**참고 문서**:
- `docs/architecture.md` 61-68줄 (주요 라이브러리)
- `docs/architecture.md` 1797-1819줄 (패키지 버전)
- 웹 리서치 결과: Motion v12, Tailwind v4, React 19 설정 방법

**작업 내용**:

1. **애니메이션 라이브러리 설치** (Motion v12)
   ```bash
   npm install motion
   ```
   - **용도**: 부드러운 애니메이션 효과 (버튼 클릭, 화면 전환 등)
   - **참고**: `docs/design-guide.md` 1110-1553줄 (애니메이션 가이드)

2. **차트 라이브러리 설치** (Recharts 3.6)
   ```bash
   npm install recharts
   ```
   - **용도**: 24시간 날씨 가격 그래프 그리기
   - **참고**: `docs/architecture.md` 939-1009줄 (WeatherChart 컴포넌트)

3. **날짜 처리 라이브러리 설치** (date-fns)
   ```bash
   npm install date-fns
   ```
   - **용도**: 거래 시간, 업데이트 시간 표시
   - **참고**: `docs/plan.md` 139-160줄 (시간대 패턴)

4. **고유 ID 생성 라이브러리 설치** (uuid)
   ```bash
   npm install uuid
   npm install -D @types/uuid
   ```
   - **용도**: 거래 내역에 고유한 ID 부여
   - **참고**: `docs/architecture.md` 266-276줄 (Transaction 타입)

5. **Tailwind CSS v4 Vite 플러그인 설치**
   ```bash
   npm install @tailwindcss/vite
   ```
   - **용도**: Tailwind CSS v4 최적화된 빌드
   - **참고**: 웹 리서치 결과 (Tailwind v4 새로운 설치 방법)

**설치 확인 방법**:
`package.json` 파일을 열어서 "dependencies" 섹션에 위 패키지들이 있는지 확인

**체크리스트**:
- [ ] motion 설치 완료
- [ ] recharts 설치 완료
- [ ] date-fns 설치 완료
- [ ] uuid 및 타입 정의 설치 완료
- [ ] @tailwindcss/vite 설치 완료
- [ ] `package.json`에서 모든 패키지 확인

---

### ✅ 1.4 프로젝트 폴더 구조 생성

**목표**: 코드를 정리할 폴더들 만들기

**참고 문서**:
- `docs/architecture.md` 103-184줄 (프로젝트 구조)
- `.cursorrules` 19-50줄 (파일 조직)

**작업 내용**:

VS Code에서 다음 폴더들을 생성하세요 (우클릭 → New Folder):

```
src/
├── app/                    # 이미 존재 (Next.js가 자동 생성)
├── components/             # 새로 만들기
│   ├── ui/                # 새로 만들기
│   ├── weather/           # 새로 만들기
│   ├── portfolio/         # 새로 만들기
│   ├── trading/           # 새로 만들기
│   └── layout/            # 새로 만들기
├── lib/                   # 새로 만들기
├── hooks/                 # 새로 만들기
├── types/                 # 새로 만들기
└── constants/             # 새로 만들기
```

**각 폴더의 역할**:
- **`components/`**: 재사용 가능한 UI 조각들 (버튼, 카드, 날씨 아이콘 등)
  - `ui/`: 기본 UI 요소 (Button, Card, Input, Slider, Modal)
  - `weather/`: 날씨 관련 컴포넌트 (날씨 카드, 그래프, 아이콘)
  - `portfolio/`: 보관함 관련 컴포넌트 (자산 요약, 보유 카드)
  - `trading/`: 거래 관련 컴포넌트 (거래 모달, 거래 폼)
  - `layout/`: 레이아웃 컴포넌트 (네비게이션, 원형 레이아웃)
- **`lib/`**: 비즈니스 로직 (날씨 시뮬레이션, 가격 계산, 저장소 관리)
- **`hooks/`**: 재사용 가능한 React 훅 (날씨 가격, 포트폴리오 관리)
- **`types/`**: TypeScript 타입 정의 (날씨 데이터, 포트폴리오 구조)
- **`constants/`**: 변하지 않는 값들 (계절 패턴, 색상, 설정)

**체크리스트**:
- [ ] `src/components` 및 하위 폴더 5개 생성
- [ ] `src/lib` 폴더 생성
- [ ] `src/hooks` 폴더 생성
- [ ] `src/types` 폴더 생성
- [ ] `src/constants` 폴더 생성
- [ ] 폴더 구조가 `docs/architecture.md` 103-174줄과 일치하는지 확인

---

### ✅ 1.5 Tailwind CSS v4 설정

**목표**: Tailwind CSS를 프로젝트에 맞게 설정하기

**참고 문서**:
- `docs/architecture.md` 57-95줄 (Tailwind CSS v4.1 선택 이유)
- `docs/design-guide.md` 84-297줄 (색상 시스템)
- 웹 리서치 결과: Tailwind v4 CSS-first 설정 방법

**작업 내용**:

1. **`src/app/globals.css` 파일 수정**
   
   기존 내용을 삭제하고 다음으로 교체:
   ```css
   @import "tailwindcss";

   /* 커스텀 색상 정의 */
   @theme {
     /* 날씨 색상 */
     --color-solar-main: #FFB547;
     --color-solar-bg: #FFF4E0;
     --color-wind-main: #7DD3FC;
     --color-wind-bg: #E8F7FF;
     --color-water-main: #60CFFF;
     --color-water-bg: #E0F7FF;
     --color-heat-main: #FF8A80;
     --color-heat-bg: #FFF0EE;

     /* 상태 색상 */
     --color-rising: #FF6B6B;
     --color-rising-bg: #FFE9E9;
     --color-falling: #74C0FC;
     --color-falling-bg: #E7F5FF;
     --color-stable: #ADB5BD;
     --color-stable-bg: #F1F3F5;

     /* 배경 */
     --color-bg-main: #FFFCF7;
     --color-bg-card: #FFFFFF;
   }

   /* 기본 스타일 */
   body {
     background-color: var(--color-bg-main);
     font-family: var(--font-pretendard), -apple-system, sans-serif;
   }
   ```

   **설명**:
   - `@import "tailwindcss"`: Tailwind v4의 새로운 방식
   - `@theme`: 커스텀 색상을 Tailwind 변수로 정의
   - 색상 참고: `docs/design-guide.md` 89-144줄

2. **Pretendard 폰트 다운로드 및 설정**
   
   a) 폰트 다운로드:
   - 웹사이트: https://github.com/orioncactus/pretendard
   - "Pretendard-Variable.woff2" 파일 다운로드
   
   b) 폴더 생성 및 파일 이동:
   - `public/fonts/` 폴더 생성
   - 다운로드한 폰트 파일을 이 폴더에 복사
   
   c) `src/app/layout.tsx` 수정 (다음 단계에서 진행)

**왜 Tailwind CSS v4인가?**:
- 5배 빠른 빌드 속도
- 간단한 CSS-first 설정
- 더 작은 번들 크기
- 참고: `docs/architecture.md` 91-95줄

**체크리스트**:
- [ ] `globals.css` 파일 수정 완료
- [ ] 커스텀 색상 정의 확인
- [ ] Pretendard 폰트 다운로드
- [ ] `public/fonts/Pretendard-Variable.woff2` 파일 존재 확인

---

### ✅ 1.6 Git 초기화 및 첫 커밋

**목표**: 코드 버전 관리 시작하기

**참고 문서**:
- `docs/architecture.md` 1649-1665줄 (배포 절차)

**작업 내용**:

1. **Git 저장소 초기화**
   ```bash
   git init
   ```
   - **설명**: 현재 폴더를 Git이 관리하는 프로젝트로 만듦

2. **`.gitignore` 파일 확인**
   - Next.js가 자동으로 생성했는지 확인
   - 없으면 생성하고 다음 내용 추가:
   ```
   node_modules/
   .next/
   .env*.local
   .vercel
   ```

3. **첫 커밋 만들기**
   ```bash
   git add .
   git commit -m "Initial commit: Project setup with Next.js 15.5"
   ```
   
   **명령어 설명**:
   - `git add .`: 모든 파일을 커밋 대상에 추가
   - `git commit -m "..."`: 변경사항을 저장 (메시지와 함께)

4. **GitHub 저장소 생성 (선택 사항, 나중에 배포 시 필요)**
   - 웹사이트: https://github.com
   - "New repository" 클릭
   - 저장소 이름: `weather-energy-app`
   - Public/Private 선택
   - "Create repository" 클릭
   - 생성된 명령어를 복사해서 실행:
   ```bash
   git remote add origin https://github.com/[your-username]/weather-energy-app.git
   git branch -M main
   git push -u origin main
   ```

**체크리스트**:
- [ ] Git 초기화 완료
- [ ] `.gitignore` 파일 존재 및 내용 확인
- [ ] 첫 커밋 완료
- [ ] (선택) GitHub 저장소 생성 및 연결

---

## 🎯 Phase 2: 데이터 구조 및 비즈니스 로직 (예상 시간: 3-4시간)

### ✅ 2.1 TypeScript 타입 정의

**목표**: 앱에서 사용할 모든 데이터의 구조를 정의하기

**참고 문서**:
- `docs/architecture.md` 186-302줄 (데이터 모델 전체)
- `.cursorrules` 53-90줄 (타입 정의 규칙)

**작업 내용**:

**`src/types/index.ts` 파일 생성**하고 다음 코드 작성:

```typescript
/**
 * 날씨 에너지 앱 타입 정의
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
```

**코드 설명**:
- `export type`: 특정 값만 허용하는 타입 (예: 'solar', 'wind' 중 하나만)
- `export interface`: 객체의 구조를 정의
- `number`: 숫자 타입
- `string`: 문자열 타입
- `boolean`: true/false
- `?`: 선택적 속성 (없어도 됨)
- `[]`: 배열 (여러 개)

**체크리스트**:
- [ ] `src/types/index.ts` 파일 생성
- [ ] 모든 타입 정의 작성 완료
- [ ] 주석으로 각 타입의 용도 설명 추가
- [ ] TypeScript 오류 없는지 확인 (VS Code에서 빨간 밑줄 없으면 OK)

---

### ✅ 2.2 상수 정의 - 날씨 패턴

**목표**: 계절/시간에 따른 날씨 가격 패턴 데이터 만들기

**참고 문서**:
- `docs/architecture.md` 310-406줄 (계절 패턴 데이터)
- `docs/plan.md` 108-160줄 (계절/시간 패턴 설명)

**작업 내용**:

**`src/constants/weather-patterns.ts` 파일 생성**하고 다음 코드 작성:

```typescript
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
```

**패턴 이해하기**:
- **겨울 (12-2월)**: 태양/온도 낮음, 물 건조
- **봄 (3-5월)**: 바람 많음, 모든 날씨 상승
- **여름 (6-8월)**: 태양/온도/물 최고 (장마)
- **가을 (9-11월)**: 바람 많음, 온도 하락

**체크리스트**:
- [ ] `src/constants/weather-patterns.ts` 파일 생성
- [ ] `SEASONAL_PATTERNS` 정의 완료 (4 날씨 × 12개월)
- [ ] `TIME_MULTIPLIERS` 정의 완료 (4 날씨 × 24시간)
- [ ] TypeScript 오류 없는지 확인

---

### ✅ 2.3 상수 정의 - 날씨 설정 및 색상

**목표**: 4가지 날씨의 기본 정보와 색상 정의하기

**참고 문서**:
- `docs/design-guide.md` 89-144줄 (날씨 색상)
- `docs/architecture.md` 223-230줄 (WeatherConfig)
- `.cursorrules` 107-139줄 (색상 팔레트)

**작업 내용**:

**`src/constants/config.ts` 파일 생성**하고 다음 코드 작성:

```typescript
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
```

**코드 설명**:
- `Record<WeatherType, WeatherConfig>`: 4가지 날씨 각각에 설정 객체 연결
- `as const`: 값을 변경할 수 없게 고정 (상수로 만듦)
- `@/types`: `src/types` 폴더를 의미 (TypeScript 경로 별칭)

**체크리스트**:
- [ ] `src/constants/config.ts` 파일 생성
- [ ] 업데이트 주기 및 초기값 정의
- [ ] 4가지 날씨 설정 완료
- [ ] 상태별/성공/경고 색상 정의
- [ ] 색상 코드가 `docs/design-guide.md`와 일치하는지 확인

---

### ✅ 2.4 날씨 시뮬레이션 로직

**목표**: 계절/시간에 맞는 날씨 가격을 생성하는 함수 만들기

**참고 문서**:
- `docs/architecture.md` 408-478줄 (가격 생성 로직)
- `docs/plan.md` 138-160줄 (계절 패턴 작동 방식)

**작업 내용**:

**`src/lib/weather-simulator.ts` 파일 생성**하고 다음 코드 작성:

```typescript
/**
 * 날씨 시뮬레이션 엔진
 * 계절과 시간에 따라 현실적인 날씨 가격 생성
 * 참고: docs/architecture.md 408-478줄
 */

import { SEASONAL_PATTERNS, TIME_MULTIPLIERS } from '@/constants/weather-patterns';
import type { WeatherType, WeatherTrend } from '@/types';

/**
 * 범위 내 랜덤 숫자 생성
 */
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 특정 날씨의 현재 가격 생성
 * @param type - 날씨 종류
 * @param date - 기준 날짜/시간 (기본값: 현재)
 * @returns 생성된 가격 (에너지)
 */
export function generateWeatherPrice(
  type: WeatherType,
  date: Date = new Date()
): number {
  // 1. 현재 월(1-12)과 시간(0-23) 가져오기
  const month = (date.getMonth() + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  const hour = date.getHours() as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
  
  // 2. 해당 월의 계절 패턴 가져오기
  const pattern = SEASONAL_PATTERNS[type][month];
  
  // 3. 해당 시간의 가중치 가져오기
  const timeMultiplier = TIME_MULTIPLIERS[type][hour];
  
  // 4. 기본 가격 생성 (계절 패턴 범위 내)
  const basePrice = randomInRange(pattern.min, pattern.max);
  
  // 5. 시간대 가중치 적용
  const priceWithTime = basePrice * timeMultiplier;
  
  // 6. 랜덤 변동성 추가 (더 현실적으로)
  // volatility가 0.2면 ±20% 변동
  const volatilityFactor = 1 + (Math.random() - 0.5) * pattern.volatility * 2;
  const finalPrice = priceWithTime * volatilityFactor;
  
  // 7. 최소 가격 보장 (100 이상) 및 반올림
  return Math.max(100, Math.round(finalPrice));
}

/**
 * 4가지 날씨 모두의 가격 생성
 * @param date - 기준 날짜/시간
 * @returns 날씨별 가격 객체
 */
export function generateAllWeatherPrices(
  date: Date = new Date()
): Record<WeatherType, number> {
  return {
    solar: generateWeatherPrice('solar', date),
    wind: generateWeatherPrice('wind', date),
    water: generateWeatherPrice('water', date),
    heat: generateWeatherPrice('heat', date),
  };
}

/**
 * 추세 계산 (이전 가격 대비 변화)
 * @param currentPrice - 현재 가격
 * @param previousPrice - 이전 가격
 * @returns 추세 ('rising', 'falling', 'stable')
 */
export function calculateTrend(
  currentPrice: number,
  previousPrice: number
): WeatherTrend {
  const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
  
  // 1% 이상 올랐으면 상승
  if (changePercent > 1) return 'rising';
  
  // 1% 이상 내렸으면 하락
  if (changePercent < -1) return 'falling';
  
  // 그 외는 안정
  return 'stable';
}

/**
 * 변화율 계산 헬퍼 함수
 */
export function calculateChange(currentPrice: number, previousPrice: number) {
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;
  
  return {
    change,           // 절대값
    changePercent,    // 퍼센트
  };
}
```

**로직 설명**:
1. **계절 패턴 적용**: 7월에는 태양 에너지가 800-1200 범위
2. **시간대 적용**: 낮 12시에는 태양 100%, 밤 12시에는 0%
3. **변동성 추가**: 완전히 예측 가능하지 않도록 랜덤 요소
4. **최소 보장**: 항상 100 이상의 가격 유지

**예시**:
- 7월 낮 12시 태양: 800-1200 범위 × 1.0 (100%) = 800-1200
- 7월 밤 12시 태양: 800-1200 범위 × 0.0 (0%) = 100 (최소값)
- 1월 낮 12시 태양: 200-400 범위 × 1.0 (100%) = 200-400

**체크리스트**:
- [ ] `src/lib/weather-simulator.ts` 파일 생성
- [ ] `generateWeatherPrice` 함수 작성
- [ ] `generateAllWeatherPrices` 함수 작성
- [ ] `calculateTrend` 함수 작성
- [ ] TypeScript 오류 없는지 확인

---

### ✅ 2.5 가격 계산 및 거래 로직

**목표**: 사고 팔기 기능 만들기 (포트폴리오 업데이트)

**참고 문서**:
- `docs/architecture.md` 686-860줄 (거래 시스템)
- `docs/plan.md` 162-179줄 (사고 파는 방법)

**작업 내용**:

**`src/lib/price-calculator.ts` 파일 생성**하고 다음 코드 작성:

```typescript
/**
 * 가격 계산 및 거래 실행 로직
 * 참고: docs/architecture.md 686-860줄
 */

import { v4 as uuidv4 } from 'uuid';
import type { Portfolio, WeatherType, Transaction, Holding } from '@/types';

/**
 * 매수 실행
 * @param portfolio - 현재 포트폴리오
 * @param type - 날씨 종류
 * @param quantity - 구매 수량
 * @param currentPrice - 현재 가격
 * @returns 업데이트된 포트폴리오
 */
export function executeBuy(
  portfolio: Portfolio,
  type: WeatherType,
  quantity: number,
  currentPrice: number
): Portfolio {
  // 1. 총 비용 계산
  const totalCost = quantity * currentPrice;
  
  // 2. 잔액 확인
  if (portfolio.energy < totalCost) {
    throw new Error('에너지가 부족합니다');
  }
  
  // 3. 거래 내역 생성
  const transaction: Transaction = {
    id: uuidv4(),                  // 고유 ID
    type,
    action: 'buy',
    quantity,
    price: currentPrice,
    totalAmount: totalCost,
    timestamp: Date.now(),
  };
  
  // 4. 기존 보유 항목 찾기
  const existingHolding = portfolio.holdings.find(h => h.type === type);
  
  let updatedHoldings: Holding[];
  
  if (existingHolding) {
    // 4-1. 이미 가지고 있으면 → 추가 매수 (평균 매수가 재계산)
    const totalQuantity = existingHolding.quantity + quantity;
    const totalInvested = existingHolding.totalInvested + totalCost;
    const avgBuyPrice = totalInvested / totalQuantity;  // 평균 매수가
    
    updatedHoldings = portfolio.holdings.map(h =>
      h.type === type
        ? {
            type: h.type,
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
    // 4-2. 처음 사는 거면 → 새 보유 항목 추가
    updatedHoldings = [
      ...portfolio.holdings,
      {
        type,
        quantity,
        avgBuyPrice: currentPrice,      // 현재 가격이 평균 매수가
        totalInvested: totalCost,
        currentPrice,
        currentValue: totalCost,
        profitLoss: 0,                  // 처음엔 손익 0
        profitLossPercent: 0,
      },
    ];
  }
  
  // 5. 업데이트된 포트폴리오 반환
  return {
    ...portfolio,
    energy: portfolio.energy - totalCost,        // 에너지 차감
    holdings: updatedHoldings,
    transactions: [transaction, ...portfolio.transactions],  // 최신순
    lastUpdated: Date.now(),
  };
}

/**
 * 매도 실행
 * @param portfolio - 현재 포트폴리오
 * @param type - 날씨 종류
 * @param quantity - 판매 수량
 * @param currentPrice - 현재 가격
 * @returns 업데이트된 포트폴리오
 */
export function executeSell(
  portfolio: Portfolio,
  type: WeatherType,
  quantity: number,
  currentPrice: number
): Portfolio {
  // 1. 보유 확인
  const holding = portfolio.holdings.find(h => h.type === type);
  
  if (!holding || holding.quantity < quantity) {
    throw new Error('보유 수량이 부족합니다');
  }
  
  // 2. 수익 계산
  const totalRevenue = quantity * currentPrice;                    // 판매 금액
  const soldCost = (holding.totalInvested / holding.quantity) * quantity;  // 원래 샀던 금액
  const profitLoss = totalRevenue - soldCost;                      // 손익
  
  // 3. 거래 내역 생성
  const transaction: Transaction = {
    id: uuidv4(),
    type,
    action: 'sell',
    quantity,
    price: currentPrice,
    totalAmount: totalRevenue,
    timestamp: Date.now(),
    profitLoss,                  // 매도는 손익 기록
  };
  
  // 4. 보유 항목 업데이트
  const remainingQuantity = holding.quantity - quantity;
  let updatedHoldings: Holding[];
  
  if (remainingQuantity === 0) {
    // 4-1. 전량 매도 → 항목 제거
    updatedHoldings = portfolio.holdings.filter(h => h.type !== type);
  } else {
    // 4-2. 일부 매도 → 수량 감소
    updatedHoldings = portfolio.holdings.map(h =>
      h.type === type
        ? {
            type: h.type,
            quantity: remainingQuantity,
            avgBuyPrice: h.avgBuyPrice,              // 평균 매수가 유지
            totalInvested: h.totalInvested - soldCost,
            currentPrice,
            currentValue: remainingQuantity * currentPrice,
            profitLoss: (currentPrice - h.avgBuyPrice) * remainingQuantity,
            profitLossPercent: ((currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100,
          }
        : h
    );
  }
  
  // 5. 업데이트된 포트폴리오 반환
  return {
    ...portfolio,
    energy: portfolio.energy + totalRevenue,     // 에너지 증가
    holdings: updatedHoldings,
    transactions: [transaction, ...portfolio.transactions],
    lastUpdated: Date.now(),
  };
}

/**
 * 포트폴리오 총 가치 계산
 * @param portfolio - 현재 포트폴리오
 * @param currentPrices - 현재 가격들
 * @returns 총 가치, 손익, 손익률
 */
export function calculateTotalValue(
  portfolio: Portfolio,
  currentPrices: Record<WeatherType, number>
): {
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
} {
  // 1. 보유 날씨들의 현재 가치 합산
  const holdingsValue = portfolio.holdings.reduce((sum, holding) => {
    const currentPrice = currentPrices[holding.type];
    return sum + (holding.quantity * currentPrice);
  }, 0);
  
  // 2. 총 가치 = 보유 에너지 + 보유 날씨 가치
  const totalValue = portfolio.energy + holdingsValue;
  
  // 3. 손익 = 현재 가치 - 초기 자본 (10,000)
  const profitLoss = totalValue - 10000;
  
  // 4. 손익률 = (손익 / 초기 자본) × 100
  const profitLossPercent = (profitLoss / 10000) * 100;
  
  return {
    totalValue,
    profitLoss,
    profitLossPercent,
  };
}

/**
 * 보유 날씨 업데이트 (현재 가격 반영)
 * @param holdings - 현재 보유 목록
 * @param currentPrices - 현재 가격들
 * @returns 업데이트된 보유 목록
 */
export function updateHoldingsPrices(
  holdings: Holding[],
  currentPrices: Record<WeatherType, number>
): Holding[] {
  return holdings.map(holding => {
    const currentPrice = currentPrices[holding.type];
    const currentValue = holding.quantity * currentPrice;
    const profitLoss = (currentPrice - holding.avgBuyPrice) * holding.quantity;
    const profitLossPercent = ((currentPrice - holding.avgBuyPrice) / holding.avgBuyPrice) * 100;
    
    return {
      ...holding,
      currentPrice,
      currentValue,
      profitLoss,
      profitLossPercent,
    };
  });
}
```

**로직 설명**:
- **매수**: 에너지 차감 → 평균 매수가 계산 → 보유 항목 추가/업데이트
- **매도**: 수익 계산 → 에너지 증가 → 보유 항목 감소/제거
- **평균 매수가**: (총 투자 금액) ÷ (총 수량)
- **손익**: (현재 가격 - 평균 매수가) × 수량

**예시**:
1. 태양 1개를 1,000에 구매 → 평균 매수가 1,000
2. 태양 1개를 1,200에 추가 구매 → 평균 매수가 1,100 ((1,000+1,200)/2)
3. 현재 가격 1,300 → 손익 +400 ((1,300-1,100) × 2개)

**체크리스트**:
- [ ] `src/lib/price-calculator.ts` 파일 생성
- [ ] `executeBuy` 함수 작성
- [ ] `executeSell` 함수 작성
- [ ] `calculateTotalValue` 함수 작성
- [ ] `updateHoldingsPrices` 함수 작성
- [ ] 평균 매수가 계산 로직 확인

---

### ✅ 2.6 로컬스토리지 관리

**목표**: 브라우저에 포트폴리오를 저장하고 불러오는 기능 만들기

**참고 문서**:
- `docs/architecture.md` 574-683줄 (로컬스토리지 관리)

**작업 내용**:

**`src/lib/storage.ts` 파일 생성**하고 다음 코드 작성:

```typescript
/**
 * localStorage를 사용한 데이터 영구 저장
 * 참고: docs/architecture.md 574-683줄
 */

import { INITIAL_ENERGY } from '@/constants/config';
import type { Portfolio, AppSettings } from '@/types';

/**
 * 저장소 키 정의
 */
const STORAGE_KEYS = {
  PORTFOLIO: 'weather-app-portfolio',
  SETTINGS: 'weather-app-settings',
  VERSION: 'weather-app-version',
} as const;

/**
 * 현재 앱 버전
 * 버전이 바뀌면 기존 데이터 삭제 (호환성 문제 방지)
 */
const CURRENT_VERSION = '1.0.0';

/**
 * 포트폴리오 저장
 * @param portfolio - 저장할 포트폴리오
 */
export function savePortfolio(portfolio: Portfolio): void {
  try {
    const jsonString = JSON.stringify(portfolio);
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, jsonString);
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
  } catch (error) {
    console.error('포트폴리오 저장 실패:', error);
    // 저장소가 꽉 찼을 수 있음 (QuotaExceededError)
  }
}

/**
 * 포트폴리오 불러오기
 * @returns 저장된 포트폴리오 또는 null
 */
export function loadPortfolio(): Portfolio | null {
  try {
    // 1. 버전 확인
    const savedVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (savedVersion !== CURRENT_VERSION) {
      console.warn('버전 불일치, 저장소 초기화');
      clearAllStorage();
      return null;
    }
    
    // 2. 데이터 불러오기
    const jsonString = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (!jsonString) {
      return null;  // 저장된 데이터 없음
    }
    
    // 3. JSON 파싱
    const portfolio = JSON.parse(jsonString) as Portfolio;
    
    // 4. 데이터 유효성 검사 (기본적인)
    if (!portfolio.energy || !Array.isArray(portfolio.holdings)) {
      console.warn('잘못된 데이터 형식');
      return null;
    }
    
    return portfolio;
  } catch (error) {
    console.error('포트폴리오 불러오기 실패:', error);
    return null;
  }
}

/**
 * 초기 포트폴리오 생성 (처음 시작할 때)
 * @returns 새 포트폴리오
 */
export function createInitialPortfolio(): Portfolio {
  return {
    energy: INITIAL_ENERGY,        // 10,000
    totalValue: INITIAL_ENERGY,
    profitLoss: 0,
    profitLossPercent: 0,
    holdings: [],                  // 비어있음
    transactions: [],              // 비어있음
    createdAt: Date.now(),
    lastUpdated: Date.now(),
  };
}

/**
 * 설정 저장
 * @param settings - 저장할 설정
 */
export function saveSettings(settings: AppSettings): void {
  try {
    const jsonString = JSON.stringify(settings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, jsonString);
  } catch (error) {
    console.error('설정 저장 실패:', error);
  }
}

/**
 * 설정 불러오기
 * @returns 저장된 설정 또는 기본값
 */
export function loadSettings(): AppSettings {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!jsonString) {
      // 기본 설정 반환
      return {
        notificationsEnabled: true,
        soundEnabled: true,
        theme: 'light',
      };
    }
    
    const settings = JSON.parse(jsonString) as AppSettings;
    return settings;
  } catch (error) {
    console.error('설정 불러오기 실패:', error);
    // 기본 설정 반환
    return {
      notificationsEnabled: true,
      soundEnabled: true,
      theme: 'light',
    };
  }
}

/**
 * 모든 저장소 초기화 (리셋)
 */
export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('저장소 초기화 완료');
  } catch (error) {
    console.error('저장소 초기화 실패:', error);
  }
}

/**
 * 저장소 사용량 확인 (디버깅용)
 */
export function checkStorageSize(): number {
  try {
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        totalSize += value.length;
      }
    });
    // 바이트 단위 반환
    return totalSize;
  } catch {
    return 0;
  }
}
```

**로컬스토리지란?**:
- 브라우저에 데이터를 저장하는 공간 (약 5-10MB)
- 앱을 닫았다가 다시 열어도 데이터 유지
- 문자열만 저장 가능 → JSON.stringify/parse 사용

**저장 시점**:
- 거래할 때마다 자동 저장
- 설정 변경할 때 자동 저장
- 3분마다 가격 업데이트 때는 저장 안 함 (성능)

**체크리스트**:
- [ ] `src/lib/storage.ts` 파일 생성
- [ ] `savePortfolio` / `loadPortfolio` 함수 작성
- [ ] `createInitialPortfolio` 함수 작성
- [ ] `saveSettings` / `loadSettings` 함수 작성
- [ ] `clearAllStorage` 함수 작성
- [ ] 에러 처리 (try-catch) 확인

---

### ✅ 2.7 유틸리티 함수

**목표**: 자주 사용하는 헬퍼 함수들 만들기

**참고 문서**:
- `docs/architecture.md` 153줄 (utils.ts)

**작업 내용**:

**`src/lib/utils.ts` 파일 생성**하고 다음 코드 작성:

```typescript
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
```

**유틸리티 함수 사용 예시**:
```typescript
formatNumber(12350)              // "12,350"
formatEnergy(1200)              // "1,200 ⚡"
formatPercent(23.5)             // "+23.5%"
formatTimeAgo(Date.now() - 60000)  // "1분 전"
getCurrentSeason()              // "겨울" (12월 기준)
```

**체크리스트**:
- [ ] `src/lib/utils.ts` 파일 생성
- [ ] 숫자/에너지/퍼센트 포맷 함수 작성
- [ ] 시간/날짜 포맷 함수 작성
- [ ] 계절 관련 함수 작성
- [ ] 클래스명 조합 함수 작성

---

## 🎯 Phase 3: 커스텀 훅 개발 (예상 시간: 2-3시간)

### ✅ 3.1 날씨 가격 관리 훅

**목표**: 3분마다 자동으로 날씨 가격을 업데이트하는 훅 만들기

**참고 문서**:
- `docs/architecture.md` 480-572줄 (3분 자동 업데이트 시스템)
- `.cursorrules` 265-290줄 (useWeatherPrices 예제)

**작업 내용**:

**`src/hooks/useWeatherPrices.ts` 파일 생성**하고 다음 코드 작성:

```typescript
/**
 * 날씨 가격 관리 훅
 * 3분마다 자동으로 가격 업데이트
 * 참고: docs/architecture.md 480-572줄
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateAllWeatherPrices, calculateTrend, calculateChange } from '@/lib/weather-simulator';
import { WEATHER_CONFIGS, UPDATE_INTERVAL, HISTORY_LENGTH } from '@/constants/config';
import type { WeatherData, WeatherType } from '@/types';

/**
 * 날씨 가격 자동 업데이트 훅
 * @returns 날씨 데이터, 로딩 상태, 마지막 업데이트 시간
 */
export function useWeatherPrices() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  /**
   * 가격 업데이트 함수
   */
  const updatePrices = useCallback(() => {
    const now = new Date();
    const newPrices = generateAllWeatherPrices(now);
    const timestamp = now.getTime();

    setWeatherData(prevData => {
      // 첫 업데이트 (초기 로드)
      if (prevData.length === 0) {
        return Object.entries(WEATHER_CONFIGS).map(([type, config]) => {
          const price = newPrices[type as WeatherType];
          
          return {
            type: type as WeatherType,
            name: config.name,
            emoji: config.emoji,
            price,
            change: 0,
            changePercent: 0,
            trend: 'stable' as const,
            history: [{
              timestamp,
              price,
            }],
          };
        });
      }

      // 기존 데이터 업데이트 (2번째 업데이트부터)
      return prevData.map(weather => {
        const newPrice = newPrices[weather.type];
        const oldPrice = weather.price;
        
        // 변화 계산
        const { change, changePercent } = calculateChange(newPrice, oldPrice);
        const trend = calculateTrend(newPrice, oldPrice);

        // 이력 추가 (최대 HISTORY_LENGTH개 유지)
        const newHistory = [
          ...weather.history,
          { timestamp, price: newPrice },
        ].slice(-HISTORY_LENGTH);  // 최근 480개만 유지

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

  // 초기 로드 및 3분 주기 자동 업데이트
  useEffect(() => {
    // 1. 즉시 첫 업데이트
    updatePrices();
    setIsLoading(false);

    // 2. 3분마다 자동 업데이트 설정
    const interval = setInterval(updatePrices, UPDATE_INTERVAL);

    // 3. 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(interval);
  }, [updatePrices]);

  return {
    weatherData,      // 4가지 날씨 데이터
    isLoading,        // 로딩 상태
    lastUpdate,       // 마지막 업데이트 시간
    updatePrices,     // 수동 업데이트 함수 (필요시)
  };
}

/**
 * 특정 날씨 하나의 데이터 가져오기 (편의 함수)
 */
export function useWeatherData(type: WeatherType) {
  const { weatherData, isLoading } = useWeatherPrices();
  const weather = weatherData.find(w => w.type === type);
  
  return {
    weather,
    isLoading,
  };
}
```

**작동 방식**:
1. **초기 로드**: 컴포넌트가 마운트되면 즉시 가격 생성
2. **3분 주기**: `setInterval`로 180초마다 `updatePrices` 호출
3. **이력 관리**: 최근 480개 가격만 유지 (24시간분)
4. **변화 계산**: 이전 가격과 비교해서 상승/하락/안정 판단

**체크리스트**:
- [ ] `src/hooks/useWeatherPrices.ts` 파일 생성
- [ ] `useWeatherPrices` 훅 작성
- [ ] `useWeatherData` 편의 함수 작성
- [ ] `'use client'` 지시어 확인 (클라이언트 컴포넌트용)
- [ ] TypeScript 오류 없는지 확인

---

### ✅ 3.2 포트폴리오 관리 훅

**목표**: 포트폴리오 상태 관리 및 거래 실행 훅 만들기

**참고 문서**:
- `docs/architecture.md` 1414-1474줄 (포트폴리오 관리 훅)
- `.cursorrules` 461-490줄 (usePortfolio 예제)

**작업 내용**:

**`src/hooks/usePortfolio.ts` 파일 생성**하고 다음 코드 작성:

```typescript
/**
 * 포트폴리오 관리 훅
 * 참고: docs/architecture.md 1414-1474줄
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { loadPortfolio, savePortfolio, createInitialPortfolio } from '@/lib/storage';
import { executeBuy, executeSell, calculateTotalValue, updateHoldingsPrices } from '@/lib/price-calculator';
import type { Portfolio, WeatherType, WeatherData } from '@/types';

/**
 * 포트폴리오 관리 훅
 * @param weatherData - 현재 날씨 데이터 (가격 정보)
 * @returns 포트폴리오, 총 가치, 손익, 거래 함수
 */
export function usePortfolio(weatherData: WeatherData[]) {
  // 1. 포트폴리오 상태 (로컬스토리지에서 불러오기 또는 새로 생성)
  const [portfolio, setPortfolio] = useState<Portfolio>(() => {
    // 초기 state는 함수로 lazy 초기화 (한 번만 실행)
    const saved = loadPortfolio();
    return saved || createInitialPortfolio();
  });

  // 2. 현재 가격 맵 (WeatherType → price)
  const currentPrices = useMemo(() => {
    return weatherData.reduce((acc, w) => {
      acc[w.type] = w.price;
      return acc;
    }, {} as Record<WeatherType, number>);
  }, [weatherData]);

  // 3. 총 가치 계산 (현재 가격 기준)
  const { totalValue, profitLoss, profitLossPercent } = useMemo(() => {
    // weatherData가 비어있으면 기본값
    if (weatherData.length === 0) {
      return {
        totalValue: portfolio.energy,
        profitLoss: 0,
        profitLossPercent: 0,
      };
    }
    
    return calculateTotalValue(portfolio, currentPrices);
  }, [portfolio, weatherData, currentPrices]);

  // 4. 가격 변동 시 보유 날씨 업데이트
  useEffect(() => {
    if (weatherData.length === 0 || portfolio.holdings.length === 0) {
      return;  // 아직 데이터 없으면 스킵
    }

    setPortfolio(prev => {
      const updatedHoldings = updateHoldingsPrices(prev.holdings, currentPrices);
      
      return {
        ...prev,
        holdings: updatedHoldings,
        totalValue,
        profitLoss,
        profitLossPercent,
      };
    });
  }, [currentPrices, weatherData.length, totalValue, profitLoss, profitLossPercent]);

  // 5. 포트폴리오 변경 시 자동 저장
  useEffect(() => {
    savePortfolio(portfolio);
  }, [portfolio]);

  /**
   * 거래 실행 함수
   */
  const executeTrade = useCallback(async (
    action: 'buy' | 'sell',
    type: WeatherType,
    quantity: number
  ) => {
    const currentPrice = currentPrices[type];
    
    if (!currentPrice) {
      throw new Error('가격 정보를 불러올 수 없습니다');
    }
    
    try {
      const updatedPortfolio = action === 'buy'
        ? executeBuy(portfolio, type, quantity, currentPrice)
        : executeSell(portfolio, type, quantity, currentPrice);
      
      setPortfolio(updatedPortfolio);
      
      // 성공 피드백 (선택 사항)
      return { success: true };
    } catch (error) {
      // 에러 처리
      console.error('거래 실패:', error);
      throw error;
    }
  }, [portfolio, currentPrices]);

  /**
   * 특정 날씨 보유 정보 가져오기
   */
  const getHolding = useCallback((type: WeatherType) => {
    return portfolio.holdings.find(h => h.type === type);
  }, [portfolio.holdings]);

  /**
   * 최대 매수 가능 수량 계산
   */
  const getMaxBuyQuantity = useCallback((type: WeatherType): number => {
    const currentPrice = currentPrices[type];
    if (!currentPrice || currentPrice === 0) return 0;
    
    return Math.floor(portfolio.energy / currentPrice);
  }, [portfolio.energy, currentPrices]);

  /**
   * 최대 매도 가능 수량 (보유 수량)
   */
  const getMaxSellQuantity = useCallback((type: WeatherType): number => {
    const holding = getHolding(type);
    return holding?.quantity || 0;
  }, [getHolding]);

  return {
    portfolio,              // 전체 포트폴리오
    totalValue,             // 총 가치
    profitLoss,             // 손익 (절대값)
    profitLossPercent,      // 손익률 (%)
    executeTrade,           // 거래 실행 함수
    getHolding,             // 특정 날씨 보유 정보
    getMaxBuyQuantity,      // 최대 매수 가능 수량
    getMaxSellQuantity,     // 최대 매도 가능 수량
  };
}
```

**작동 방식**:
1. **초기화**: 로컬스토리지에서 불러오거나 10,000 에너지로 시작
2. **가격 업데이트**: weatherData가 변경되면 보유 날씨의 현재 가치 재계산
3. **자동 저장**: 거래할 때마다 자동으로 로컬스토리지에 저장
4. **거래 실행**: executeTrade 함수로 사고팔기

**체크리스트**:
- [ ] `src/hooks/usePortfolio.ts` 파일 생성
- [ ] `usePortfolio` 훅 작성
- [ ] 거래 함수들 (`executeTrade`, `getHolding` 등) 작성
- [ ] `'use client'` 지시어 확인
- [ ] useMemo/useCallback 최적화 확인

---

### ✅ 3.3 로컬스토리지 훅

**목표**: 로컬스토리지를 React 상태처럼 사용하는 훅 만들기

**참고 문서**:
- `docs/architecture.md` 158줄 (useLocalStorage 언급)

**작업 내용**:

**`src/hooks/useLocalStorage.ts` 파일 생성**하고 다음 코드 작성:

```typescript
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
```

**사용 예시**:
```typescript
// 설정 저장/불러오기
const [settings, setSettings] = useLocalStorage('app-settings', {
  notificationsEnabled: true,
  soundEnabled: true,
});

// 사용
setSettings({ ...settings, soundEnabled: false });
```

**체크리스트**:
- [ ] `src/hooks/useLocalStorage.ts` 파일 생성
- [ ] `useLocalStorage` 훅 작성
- [ ] 제네릭 타입 `<T>` 사용 확인
- [ ] 서버 사이드 렌더링 고려 (`window` 체크)

---

### ✅ 3.4 인터벌 훅

**목표**: setInterval을 안전하게 사용하는 훅 만들기

**참고 문서**:
- `docs/architecture.md` 158줄 (useInterval 언급)

**작업 내용**:

**`src/hooks/useInterval.ts` 파일 생성**하고 다음 코드 작성:

```typescript
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
```

**사용 예시**:
```typescript
// 1초마다 카운트 증가
const [count, setCount] = useState(0);
useInterval(() => {
  setCount(count + 1);
}, 1000);

// 정지
useInterval(() => {
  // ...
}, null);  // null을 전달하면 정지
```

**체크리스트**:
- [ ] `src/hooks/useInterval.ts` 파일 생성
- [ ] `useInterval` 훅 작성
- [ ] useRef로 최신 콜백 저장 확인
- [ ] 클린업 로직 확인

---

**Phase 2와 3 완료!** 🎉

이제 비즈니스 로직과 데이터 관리가 모두 준비되었습니다. 다음 Phase에서는 실제 UI 컴포넌트를 만들 것입니다.

**지금까지 만든 것**:
- ✅ 데이터 타입 정의 (TypeScript)
- ✅ 계절/시간 패턴 데이터
- ✅ 날씨 시뮬레이션 엔진
- ✅ 거래 시스템 (사고팔기)
- ✅ 로컬스토리지 관리
- ✅ 유틸리티 함수들
- ✅ 커스텀 훅 4개

**다음 단계**: UI 컴포넌트 개발 (버튼, 카드, 모달 등)

---

## 🎯 Phase 4: 기본 UI 컴포넌트 (예상 시간: 2-3시간)

### ✅ 4.1 Button 컴포넌트

**목표**: 앱 전체에서 사용할 버튼 컴포넌트 만들기

**참고 문서**:
- `docs/design-guide.md` 967-987줄 (버튼 스타일)
- `docs/wireframes.md` 952-987줄 (버튼 타입)
- `.cursorrules` 393-425줄 (Button 예제)

**작업 내용**:

**`src/components/ui/Button.tsx` 파일 생성**하고 다음 코드 작성:

```typescript
/**
 * 버튼 컴포넌트
 * 참고: docs/design-guide.md 967-987줄
 */

'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  // 베이스 스타일
  const baseStyles = 'px-6 py-4 rounded-xl font-semibold transition-colors min-w-[44px] min-h-[44px]';
  
  // 버튼 타입별 스타일
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  };
  
  // disabled 스타일
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={cn(
        baseStyles,
        variants[variant],
        disabled && disabledStyles,
        className
      )}
    >
      {children}
    </motion.button>
  );
}
```

**버튼 종류**:
- **Primary**: 주요 액션 (파란색) - "확인! 사기 →"
- **Secondary**: 보조 액션 (회색) - "나중에 하기"
- **Danger**: 위험한 액션 (빨간색) - "전부 팔기"

**사용 예시**:
```typescript
<Button variant="primary" onClick={handleBuy}>
  확인! 사기 →
</Button>

<Button variant="secondary" onClick={handleClose}>
  취소
</Button>
```

**체크리스트**:
- [ ] `src/components/ui/Button.tsx` 파일 생성
- [ ] 3가지 variant (primary, secondary, danger) 구현
- [ ] Motion 애니메이션 (whileTap) 추가
- [ ] 최소 터치 영역 44x44px 확인
- [ ] disabled 상태 처리

---

### ✅ 4.2 Card 컴포넌트

**목표**: 컨텐츠를 담는 카드 컴포넌트 만들기

**참고 문서**:
- `docs/design-guide.md` 225-238줄 (카드 배경)
- `docs/design-guide.md` 937-960줄 (카드 여백)

**작업 내용**:

**`src/components/ui/Card.tsx` 파일 생성**:

```typescript
/**
 * 카드 컴포넌트
 * 참고: docs/design-guide.md 225-238줄
 */

'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) {
  const baseStyles = 'bg-white rounded-3xl p-6 shadow-md';
  
  const Component = hoverable || onClick ? motion.div : 'div';
  
  const motionProps = hoverable || onClick ? {
    whileHover: { scale: 1.02, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' },
    whileTap: onClick ? { scale: 0.98 } : {},
    transition: { duration: 0.2 },
  } : {};

  return (
    <Component
      className={cn(baseStyles, onClick && 'cursor-pointer', className)}
      onClick={onClick}
      {...(Component === motion.div ? motionProps : {})}
    >
      {children}
    </Component>
  );
}
```

**사용 예시**:
```typescript
<Card hoverable onClick={handleClick}>
  <h3>날씨 카드 내용</h3>
</Card>
```

**체크리스트**:
- [ ] `src/components/ui/Card.tsx` 파일 생성
- [ ] 둥근 모서리 (rounded-3xl) 적용
- [ ] 그림자 효과 (shadow-md) 적용
- [ ] hoverable prop으로 호버 애니메이션 선택 가능
- [ ] onClick 있을 때 커서 변경

---

### ✅ 4.3 Input 컴포넌트

**목표**: 텍스트 입력 필드 컴포넌트 만들기

**참고 문서**:
- `docs/wireframes.md` 1019-1034줄 (입력 필드)
- `docs/design-guide.md` 456-483줄 (타이포그래피 - 본문)

**작업 내용**:

**`src/components/ui/Input.tsx` 파일 생성**:

```typescript
/**
 * Input 컴포넌트
 * 참고: docs/wireframes.md 1019-1034줄
 */

'use client';

import { cn } from '@/lib/utils';

interface InputProps {
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
}

export function Input({
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  className = '',
  min,
  max,
}: InputProps) {
  const baseStyles = 'w-full px-4 py-3 text-base bg-white border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors';
  
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      max={max}
      className={cn(baseStyles, disabled && 'opacity-50 cursor-not-allowed', className)}
    />
  );
}
```

**사용 예시**:
```typescript
<Input
  type="text"
  value={location}
  onChange={setLocation}
  placeholder="서울"
/>
```

**체크리스트**:
- [ ] `src/components/ui/Input.tsx` 파일 생성
- [ ] text/number 타입 지원
- [ ] focus 시 파란색 테두리
- [ ] disabled 상태 처리
- [ ] 아래 테두리만 표시 (디자인 가이드)

---

### ✅ 4.4 Slider 컴포넌트

**목표**: 수량 선택용 슬라이더 컴포넌트 만들기

**참고 문서**:
- `docs/wireframes.md` 1026-1034줄 (슬라이더)
- `docs/architecture.md` 132줄 (Slider 언급)

**작업 내용**:

**`src/components/ui/Slider.tsx` 파일 생성**:

```typescript
/**
 * Slider 컴포넌트
 * 참고: docs/wireframes.md 1026-1034줄
 */

'use client';

import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className = '',
}: SliderProps) {
  return (
    <div className={cn('w-full', className)}>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
          'accent-blue-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      <div className="flex justify-between mt-1 text-sm text-gray-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
```

**사용 예시**:
```typescript
<Slider
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={maxQuantity}
/>
```

**체크리스트**:
- [ ] `src/components/ui/Slider.tsx` 파일 생성
- [ ] range input 사용
- [ ] 파란색 강조 (accent-blue-500)
- [ ] 최소/최대 값 표시
- [ ] disabled 상태 처리

---

### ✅ 4.5 Modal 컴포넌트

**목표**: 팝업 모달 컴포넌트 만들기

**참고 문서**:
- `docs/design-guide.md` 1298-1312줄 (모달 애니메이션)
- `docs/architecture.md` 1067-1186줄 (TradingModal 구조)
- `docs/wireframes.md` 468-537줄 (사고팔기 화면)

**작업 내용**:

**`src/components/ui/Modal.tsx` 파일 생성**:

```typescript
/**
 * Modal 컴포넌트
 * 참고: docs/design-guide.md 1298-1312줄
 */

'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // 배경 스크롤 방지
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 딤 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl p-6 shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* 헤더 */}
            {title && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-3xl text-gray-400 hover:text-gray-600 leading-none"
                >
                  ×
                </button>
              </div>
            )}

            {/* 내용 */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**애니메이션 설명**:
- **배경**: 투명→반투명 (0→0.5 opacity)
- **모달**: 작게→크게 (0.8→1 scale), 아래→위 (y: 20→0)
- **Exit**: 등장의 역순

**사용 예시**:
```typescript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="날씨 사기"
>
  <p>모달 내용</p>
</Modal>
```

**체크리스트**:
- [ ] `src/components/ui/Modal.tsx` 파일 생성
- [ ] AnimatePresence로 등장/퇴장 애니메이션
- [ ] 배경 클릭 시 닫기
- [ ] ESC 키로 닫기
- [ ] 모달 열릴 때 배경 스크롤 방지
- [ ] 최대 높이 90vh, 스크롤 가능

---

## 🎯 Phase 5: 날씨 관련 컴포넌트 (예상 시간: 2-3시간)

### ✅ 5.1 WeatherIcon 컴포넌트

**목표**: 날씨 아이콘을 표시하는 컴포넌트 만들기

**참고 문서**:
- `docs/design-guide.md` 579-686줄 (날씨 캐릭터 디자인)
- `docs/wireframes.md` 443-459줄 (날씨 아이콘 상태)

**작업 내용**:

**`src/components/weather/WeatherIcon.tsx` 파일 생성**:

```typescript
/**
 * WeatherIcon 컴포넌트
 * 참고: docs/design-guide.md 579-686줄
 */

'use client';

import { motion } from 'motion/react';
import type { WeatherType, WeatherTrend } from '@/types';
import { WEATHER_CONFIGS } from '@/constants/config';

interface WeatherIconProps {
  type: WeatherType;
  trend?: WeatherTrend;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function WeatherIcon({
  type,
  trend = 'stable',
  size = 'md',
  animated = true,
}: WeatherIconProps) {
  const config = WEATHER_CONFIGS[type];
  
  // 크기 설정
  const sizes = {
    sm: 'text-2xl w-10 h-10',  // 24px
    md: 'text-4xl w-16 h-16',  // 48px
    lg: 'text-6xl w-24 h-24',  // 60px
  };
  
  // 상태별 링 색상
  const ringColors = {
    rising: 'ring-2 ring-red-500',
    falling: 'ring-2 ring-blue-500',
    stable: 'ring-2 ring-gray-300',
  };
  
  // 애니메이션 설정
  const pulseAnimation = trend !== 'stable' && animated ? {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  } : {};

  return (
    <motion.div
      className={`
        ${sizes[size]}
        ${ringColors[trend]}
        rounded-full
        flex items-center justify-center
        bg-white
        shadow-md
      `}
      animate={pulseAnimation}
    >
      <span className="leading-none">{config.emoji}</span>
    </motion.div>
  );
}
```

**사용 예시**:
```typescript
<WeatherIcon type="solar" trend="rising" size="md" />
```

**체크리스트**:
- [ ] `src/components/weather/WeatherIcon.tsx` 파일 생성
- [ ] 3가지 크기 (sm, md, lg) 지원
- [ ] 상태별 링 색상 (빨강/파랑/회색)
- [ ] 펄스 애니메이션 (rising/falling 시)
- [ ] 둥근 배경 (원형)

---

### ✅ 5.2 TrendIndicator 컴포넌트

**목표**: 가격 변화를 표시하는 컴포넌트 만들기

**참고 문서**:
- `docs/design-guide.md` 145-214줄 (상태 색상)
- `docs/architecture.md` 136줄 (TrendIndicator 언급)

**작업 내용**:

**`src/components/weather/TrendIndicator.tsx` 파일 생성**:

```typescript
/**
 * TrendIndicator 컴포넌트
 * 참고: docs/design-guide.md 145-214줄
 */

'use client';

import { motion } from 'motion/react';
import { formatNumber, formatPercent } from '@/lib/utils';
import type { WeatherTrend } from '@/types';

interface TrendIndicatorProps {
  change: number;           // 변화량 (절대값)
  changePercent: number;    // 변화율 (%)
  trend: WeatherTrend;
}

export function TrendIndicator({
  change,
  changePercent,
  trend,
}: TrendIndicatorProps) {
  // 상태별 설정
  const trendConfig = {
    rising: {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      emoji: '🔥',
      arrow: '↗',
    },
    falling: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      emoji: '❄️',
      arrow: '↘',
    },
    stable: {
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      emoji: '⚪',
      arrow: '→',
    },
  };
  
  const config = trendConfig[trend];
  const sign = change >= 0 ? '+' : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${config.bgColor}`}
    >
      <span>{config.emoji}</span>
      <span className={`${config.color} font-semibold text-sm`}>
        {config.arrow} {sign}{formatNumber(Math.abs(change))} ({formatPercent(changePercent)})
      </span>
    </motion.div>
  );
}
```

**표시 예시**:
- **상승**: 🔥 ↗ +100 (+8.5%)
- **하락**: ❄️ ↘ -50 (-4.2%)
- **안정**: ⚪ → 0 (0.0%)

**체크리스트**:
- [ ] `src/components/weather/TrendIndicator.tsx` 파일 생성
- [ ] 상승/하락/안정 3가지 상태 표시
- [ ] 이모지 + 화살표 + 변화량 + 변화율
- [ ] 색상 배경 (빨강/파랑/회색)
- [ ] 등장 애니메이션

---

### ✅ 5.3 WeatherCard 컴포넌트

**목표**: 홈 화면의 날씨 카드 컴포넌트 만들기

**참고 문서**:
- `docs/architecture.md` 866-935줄 (WeatherCard 설계)
- `docs/wireframes.md` 687-730줄 (보유 날씨 카드)
- `docs/design-guide.md` 1620-1628줄 (카드 호버)

**작업 내용**:

**`src/components/weather/WeatherCard.tsx` 파일 생성**:

```typescript
/**
 * WeatherCard 컴포넌트
 * 참고: docs/architecture.md 866-935줄
 */

'use client';

import { motion } from 'motion/react';
import { WeatherIcon } from './WeatherIcon';
import { TrendIndicator } from './TrendIndicator';
import { formatEnergy } from '@/lib/utils';
import type { WeatherData } from '@/types';
import { TREND_COLORS } from '@/constants/config';

interface WeatherCardProps {
  weather: WeatherData;
  onClick: () => void;
}

export function WeatherCard({ weather, onClick }: WeatherCardProps) {
  const trendConfig = TREND_COLORS[weather.trend];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${trendConfig.bg}
        rounded-3xl p-6
        shadow-md hover:shadow-lg
        transition-shadow duration-200
        cursor-pointer
      `}
    >
      {/* 헤더: 이름 + 상태 이모지 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <WeatherIcon type={weather.type} trend={weather.trend} size="sm" animated={false} />
          <h3 className="text-lg font-semibold">{weather.name}</h3>
        </div>
        <span className="text-2xl">{trendConfig.emoji}</span>
      </div>

      {/* 가격 */}
      <div className="mb-3">
        <p className="text-2xl font-bold">
          {formatEnergy(weather.price)}
        </p>
        <TrendIndicator
          change={weather.change}
          changePercent={weather.changePercent}
          trend={weather.trend}
        />
      </div>

      {/* 미니 스파크라인 (간단한 버전) */}
      <div className="h-8 flex items-end gap-0.5">
        {weather.history.slice(-8).map((h, i) => {
          const maxPrice = Math.max(...weather.history.slice(-8).map(h => h.price));
          const minPrice = Math.min(...weather.history.slice(-8).map(h => h.price));
          const range = maxPrice - minPrice || 1;
          const height = ((h.price - minPrice) / range) * 100;
          
          return (
            <div
              key={i}
              className="flex-1 bg-gray-300 rounded-t"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
```

**카드 구성**:
1. **헤더**: 날씨 아이콘 + 이름 + 상태 이모지
2. **가격**: 큰 숫자 + 변화 표시
3. **미니 그래프**: 최근 8개 가격 점 (막대 그래프)

**체크리스트**:
- [ ] `src/components/weather/WeatherCard.tsx` 파일 생성
- [ ] 상태별 배경색 적용
- [ ] 호버 시 확대 애니메이션
- [ ] 탭 시 축소 애니메이션
- [ ] 미니 스파크라인 표시 (최근 8개)

---

### ✅ 5.4 WeatherChart 컴포넌트

**목표**: 24시간 가격 그래프 컴포넌트 만들기

**참고 문서**:
- `docs/architecture.md` 939-1009줄 (WeatherChart 설계)
- `docs/wireframes.md` 580-614줄 (그래프 상태별)

**작업 내용**:

**`src/components/weather/WeatherChart.tsx` 파일 생성**:

```typescript
/**
 * WeatherChart 컴포넌트
 * 24시간 영역 차트
 * 참고: docs/architecture.md 939-1009줄
 */

'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import type { PriceHistory, WeatherTrend } from '@/types';

interface WeatherChartProps {
  history: PriceHistory[];
  trend: WeatherTrend;
}

export function WeatherChart({ history, trend }: WeatherChartProps) {
  // 상태별 색상
  const colors = {
    rising: { stroke: '#FF6B6B', fill: '#FFE9E9', gradient1: '#FF6B6B', gradient2: '#FFE9E9' },
    falling: { stroke: '#74C0FC', fill: '#E7F5FF', gradient1: '#74C0FC', gradient2: '#E7F5FF' },
    stable: { stroke: '#ADB5BD', fill: '#F1F3F5', gradient1: '#ADB5BD', gradient2: '#F1F3F5' },
  };

  const color = colors[trend];

  // 데이터 포맷 (최근 24개 포인트)
  const data = history.slice(-24).map(h => ({
    time: format(new Date(h.timestamp), 'HH:mm'),
    price: h.price,
  }));

  return (
    <div className="w-full h-64 bg-white rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`color-${trend}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.gradient1} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color.gradient1} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#6C757D' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6C757D' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#2C3E50', fontWeight: 'bold' }}
            itemStyle={{ color: color.stroke }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color.stroke}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#color-${trend})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**그래프 설명**:
- **Area Chart**: 영역이 채워진 라인 차트
- **Gradient**: 위에서 아래로 투명도 변화
- **상태별 색상**: 상승(빨강), 하락(파랑), 안정(회색)
- **최근 24개**: 약 2시간 분량 (3분 × 24 = 72분)

**체크리스트**:
- [ ] `src/components/weather/WeatherChart.tsx` 파일 생성
- [ ] Recharts AreaChart 사용
- [ ] 상태별 그라데이션 색상
- [ ] X축 시간 표시 (HH:mm)
- [ ] Y축 가격 표시
- [ ] Tooltip (호버 시 상세 정보)

---

## 🎯 Phase 6: 페이지 개발 (예상 시간: 3-4시간)

### ✅ 6.1 루트 레이아웃 설정

**목표**: 앱 전체 레이아웃 및 폰트 설정

**참고 문서**:
- `docs/architecture.md` 1277-1307줄 (루트 레이아웃)
- `docs/design-guide.md` 315-350줄 (Pretendard 폰트)

**작업 내용**:

**`src/app/layout.tsx` 파일 수정**:

```typescript
/**
 * 루트 레이아웃
 * 참고: docs/architecture.md 1277-1307줄
 */

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Pretendard 폰트 설정
const pretendard = localFont({
  src: '../../public/fonts/Pretendard-Variable.woff2',
  variable: '--font-pretendard',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '날씨 에너지 - 날씨로 배우는 경제',
  description: '초등학생을 위한 날씨 기반 경제 교육 앱. 4가지 날씨를 사고 팔면서 경제 개념을 배워요!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#FFFCF7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans antialiased bg-[#FFFCF7] min-h-screen">
        {children}
      </body>
    </html>
  );
}
```

**메타데이터 설명**:
- **title**: 브라우저 탭에 표시되는 제목
- **description**: SEO 및 공유 시 설명
- **viewport**: 모바일 최적화
- **themeColor**: 모바일 브라우저 상단바 색상

**체크리스트**:
- [ ] `src/app/layout.tsx` 파일 수정
- [ ] Pretendard 폰트 경로 확인
- [ ] 메타데이터 설정
- [ ] 배경색 #FFFCF7 적용
- [ ] lang="ko" 설정

---

### ✅ 6.2 온보딩 페이지

**목표**: 첫 시작 화면 만들기

**참고 문서**:
- `docs/wireframes.md` 79-105줄 (웰컴 화면)
- `docs/wireframes.md` 107-156줄 (동네 설정)

**작업 내용**:

**`src/app/page.tsx` 파일 수정** (온보딩 페이지):

```typescript
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
          <h1 className="text-4xl font-bold mb-4">🌤️ 날씨 에너지</h1>
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
            <p className="text-sm text-gray-500">(실제 날씨랑은 상관없어요)</p>
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
```

**온보딩 플로우**:
1. **웰컴 화면**: 앱 소개 + 시작 버튼
2. **동네 설정**: 선택 사항 (건너뛰기 가능)
3. **초기 에너지**: 10,000 에너지 받기 + 게임 시작

**체크리스트**:
- [ ] `src/app/page.tsx` 파일 수정
- [ ] 3단계 온보딩 플로우 구현
- [ ] 각 단계별 애니메이션
- [ ] 동네 설정 저장 (localStorage)
- [ ] 홈 화면으로 이동 (/home)

---

### ✅ 6.3 메인 홈 페이지

**목표**: 원형 레이아웃으로 날씨를 표시하는 메인 화면

**참고 문서**:
- `docs/architecture.md` 1310-1408줄 (메인 홈 페이지)
- `docs/wireframes.md` 239-403줄 (메인 홈 화면)

**작업 내용**:

**`src/app/home/page.tsx` 파일 생성**:

```typescript
/**
 * 메인 홈 페이지
 * 참고: docs/architecture.md 1310-1408줄
 */

'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useWeatherPrices } from '@/hooks/useWeatherPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { formatEnergy, formatPercent, getCurrentSeason, getSeasonEmoji } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  const { weatherData, isLoading, lastUpdate } = useWeatherPrices();
  const { totalValue, profitLoss, profitLossPercent } = usePortfolio(weatherData);

  if (isLoading || weatherData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4"
          >
            🌤️
          </motion.div>
          <p className="text-xl text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  const isProfitable = profitLoss >= 0;
  const season = getCurrentSeason();
  const seasonEmoji = getSeasonEmoji();

  return (
    <main className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🌤️ 날씨 에너지</h1>
        <Link href="/settings">
          <button className="text-2xl">⚙️</button>
        </Link>
      </header>

      {/* 원형 레이아웃 */}
      <div className="relative w-full h-96 flex items-center justify-center mb-8">
        {/* 중앙: 총 에너지 표시 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="absolute z-10 text-center"
        >
          <p className="text-4xl font-bold mb-2">
            💎 {formatEnergy(totalValue)}
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
              {isProfitable ? '🟢' : '🔴'} {profitLoss >= 0 ? '+' : ''}{formatEnergy(profitLoss)}
              <span className="text-sm ml-1">
                ({formatPercent(profitLossPercent)})
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* 원형 배치: 4가지 날씨 아이콘 */}
        {weatherData.map((weather, index) => {
          // 12시 방향부터 시계방향으로 90도씩 배치
          const angle = (index * 90 - 90) * (Math.PI / 180);
          const radius = 140;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={weather.type}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <Link href={`/weather/${weather.type}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none"
                >
                  <WeatherIcon
                    type={weather.type}
                    trend={weather.trend}
                    size="lg"
                    animated={true}
                  />
                </motion.button>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 계절 정보 */}
      <section className="px-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <p className="text-center text-gray-700">
            {seasonEmoji} <span className="font-semibold">{new Date().getMonth() + 1}월 {season}</span>
            <span className="mx-2">•</span>
            <span className="text-sm">3분마다 자동 업데이트</span>
          </p>
          <p className="text-center text-sm text-gray-500 mt-1">
            마지막 업데이트: {new Date(lastUpdate).toLocaleTimeString('ko-KR')}
          </p>
        </div>
      </section>

      {/* 내 보관함 버튼 */}
      <section className="px-6">
        <Link href="/portfolio">
          <Button variant="primary" className="w-full">
            내 보관함 보기 →
          </Button>
        </Link>
      </section>
    </main>
  );
}
```

**화면 구성**:
1. **헤더**: 앱 이름 + 설정 버튼
2. **원형 레이아웃**: 
   - 중앙: 총 에너지 + 손익
   - 원 위: 4가지 날씨 아이콘 (90도 간격)
3. **계절 정보**: 현재 월/계절 + 업데이트 시간
4. **내 보관함 버튼**: 포트폴리오로 이동

**체크리스트**:
- [ ] `src/app/home/page.tsx` 파일 생성
- [ ] 원형 레이아웃 구현 (삼각함수)
- [ ] 중앙 에너지 표시
- [ ] 4개 날씨 아이콘 배치
- [ ] 로딩 상태 처리
- [ ] 계절 정보 표시

---

### ✅ 6.4 날씨 상세 페이지

**목표**: 특정 날씨의 상세 정보 및 거래 화면

**참고 문서**:
- `docs/wireframes.md` 468-663줄 (날씨 상세 화면)
- `docs/architecture.md` 1011-1186줄 (TradingModal)

**작업 내용**:

**`src/app/weather/[type]/page.tsx` 파일 생성**:

```typescript
/**
 * 날씨 상세 페이지
 * 참고: docs/wireframes.md 468-663줄
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useWeatherPrices } from '@/hooks/useWeatherPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { WeatherChart } from '@/components/weather/WeatherChart';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { TrendIndicator } from '@/components/weather/TrendIndicator';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { formatEnergy, getCurrentSeason } from '@/lib/utils';
import { WEATHER_CONFIGS, TREND_COLORS } from '@/constants/config';
import type { WeatherType } from '@/types';

export default function WeatherDetailPage({ params }: { params: { type: WeatherType } }) {
  const router = useRouter();
  const { weatherData } = useWeatherPrices();
  const { portfolio, executeTrade, getHolding, getMaxBuyQuantity, getMaxSellQuantity } = usePortfolio(weatherData);
  
  const weather = weatherData.find(w => w.type === params.type);
  const holding = getHolding(params.type);
  
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!weather) {
    return <div className="p-6">날씨 정보를 찾을 수 없습니다.</div>;
  }

  const config = WEATHER_CONFIGS[weather.type];
  const trendConfig = TREND_COLORS[weather.trend];
  const maxBuy = getMaxBuyQuantity(weather.type);
  const maxSell = getMaxSellQuantity(weather.type);
  const maxQuantity = action === 'buy' ? maxBuy : maxSell;

  const totalAmount = quantity * weather.price;
  const remainingEnergy = action === 'buy'
    ? portfolio.energy - totalAmount
    : portfolio.energy + totalAmount;

  const handleTrade = async () => {
    if (maxQuantity === 0) return;
    
    setIsProcessing(true);
    try {
      await executeTrade(action, weather.type, quantity);
      router.push('/home');
    } catch (error) {
      alert(error instanceof Error ? error.message : '거래 실패');
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen pb-6">
      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">{config.name}</h1>
        <div className="w-6" />
      </header>

      {/* 가격 정보 */}
      <section className="px-6 mb-6 text-center">
        <WeatherIcon type={weather.type} trend={weather.trend} size="lg" />
        <p className="text-3xl font-bold mt-4 mb-2">
          {formatEnergy(weather.price)}
        </p>
        <TrendIndicator
          change={weather.change}
          changePercent={weather.changePercent}
          trend={weather.trend}
        />
      </section>

      {/* 24시간 차트 */}
      <section className="px-6 mb-6">
        <WeatherChart history={weather.history} trend={weather.trend} />
        <div className="text-center mt-4">
          <p className="text-2xl mb-2">{trendConfig.emoji}</p>
          <p className="font-semibold">{trendConfig.text}</p>
        </div>
      </section>

      {/* 계절 힌트 */}
      <section className="px-6 mb-6">
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-sm font-semibold mb-1">💡 지금 계절</p>
          <p className="text-sm text-gray-700">
            {getCurrentSeason()} - 이 시기에 {config.name}는 어떻게 변할까요?
          </p>
        </div>
      </section>

      {/* 거래 인터페이스 */}
      <section className="px-6">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          {/* 사기/팔기 탭 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => { setAction('buy'); setQuantity(1); }}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                action === 'buy'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              사기
            </button>
            <button
              onClick={() => { setAction('sell'); setQuantity(1); }}
              disabled={maxSell === 0}
              className={`flex-1 py-3 rounded-xl font-semibold transition ${
                action === 'sell'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              } disabled:opacity-50`}
            >
              팔기 {holding && `(${holding.quantity}개)`}
            </button>
          </div>

          {/* 보유 정보 (팔기 모드) */}
          {action === 'sell' && holding && (
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">가지고 있는 것: {holding.quantity}개</p>
              <p className="text-sm text-gray-600">평균 매수가: {formatEnergy(holding.avgBuyPrice)}</p>
            </div>
          )}

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
              max={Math.max(maxQuantity, 1)}
              disabled={maxQuantity === 0}
            />
            <p className="text-center text-2xl font-bold mt-2">{quantity}개</p>
          </div>

          {/* 예상 결과 */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">총 금액</span>
              <span className="font-semibold">{formatEnergy(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">남은 에너지</span>
              <span className="font-semibold">{formatEnergy(remainingEnergy)}</span>
            </div>
            {action === 'sell' && holding && (
              <div className="flex justify-between">
                <span className="text-sm">예상 손익</span>
                <span className={`font-semibold ${
                  (weather.price - holding.avgBuyPrice) > 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {formatEnergy((weather.price - holding.avgBuyPrice) * quantity)}
                </span>
              </div>
            )}
          </div>

          {/* 확인 버튼 */}
          <Button
            onClick={handleTrade}
            disabled={maxQuantity === 0 || isProcessing}
            variant={action === 'buy' ? 'primary' : 'danger'}
            className="w-full"
          >
            {isProcessing ? '처리 중...' : 
             action === 'buy' ? '확인! 사기 →' : '확인! 팔기 →'}
          </Button>
        </div>
      </section>
    </main>
  );
}
```

**페이지 구성**:
1. **헤더**: 뒤로 가기 + 날씨 이름
2. **가격 정보**: 아이콘 + 가격 + 변화 표시
3. **24시간 차트**: 영역 그래프
4. **계절 힌트**: 현재 계절 정보
5. **거래 인터페이스**: 사기/팔기 탭 + 수량 선택 + 확인

**체크리스트**:
- [ ] `src/app/weather/[type]/page.tsx` 파일 생성
- [ ] 동적 라우팅 [type] 처리
- [ ] WeatherChart 연동
- [ ] 사기/팔기 탭 전환
- [ ] 수량 슬라이더
- [ ] 거래 실행 및 에러 처리
- [ ] 거래 후 홈으로 이동

---

### ✅ 6.5 내 보관함 페이지

**목표**: 포트폴리오 및 거래 내역을 보는 화면

**참고 문서**:
- `docs/wireframes.md` 669-831줄 (내 보관함 화면)
- `docs/architecture.md` 139-141줄 (포트폴리오 컴포넌트)

**작업 내용**:

**`src/app/portfolio/page.tsx` 파일 생성**:

```typescript
/**
 * 내 보관함 페이지
 * 참고: docs/wireframes.md 669-831줄
 */

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useWeatherPrices } from '@/hooks/useWeatherPrices';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import { formatEnergy, formatPercent, formatTimeAgo } from '@/lib/utils';
import { WEATHER_CONFIGS } from '@/constants/config';

export default function PortfolioPage() {
  const router = useRouter();
  const { weatherData } = useWeatherPrices();
  const { portfolio, totalValue, profitLoss, profitLossPercent } = usePortfolio(weatherData);

  const isProfitable = profitLoss >= 0;
  const hasHoldings = portfolio.holdings.length > 0;

  return (
    <main className="min-h-screen pb-6">
      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">내 보관함</h1>
        <Link href="/settings">
          <button className="text-2xl">⚙️</button>
        </Link>
      </header>

      {/* 총 자산 요약 */}
      <section className="px-6 mb-6">
        <Card>
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">내가 가진 전부</p>
            <p className="text-4xl font-bold mb-2">
              {formatEnergy(totalValue)}
            </p>
            <div className="h-px bg-gray-200 my-4" />
            <p className="text-sm text-gray-600 mb-1">얼마나 벌었는지</p>
            <motion.p
              animate={isProfitable ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`text-2xl font-bold ${
                isProfitable ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isProfitable ? '🟢' : '🔴'} {profitLoss >= 0 ? '+' : ''}{formatEnergy(profitLoss)}
              <span className="text-lg ml-2">
                ({formatPercent(profitLossPercent)})
              </span>
            </motion.p>
            <p className="text-sm text-gray-600 mt-2">
              {isProfitable ? '잘했어요! 🎉' : '조금 손해 봤어요 😔'}
            </p>
          </div>
        </Card>
      </section>

      {/* 가지고 있는 날씨 */}
      <section className="px-6 mb-6">
        <h2 className="text-xl font-bold mb-4">가지고 있는 날씨</h2>
        
        {hasHoldings ? (
          <div className="space-y-4">
            {portfolio.holdings.map((holding) => {
              const config = WEATHER_CONFIGS[holding.type];
              const weather = weatherData.find(w => w.type === holding.type);
              const isProfit = holding.profitLoss >= 0;

              return (
                <Card key={holding.type} hoverable>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <WeatherIcon type={holding.type} trend={weather?.trend || 'stable'} size="sm" />
                      <div>
                        <h3 className="font-semibold">{config.name} {holding.quantity}개</h3>
                        <p className="text-sm text-gray-600">
                          샀을 때: {formatEnergy(holding.avgBuyPrice)}
                        </p>
                        <p className="text-sm text-gray-600">
                          지금: {formatEnergy(holding.currentPrice)}
                        </p>
                      </div>
                    </div>
                    {weather && (
                      <span className="text-2xl">
                        {weather.trend === 'rising' ? '🔥' : weather.trend === 'falling' ? '❄️' : '⚪'}
                      </span>
                    )}
                  </div>

                  <div className={`mb-3 p-2 rounded-lg ${
                    isProfit ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      isProfit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isProfit ? '🟢' : '🔴'} 번 돈: {formatEnergy(holding.profitLoss)} ({formatPercent(holding.profitLossPercent)})
                    </p>
                  </div>

                  <Link href={`/weather/${holding.type}`}>
                    <Button variant="secondary" className="w-full">
                      팔기
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <p className="text-center text-gray-600 py-8">
              아직 날씨를 사지 않았어요<br />
              홈에서 날씨를 사보세요!
            </p>
            <Link href="/home">
              <Button variant="primary" className="w-full mt-4">
                홈으로 가기
              </Button>
            </Link>
          </Card>
        )}
      </section>

      {/* 사고 판 기록 */}
      {portfolio.transactions.length > 0 && (
        <section className="px-6 mb-6">
          <h2 className="text-xl font-bold mb-4">사고 판 기록</h2>
          <div className="space-y-3">
            {portfolio.transactions.slice(0, 10).map((tx) => {
              const config = WEATHER_CONFIGS[tx.type];
              const isBuy = tx.action === 'buy';

              return (
                <Card key={tx.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{config.emoji}</span>
                      <div>
                        <p className="font-semibold">
                          {config.name} {tx.quantity}개 {isBuy ? '샀어요' : '팔았어요'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatEnergy(tx.totalAmount)}
                          {!isBuy && tx.profitLoss !== undefined && (
                            <span className={`ml-2 ${tx.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {tx.profitLoss >= 0 ? '🟢' : '🔴'} {formatEnergy(tx.profitLoss)}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(tx.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
```

**페이지 구성**:
1. **헤더**: 뒤로 가기 + 제목 + 설정
2. **총 자산 요약**: 총 가치 + 손익
3. **가지고 있는 날씨**: 각 날씨별 카드
4. **사고 판 기록**: 최근 10개 거래 내역

**체크리스트**:
- [ ] `src/app/portfolio/page.tsx` 파일 생성
- [ ] 총 자산 표시
- [ ] 보유 날씨 목록 (개별 손익 표시)
- [ ] 거래 내역 (최근 10개)
- [ ] 비어있을 때 안내 메시지
- [ ] 팔기 버튼 → 날씨 상세로 이동

---

### ✅ 6.6 설정 페이지

**목표**: 동네 설정 및 앱 정보를 보는 화면

**참고 문서**:
- `docs/wireframes.md` 869-949줄 (동네 설정 화면)

**작업 내용**:

**`src/app/settings/page.tsx` 파일 생성**:

```typescript
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
```

**페이지 구성**:
1. **동네 설정**: 동네 이름 입력 및 저장
2. **앱 정보**: 버전, 설명, 업데이트 주기
3. **데이터 관리**: 전체 초기화 (리셋) 버튼

**체크리스트**:
- [ ] `src/app/settings/page.tsx` 파일 생성
- [ ] 동네 설정 불러오기/저장
- [ ] 앱 정보 표시
- [ ] 전체 초기화 기능 (확인 대화상자)
- [ ] 초기화 후 첫 화면으로 이동

---

## 🎯 Phase 7: 테스트 및 최적화 (예상 시간: 1-2시간)

### ✅ 7.1 기능 테스트

**목표**: 모든 주요 기능이 정상 작동하는지 확인

**참고 문서**:
- `docs/architecture.md` 1771-1791줄 (체크리스트)

**테스트 항목**:

**1. 온보딩 플로우**
- [ ] 웰컴 화면 → 동네 설정 → 초기 에너지 → 홈 화면
- [ ] 동네 설정 건너뛰기 가능
- [ ] 10,000 에너지로 시작

**2. 날씨 가격 시스템**
- [ ] 첫 로드 시 4가지 날씨 가격 생성
- [ ] 3분 후 자동 업데이트 확인
- [ ] 계절/시간에 맞는 가격 범위 (7월 낮 태양은 높음 등)
- [ ] 상승/하락/안정 상태 정확히 표시

**3. 거래 기능**
- [ ] 날씨 사기 성공
- [ ] 에너지 부족 시 에러 메시지
- [ ] 평균 매수가 정확히 계산
- [ ] 날씨 팔기 성공
- [ ] 보유 수량 부족 시 에러 메시지
- [ ] 거래 내역에 기록

**4. 포트폴리오**
- [ ] 총 자산 계산 정확
- [ ] 손익 계산 정확
- [ ] 보유 날씨 목록 표시
- [ ] 가격 변동 시 실시간 업데이트

**5. 로컬스토리지**
- [ ] 거래 후 자동 저장
- [ ] 페이지 새로고침 해도 데이터 유지
- [ ] 설정 저장 및 불러오기
- [ ] 전체 초기화 작동

**6. UI/UX**
- [ ] 버튼 탭 시 애니메이션
- [ ] 카드 호버 효과
- [ ] 모달 등장/퇴장 애니메이션
- [ ] 3분 업데이트 시 숫자 변화 부드럽게

**테스트 방법**:
1. **개발 서버 실행**: `npm run dev`
2. **브라우저**: http://localhost:3000 접속
3. **각 항목 수동 테스트**
4. **콘솔 에러 확인**: F12 개발자 도구

---

### ✅ 7.2 TypeScript 타입 체크

**목표**: 타입 오류 없는지 확인

**작업 내용**:

터미널에서 다음 명령어 실행:
```bash
npx tsc --noEmit
```

**오류 해결**:
- 빨간 밑줄 있는 코드 찾기
- 타입 정의 추가 또는 수정
- 다시 체크

**체크리스트**:
- [ ] `npx tsc --noEmit` 오류 0개
- [ ] VS Code에서 빨간 밑줄 없음
- [ ] 모든 import 경로 정확

---

### ✅ 7.3 성능 최적화

**목표**: 앱이 빠르고 부드럽게 작동하도록 최적화

**참고 문서**:
- `docs/architecture.md` 1476-1555줄 (성능 최적화)
- `.cursorrules` 496-537줄 (최적화 가이드)

**최적화 작업**:

**1. React.memo 적용 (필요시)**
```typescript
// 자주 리렌더링되지만 props가 안 바뀌는 컴포넌트
export const WeatherCard = React.memo(function WeatherCard({ weather, onClick }: WeatherCardProps) {
  // ...
});
```

**2. useMemo/useCallback 확인**
- 이미 작성된 코드에 있는지 확인
- 불필요한 연산 방지

**3. 이미지 최적화**
- 이미지 사용 시 Next.js Image 컴포넌트 사용
- (현재 프로젝트는 이모지만 사용하므로 해당 없음)

**4. 번들 크기 확인**
```bash
npm run build
```
- `.next` 폴더 크기 확인
- 너무 크면 (>2MB) 동적 import 고려

**체크리스트**:
- [ ] 빌드 성공 (`npm run build`)
- [ ] 빌드 경고 없음
- [ ] 개발 서버에서 60fps 부드러움
- [ ] 3분 업데이트 시 버벅임 없음

---

### ✅ 7.4 모바일 반응형 테스트

**목표**: 다양한 화면 크기에서 잘 보이는지 확인

**참고 문서**:
- `docs/wireframes.md` 1113-1124줄 (반응형 고려사항)

**테스트 방법**:

1. **크롬 개발자 도구** (F12)
2. **Device Toolbar** 클릭 (핸드폰 아이콘)
3. **다양한 기기 테스트**:
   - iPhone SE (작은 화면)
   - iPhone 14 Pro (중간)
   - iPhone 14 Pro Max (큰 화면)

**확인 사항**:
- [ ] 모든 텍스트가 잘 보임
- [ ] 버튼이 너무 작지 않음 (최소 44x44px)
- [ ] 스크롤 필요 시 잘 작동
- [ ] 원형 레이아웃이 화면에 맞음
- [ ] 모달이 화면을 넘어가지 않음

---

## 🎯 Phase 8: 배포 (예상 시간: 30분-1시간)

### ✅ 8.1 Vercel 계정 생성 및 설정

**목표**: Vercel에 가입하고 배포 준비하기

**참고 문서**:
- `docs/architecture.md` 1632-1683줄 (배포 전략)
- 웹 리서치 결과: Vercel 배포 가이드 2026

**작업 내용**:

1. **Vercel 계정 생성**
   - 웹사이트: https://vercel.com
   - "Sign Up" 클릭
   - GitHub 계정으로 로그인 (추천)
   - 무료 플랜 선택

2. **GitHub 저장소 확인**
   - 이미 Phase 1.6에서 생성했는지 확인
   - 없으면 새로 생성:
     - GitHub에서 New Repository
     - 이름: `weather-energy-app`
     - Public/Private 선택
     - Create repository

3. **최신 코드 푸시**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

**체크리스트**:
- [ ] Vercel 계정 생성
- [ ] GitHub 저장소 생성
- [ ] 모든 코드 푸시 완료

---

### ✅ 8.2 Vercel 배포

**목표**: 앱을 인터넷에 배포하기

**참고 문서**:
- `docs/architecture.md` 1661-1668줄 (Vercel 연결)

**작업 내용**:

1. **Vercel 대시보드**
   - Vercel 로그인: https://vercel.com/dashboard
   - "New Project" 클릭

2. **GitHub 저장소 연결**
   - "Import Git Repository" 선택
   - `weather-energy-app` 저장소 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - Project Name: `weather-energy-app`
   - Framework Preset: **Next.js** (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (기본값)
   - Output Directory: `.next` (기본값)
   - "Deploy" 클릭!

4. **배포 완료 대기**
   - 약 2-3분 소요
   - 빌드 로그 확인
   - 성공 시 URL 생성됨 (예: https://weather-energy-app.vercel.app)

5. **배포된 앱 테스트**
   - 생성된 URL 클릭
   - 모든 기능 다시 테스트
   - 모바일에서도 접속 테스트

**체크리스트**:
- [ ] Vercel 프로젝트 생성
- [ ] GitHub 저장소 연결
- [ ] 배포 성공
- [ ] 배포된 URL 접속 확인
- [ ] 모든 기능 정상 작동

---

### ✅ 8.3 커스텀 도메인 설정 (선택 사항)

**목표**: 자신만의 도메인 주소 사용하기

**참고 문서**:
- `docs/architecture.md` 1666-1668줄

**작업 내용** (선택 사항):

1. **도메인 구매** (연간 약 1-2만원)
   - 추천: Namecheap, GoDaddy, Cloudflare
   - 예: `weather-energy.com`

2. **Vercel에 도메인 추가**
   - Vercel 프로젝트 → Settings → Domains
   - 구매한 도메인 입력
   - DNS 설정 지시사항 따라하기

3. **DNS 설정**
   - 도메인 제공업체 사이트에서 설정
   - A 레코드 또는 CNAME 레코드 추가
   - 10분-1시간 후 적용

**체크리스트** (선택 사항):
- [ ] 도메인 구매
- [ ] Vercel에 도메인 추가
- [ ] DNS 설정 완료
- [ ] 커스텀 도메인으로 접속 확인

---

### ✅ 8.4 자동 배포 설정

**목표**: 코드 변경 시 자동으로 재배포되도록 설정

**참고 문서**:
- 웹 리서치 결과: Vercel 자동 배포

**작업 내용**:

**이미 자동으로 설정되어 있음!**

Vercel은 GitHub와 연결하면 자동으로:
1. **main 브랜치에 푸시** → 자동 재배포
2. **Pull Request 생성** → 미리보기 배포

**테스트**:
1. 코드 수정 (예: 색상 변경)
2. Git 커밋 & 푸시
   ```bash
   git add .
   git commit -m "Update color"
   git push origin main
   ```
3. Vercel 대시보드에서 배포 진행 확인
4. 2-3분 후 자동으로 업데이트됨

**체크리스트**:
- [ ] 자동 배포 작동 확인
- [ ] 코드 변경 → 푸시 → 자동 재배포 테스트

---

## 🎉 완료!

**축하합니다! 날씨 에너지 앱 개발이 완료되었습니다!**

---

## 📊 최종 체크리스트

### Phase 1: 프로젝트 초기 설정 ✅
- [ ] 1.1 개발 환경 준비
- [ ] 1.2 Next.js 프로젝트 생성
- [ ] 1.3 필수 라이브러리 설치
- [ ] 1.4 프로젝트 폴더 구조 생성
- [ ] 1.5 Tailwind CSS v4 설정
- [ ] 1.6 Git 초기화 및 첫 커밋

### Phase 2: 데이터 구조 및 비즈니스 로직 ✅
- [ ] 2.1 TypeScript 타입 정의
- [ ] 2.2 상수 정의 - 날씨 패턴
- [ ] 2.3 상수 정의 - 날씨 설정 및 색상
- [ ] 2.4 날씨 시뮬레이션 로직
- [ ] 2.5 가격 계산 및 거래 로직
- [ ] 2.6 로컬스토리지 관리
- [ ] 2.7 유틸리티 함수

### Phase 3: 커스텀 훅 개발 ✅
- [ ] 3.1 날씨 가격 관리 훅
- [ ] 3.2 포트폴리오 관리 훅
- [ ] 3.3 로컬스토리지 훅
- [ ] 3.4 인터벌 훅

### Phase 4: 기본 UI 컴포넌트 ✅
- [ ] 4.1 Button 컴포넌트
- [ ] 4.2 Card 컴포넌트
- [ ] 4.3 Input 컴포넌트
- [ ] 4.4 Slider 컴포넌트
- [ ] 4.5 Modal 컴포넌트

### Phase 5: 날씨 관련 컴포넌트 ✅
- [ ] 5.1 WeatherIcon 컴포넌트
- [ ] 5.2 TrendIndicator 컴포넌트
- [ ] 5.3 WeatherCard 컴포넌트
- [ ] 5.4 WeatherChart 컴포넌트

### Phase 6: 페이지 개발 ✅
- [ ] 6.1 루트 레이아웃 설정
- [ ] 6.2 온보딩 페이지
- [ ] 6.3 메인 홈 페이지
- [ ] 6.4 날씨 상세 페이지
- [ ] 6.5 내 보관함 페이지
- [ ] 6.6 설정 페이지

### Phase 7: 테스트 및 최적화 ✅
- [ ] 7.1 기능 테스트
- [ ] 7.2 TypeScript 타입 체크
- [ ] 7.3 성능 최적화
- [ ] 7.4 모바일 반응형 테스트

### Phase 8: 배포 ✅
- [ ] 8.1 Vercel 계정 생성 및 설정
- [ ] 8.2 Vercel 배포
- [ ] 8.3 커스텀 도메인 설정 (선택)
- [ ] 8.4 자동 배포 설정

---

## 🚀 다음 단계 (선택 사항)

앱이 완성되었다면, 다음과 같은 추가 기능을 고려해볼 수 있습니다:

1. **계절 특별 날씨** (황사, 태풍, 단풍, 눈)
   - 참고: `docs/plan.md` 79-104줄

2. **알림 기능**
   - 가격 급등/급락 시 알림
   - Web Push API 사용

3. **소리 효과**
   - 거래 성공 시 효과음
   - 배경 음악 (선택)

4. **리더보드**
   - 친구들과 수익률 비교
   - Firebase 또는 Supabase 사용

5. **튜토리얼 강화**
   - 첫 거래 가이드
   - 단계별 힌트

---

## 📝 개발 팁

**코드 작성 시**:
- 한 번에 하나의 Phase씩 진행
- 각 단계 완료 후 Git 커밋
- 에러 발생 시 콘솔 확인 (F12)
- TypeScript 오류는 바로 해결

**막힐 때**:
- 참고 문서 다시 읽기
- 콘솔 에러 메시지 구글 검색
- VS Code에서 Ctrl+Space (자동완성)
- Next.js 공식 문서 참고

**테스트 시**:
- 자주 저장하고 브라우저 새로고침
- 개발자 도구 콘솔 항상 열어두기
- 모바일 화면도 확인

---

## 🎓 배운 것들

이 프로젝트를 완성하면 다음을 배울 수 있습니다:

- ✅ **Next.js 15**: 최신 React 프레임워크
- ✅ **TypeScript**: 타입 안정성
- ✅ **Tailwind CSS v4**: 빠른 스타일링
- ✅ **Motion**: 부드러운 애니메이션
- ✅ **Recharts**: 데이터 시각화
- ✅ **상태 관리**: React Hooks
- ✅ **로컬스토리지**: 데이터 저장
- ✅ **Vercel 배포**: 실제 서비스 론칭

---

**총 예상 개발 시간**: 14-18시간 (1-2일)

**문서 작성 완료일**: 2026년 1월 22일
