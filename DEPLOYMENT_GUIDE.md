# 날씨 에너지 앱 - 배포 가이드

## Phase 8: Vercel 배포

---

## 📋 사전 준비사항

### 완료 확인

- [x] Phase 1-6 개발 완료
- [x] Phase 7 테스트 완료
- [x] TypeScript 오류 0개
- [x] Production 빌드 성공
- [x] Git 커밋 완료

### 필요한 계정

1. **GitHub 계정** (코드 저장소)
2. **Vercel 계정** (무료 배포)

---

## 🚀 Phase 8.1: Vercel 계정 생성 및 설정

### 1. Vercel 계정 만들기

**웹사이트**: https://vercel.com

1. 우측 상단 **"Sign Up"** 클릭
2. **"Continue with GitHub"** 선택 (권장)
3. GitHub 계정으로 로그인
4. Vercel 권한 승인
5. **Hobby (무료)** 플랜 선택
6. 이름 입력 완료

**완료**: Vercel 대시보드 접속됨

---

### 2. GitHub 저장소 확인

#### 2-1. 저장소 존재 확인

현재 로컬 Git 저장소는 이미 초기화되어 있습니다:

```bash
git remote -v
```

**원격 저장소가 없으면** GitHub에 새로 생성:

#### 2-2. GitHub에서 새 저장소 생성

1. https://github.com 접속
2. 우측 상단 **"+"** → **"New repository"**
3. 정보 입력:
   - Repository name: `weather-energy-app`
   - Description: `초등학생을 위한 날씨 기반 경제 교육 앱`
   - Public 또는 Private 선택
   - **Initialize this repository** 체크 해제 (이미 로컬에 있음)
4. **"Create repository"** 클릭

#### 2-3. 로컬 저장소와 연결

GitHub에서 제공하는 명령어 실행:

```bash
git remote add origin https://github.com/YOUR_USERNAME/weather-energy-app.git
git branch -M main
git push -u origin main
```

**YOUR_USERNAME**을 본인 GitHub 사용자명으로 변경

---

### 3. 최신 코드 푸시

모든 변경사항이 커밋되었는지 확인:

```bash
git status
```

**변경사항이 있으면**:

```bash
git add .
git commit -m "Ready for deployment: Complete Phase 1-7"
git push origin main
```

**확인**: GitHub 저장소에서 모든 파일 확인

---

## 🌐 Phase 8.2: Vercel 배포

### 1. Vercel 프로젝트 생성

1. **Vercel 대시보드**: https://vercel.com/dashboard
2. **"Add New..."** → **"Project"** 클릭
3. **"Import Git Repository"** 섹션 찾기

### 2. GitHub 저장소 연결

1. **GitHub 계정 연결**
   - "Connect Git Provider" 클릭 (처음만)
   - GitHub 권한 승인

2. **저장소 선택**
   - `weather-energy-app` 저장소 찾기
   - **"Import"** 클릭

### 3. 프로젝트 설정

**Configure Project** 화면에서:

| 설정 항목 | 값 | 설명 |
|-----------|-----|------|
| **Project Name** | `weather-energy-app` | URL에 사용됨 |
| **Framework Preset** | Next.js | 자동 감지됨 ✅ |
| **Root Directory** | `./` | 기본값 유지 |
| **Build Command** | `npm run build` | 자동 설정 |
| **Output Directory** | `.next` | 자동 설정 |
| **Install Command** | `npm install` | 자동 설정 |

**Environment Variables**: 없음 (현재 프로젝트는 환경 변수 불필요)

### 4. 배포 시작

1. 설정 확인 완료
2. **"Deploy"** 버튼 클릭! 🚀
3. 배포 진행 상황 실시간 확인

**배포 시간**: 약 2-3분

### 5. 배포 로그 확인

**Building** 단계:
```
- Installing dependencies...
- Running "npm run build"
- Compiled successfully
- Collecting page data
- Generating static pages
- Finalizing page optimization
```

**Deploying** 단계:
```
- Uploading build outputs
- Creating deployment
```

**Success!** ✅

### 6. 배포 완료

**배포 URL 생성됨**:
```
https://weather-energy-app.vercel.app
```

또는 자동 생성된 URL:
```
https://weather-energy-app-[random-id].vercel.app
```

---

## ✅ Phase 8.3: 배포 확인 및 테스트

### 1. 배포된 앱 접속

1. Vercel 대시보드에서 **"Visit"** 버튼 클릭
2. 또는 URL 직접 입력
3. 새 탭에서 앱 열림

### 2. 프로덕션 환경 테스트

**온보딩**:
- [ ] 웰컴 화면 표시
- [ ] 동네 설정 가능
- [ ] 초기 에너지 10,000 시작

**메인 기능**:
- [ ] 4가지 날씨 아이콘 표시
- [ ] 가격 정상 표시
- [ ] 날씨 클릭 시 상세 페이지 이동

