# philolab

철학으로 나를 실험하다 — 철학 진단 시리즈 사이트의 첫 콘텐츠 **"당신을 이루는 두 철학자"** MVP입니다.

## 시작하기

### 1. Node.js 설치 (한 번만)

[nodejs.org](https://nodejs.org/) 에서 LTS 버전을 다운로드해 설치합니다. 설치 후 터미널에서 확인:

```bash
node -v   # v20.x.x 같은 버전이 나오면 OK
npm -v
```

### 2. 의존성 설치

이 폴더(`philolab`) 안에서 터미널을 열고:

```bash
npm install
```

처음에는 1~3분 정도 걸립니다.

### 3. 로컬에서 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하면 사이트가 보입니다.

### 4. 배포 (Vercel)

1. [vercel.com](https://vercel.com) 계정 만들기 (GitHub 계정으로 가입 가능)
2. 이 폴더를 GitHub 리포지토리에 올리기
3. Vercel에서 "Import Project" → GitHub 리포지토리 선택
4. 자동 배포됨 (수 분 내)

## 폴더 구조

```
philolab/
├── app/                          Next.js App Router
│   ├── layout.tsx               전역 레이아웃 + 메타데이터
│   ├── globals.css              전역 스타일 + 폰트 + 노이즈 텍스처
│   ├── page.tsx                 메인 페이지 (카드 그리드)
│   ├── about/page.tsx           about 페이지
│   └── two-philosophers/
│       ├── page.tsx             진단 인트로
│       ├── quiz/page.tsx        12문항 퀴즈
│       └── result/
│           ├── page.tsx         결과 페이지 (Suspense 래퍼)
│           └── ResultClient.tsx 결과 페이지 클라이언트 컴포넌트
├── components/
│   ├── Header.tsx               상단 헤더
│   └── Footer.tsx               하단 푸터
├── lib/
│   ├── questions.ts             12문항 + 점수 계산 로직
│   └── results.ts               16개 결과 콘텐츠 데이터
├── tailwind.config.ts           컬러/폰트 토큰
├── package.json
└── CLAUDE.md                    프로젝트 명세 (Claude Code용)
```

## 콘텐츠 수정하기

- **문항 수정**: `lib/questions.ts`
- **결과 페이지 텍스트 수정**: `lib/results.ts`
- **컬러/폰트 변경**: `tailwind.config.ts` 의 `colors`, `fontFamily`
- **헤더/푸터 수정**: `components/Header.tsx`, `components/Footer.tsx`

## 컬러 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `background` | `#0F0F12` | 배경 |
| `surface` | `#1A1A1F` | 카드 배경 |
| `elevated` | `#15151A` | 강조 카드 / 인용구 배경 |
| `foreground` | `#E8E6E1` | 본문 텍스트 |
| `accent` | `#F5E6C8` | 금색 강조 (버튼/링크) |
| `muted` | `#8A8784` | 보조 텍스트 |
| `border` | `#2A2A30` | 구분선 |

## 핵심 원칙

1. **백엔드 없음**: 모든 로직이 클라이언트에서. LLM API 호출 없음.
2. **데이터 저장 없음**: 사용자 답변/결과를 서버에 저장하지 않음.
3. **결과 URL로 공유**: `?code=ACEG` 식으로 결과 코드만 URL에 인코딩.
4. **모바일 우선**: max-width 640px 기준 디자인.
5. **시적 톤 유지**: 16개 결과 콘텐츠는 인문학적 깊이가 핵심.

## 라이선스

개인 프로젝트. 콘텐츠 무단 복제 금지.
