# Blog

Next.js 기반 블로그입니다. Jekyll Chirpy 테마와 유사한 UI를 제공합니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3001](http://localhost:3001)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

## 구조

- `app/`: Next.js App Router 페이지
- `components/`: React 컴포넌트
- `content/posts/`: 마크다운 포스트 파일
- `lib/`: 유틸리티 함수

## 새 포스트 작성

`content/posts/` 디렉토리에 마크다운 파일을 추가하세요. 파일명은 URL slug로 사용됩니다.

포스트 front matter 예시:

```yaml
---
title: 포스트 제목
description: 포스트 설명
date: 2024-01-01 20:55:00 +0900
categories: [카테고리1, 카테고리2]
tags: [태그1, 태그2]
author: 작성자명
pin: true  # 고정 포스트 (선택)
---
```

## 기능

- ✅ 다크/라이트 모드
- ✅ 사이드바 네비게이션
- ✅ 포스트 목록 및 상세 페이지
- ✅ 카테고리 및 태그 페이지
- ✅ 아카이브 페이지
- ✅ 마크다운 렌더링
- ✅ 반응형 디자인