**거래**:
- [ ] 날씨 사기 성공
- [ ] 에너지 차감 확인
- [ ] 포트폴리오 업데이트

**데이터 저장**:
- [ ] 새로고침 후 데이터 유지
- [ ] localStorage 정상 작동

### 3. 모바일 테스트

**실제 모바일 기기에서 접속**:
- [ ] URL을 휴대폰으로 전송
- [ ] Safari/Chrome에서 접속
- [ ] 터치 인터랙션 확인
- [ ] 반응형 레이아웃 확인

---

## 🔧 Phase 8.4: 자동 배포 설정

### 이미 자동으로 설정됨! ✅

Vercel은 GitHub 저장소와 연결되면 자동으로:

**1. Main 브랜치 푸시 시 자동 재배포**
```bash
git add .
git commit -m "Update feature"
git push origin main
```

→ Vercel이 자동으로 감지하고 재배포 시작

**2. Pull Request 시 미리보기 배포**
```bash
git checkout -b feature-branch
# 작업...
git push origin feature-branch
# GitHub에서 PR 생성
```

→ Vercel이 PR용 미리보기 URL 자동 생성

### 배포 히스토리 확인

Vercel 대시보드 → 프로젝트 선택 → **"Deployments"** 탭

- 모든 배포 기록 확인
- 각 배포의 로그 확인
- 이전 버전으로 롤백 가능

---

## 🌍 (선택) Phase 8.5: 커스텀 도메인 설정

### 도메인이 있다면

**예**: `weather-energy.com` 구매 후

1. Vercel 프로젝트 → **"Settings"** → **"Domains"**
2. 도메인 입력 → **"Add"**
3. DNS 설정 지시사항 따라하기
4. 10분~1시간 후 적용

### 무료 도메인 유지

Vercel의 무료 도메인으로도 충분합니다:
```
https://weather-energy-app.vercel.app
```

---

## 📊 배포 정보 요약

| 항목 | 정보 |
|------|------|
| **플랫폼** | Vercel |
| **비용** | 무료 (Hobby 플랜) |
| **배포 URL** | `https://weather-energy-app.vercel.app` |
| **빌드 시간** | ~2-3분 |
| **자동 배포** | ✅ main 브랜치 푸시 시 |
| **HTTPS** | ✅ 자동 적용 |
| **CDN** | ✅ 전 세계 배포 |

---

## 🎉 배포 완료!

축하합니다! 날씨 에너지 앱이 인터넷에 배포되었습니다!

### 다음 단계

1. **URL 공유**
   - 친구, 가족에게 공유
   - SNS에 공유 (선택)

2. **모니터링**
   - Vercel Analytics (무료)
   - 사용자 접속 확인

3. **업데이트**
   - 코드 수정 → git push
   - 자동으로 재배포됨

---

## 🐛 문제 해결

### 배포 실패 시

**원인 1**: 빌드 오류
- 로컬에서 `npm run build` 재확인
- 에러 로그 확인 후 수정

**원인 2**: Node.js 버전
- Vercel 설정에서 Node.js 버전 명시
- `package.json`에 engines 추가:
```json
"engines": {
  "node": ">=18.0.0"
}
```

**원인 3**: 환경 변수
- 현재 프로젝트는 해당 없음

### localStorage 문제

**프로덕션에서 localStorage 사용 가능**:
- 브라우저에서 정상 작동
- 각 사용자별 독립 저장

---

## 📝 배포 체크리스트

### 배포 전
- [x] 로컬 빌드 성공
- [x] TypeScript 오류 없음
- [x] 테스트 완료
- [x] Git 커밋 완료

### Vercel 설정
- [ ] Vercel 계정 생성
- [ ] GitHub 저장소 연결
- [ ] 프로젝트 Import
- [ ] 배포 성공

### 배포 후
- [ ] URL 접속 확인
- [ ] 모든 기능 테스트
- [ ] 모바일 테스트
- [ ] 데이터 저장 확인

---

## 🎓 배운 것

- ✅ **Git**: 버전 관리 및 원격 저장소
- ✅ **GitHub**: 코드 호스팅
- ✅ **Vercel**: 원클릭 배포
- ✅ **CI/CD**: 자동 배포 파이프라인
- ✅ **Production Build**: 최적화된 빌드

---

## 🚀 다음 단계 (선택)

1. **성능 모니터링**
   - Vercel Analytics 활성화
   - Core Web Vitals 확인

2. **SEO 최적화**
   - Open Graph 태그 추가
   - sitemap.xml 생성

3. **PWA 변환**
   - 오프라인 지원
   - 홈 화면에 추가

4. **기능 추가**
   - 계절 특별 날씨
   - 알림 기능
   - 리더보드

---

**배포 완료일**: 2026년 1월 22일

**프로젝트 완료**: 🎉 100%
