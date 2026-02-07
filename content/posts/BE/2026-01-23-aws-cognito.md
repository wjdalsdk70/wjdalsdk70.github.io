---
title: AWS Cognito + Spring Security 6
description: "AWS Cognito + Spring Security 6: 완벽한 인증/인가 모듈 구축 가이드"
date: 2026-01-23 09:00:00 +0900
categories:
  - BE
tags:
  - Cognito
  - SpringBoot
---

### 🏗️ 핵심 아키텍처 포인트

### 1. 로그인 분리 및 CustomOidcUserService

- **전략:** `/authorization/cognito`와 `/authorization/cognito-admin` 두 개의 `registrationId`를 운용.
- **포인트:** `CustomOidcUserService`에서 `registrationId`를 판별하여, 신규 유저는 DB 적재와 함께 Cognito 그룹(`cognito:groups`)에 할당하는 로직을 자동화합니다.

### 2. Lambda 트리거를 이용한 '권한의 토큰화' (Pre Token Generation)

- **설계:** 토큰이 발행되기 직전, AWS Lambda가 개입하여 유저의 DB ID와 그룹 권한(`role`)을 JWT 페이로드에 직접 박아넣습니다.
- **장점:** API 서버는 매번 DB를 조회할 필요 없이, 토큰만 파싱해도 "이 유저가 누구이며 어떤 권한이 있는지" 즉시 알 수 있어 성능이 비약적으로 향상됩니다.

### 3. Refresh & Logout의 통합 관리

- **Refresh:** 서버가 Refresh Token을 직접 DB에 저장하지 않고, Cognito의 `AdminInitiateAuth` 기능을 통해 검증을 위임함으로써 **Stateless**한 환경을 유지합니다.
- **Logout:** `GlobalSignOut` API를 활용해 한 번의 호출로 모든 브라우저/기기의 세션을 만료시키는 '보안 표준'을 준수합니다.

---

### 💡 구현 전 꼭 체크해야 할 사항 (Tip)

> **"람다 트리거 버전 확인"** 액세스 토큰(Access Token)에 커스텀 클레임을 추가하려면 반드시 **Pre Token Generation v2.0**을 선택해야 합니다. v1.0은 ID 토큰만 수정 가능하므로 주의하세요!

> **"Spring Security 인가 설정"**`CustomJwtAuthenticationConverter`를 만들 때, `cognito:groups`는 리스트 형태이므로 이를 `ROLE_ADMIN`, `ROLE_USER` 형태의 `SimpleGrantedAuthority`로 변환해주는 매핑 로직이 필수입니다.