# 폴더 구조

## 프로젝트 구조

```
blog/
├── app/                    # Next.js App Router 페이지
│   ├── about/             # About 페이지
│   ├── archives/           # 아카이브 페이지
│   ├── categories/         # 카테고리 페이지
│   ├── posts/              # 포스트 상세 페이지
│   ├── tags/               # 태그 페이지
│   ├── globals.css         # 전역 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈 페이지
│   └── not-found.tsx       # 404 페이지
│
├── assets/                 # 정적 에셋 (이미지 등)
│   └── avatar.png          # 프로필 이미지
│
├── components/             # React 컴포넌트
│   ├── ClientLayout.tsx    # 클라이언트 레이아웃 래퍼
│   ├── PostCard.tsx        # 포스트 카드 컴포넌트
│   ├── Sidebar.tsx         # 사이드바 컴포넌트
│   └── ThemeProvider.tsx   # 테마 프로바이더
│
├── content/                 # 콘텐츠 파일 (마크다운)
│   └── posts/              # 블로그 포스트
│       └── example-post.md
│
├── lib/                    # 유틸리티 함수
│   └── posts.ts            # 포스트 관련 함수
│
├── public/                 # Next.js 정적 파일 (자동 서빙)
│                           # favicon, robots.txt 등
│
├── types/                  # TypeScript 타입 정의
│   └── images.d.ts         # 이미지 파일 타입
│
├── .gitignore              # Git 무시 파일
├── eslint.config.mjs       # ESLint 설정
├── next.config.js          # Next.js 설정
├── package.json            # 프로젝트 의존성
├── postcss.config.js       # PostCSS 설정
├── tailwind.config.ts      # Tailwind CSS 설정
├── tsconfig.json           # TypeScript 설정
└── README.md               # 프로젝트 문서
```

## 폴더별 설명

### `/app`
Next.js 13+ App Router를 사용하는 페이지와 레이아웃입니다.
- 각 폴더는 라우트를 나타냅니다
- `page.tsx`는 페이지 컴포넌트
- `layout.tsx`는 레이아웃 컴포넌트

### `/assets`
프로젝트에서 import하여 사용하는 정적 에셋입니다.
- 이미지, 아이콘 등
- 빌드 시 최적화됨
- TypeScript 타입 지원

### `/components`
재사용 가능한 React 컴포넌트입니다.
- UI 컴포넌트
- 비즈니스 로직 컴포넌트

### `/content`
마크다운 파일 등 콘텐츠 파일입니다.
- 블로그 포스트
- 정적 콘텐츠

### `/lib`
유틸리티 함수와 헬퍼 함수입니다.
- 데이터 처리 함수
- API 호출 함수

### `/public`
Next.js가 자동으로 서빙하는 정적 파일입니다.
- `/favicon.ico` → `http://localhost:3001/favicon.ico`
- `/robots.txt` → `http://localhost:3001/robots.txt`

### `/types`
TypeScript 타입 정의 파일입니다.
- 모듈 확장
- 전역 타입

## 최적화 사항

✅ **잘 구성된 부분:**
- App Router 구조 준수
- 컴포넌트와 유틸리티 분리
- 타입 정의 분리
- 콘텐츠 파일 분리

✅ **개선 완료:**
- 중복된 `public/avatar.png` 제거 (assets 사용)
- `.gitignore` 최적화

## 권장 사항

1. **환경 변수**: `.env.local` 파일 생성 (git에 커밋하지 않음)
2. **에러 처리**: `app/error.tsx` 추가 고려
3. **로딩 상태**: `app/loading.tsx` 추가 고려
4. **메타데이터**: 각 페이지에 메타데이터 추가
