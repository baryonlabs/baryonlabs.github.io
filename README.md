# baryon.ai Homepage Refresh

이 디렉터리는 현재 `baryon.ai` 정적 홈페이지 루트다.  
기존 사이트는 [`index.html`](/Users/hongmartin/dev/support-cpo/sites/baryon.ai/index.html) 1파일 중심의 랜딩 페이지이고, 새 시안은 [`baryon.ai new webpage.zip`](/Users/hongmartin/dev/support-cpo/sites/baryon.ai/baryon.ai%20new%20webpage.zip) 안에 들어 있다.

## 현재 상태

- 현재 운영 페이지의 주제는 `open-agent-harness` 중심이다.
- 새 시안의 주제는 `Baryon Labs` 기업/제품 홈페이지다.
- 따라서 이번 변경은 문구 수정 수준이 아니라, 사이트의 정보 구조와 브랜드 포지셔닝 자체를 교체하는 작업이다.

## ZIP 구성

ZIP 안에는 아래 파일들이 있다.

- `index.html`
- `index v1.html`
- `styles.css`
- `app.jsx`
- `tweaks-panel.jsx`
- `i18n.js`
- `waitlist.js`

중요: 새 `index.html`은 단독 파일이 아니다. 아래 로컬 파일들을 함께 참조한다.

- `styles.css`
- `app.jsx`
- `tweaks-panel.jsx`
- `i18n.js`
- `waitlist.js`

즉, `index.html`만 교체해서는 정상 배포되지 않는다.

## 의미적 차이

### 1. 사이트 정체성

- 기존: 기술 소개형 단일 랜딩 페이지
- 신규: 회사 브랜딩 + 제품 포트폴리오 + 세미나 + 오픈소스 + 팀 + FAQ까지 포함한 코퍼레이트 마케팅 사이트

### 2. 콘텐츠 구조

- 기존: 설치 명령, 아키텍처, 퀵스타트, 병렬 실행 흐름 설명 중심
- 신규: `Hero -> Products -> Seminars -> Open Source -> Team -> FAQ -> Contact/Waitlist` 흐름

### 3. 사용자 행동 유도

- 기존: GitHub/설치 중심
- 신규: 제품 탐색, 세미나 신청, GitHub 이동, 문의, 웨이팅리스트 등록 중심

### 4. 인터랙션 수준

- 기존: 정적 HTML 안의 소규모 스크립트
- 신규: 언어 전환, 웨이팅리스트 모달, 트윅 패널, 애니메이션이 추가된 다중 자산 페이지

### 5. 운영 리스크

- 기존: 파일 1개 위주라 배포 리스크가 낮음
- 신규: 여러 파일 동시 배포가 필요하고, 외부 CDN 의존성과 폼 전송 설정까지 확인해야 함

## 배포 가능 여부

배포 자체는 가능하다. 다만 조건이 있다.

### 바로 배포 가능한 이유

- 별도 Node 빌드 설정 없이 정적 파일만으로 동작한다.
- HTML에서 React, ReactDOM, Babel을 CDN으로 직접 로드한다.
- CSS/JS도 상대경로 정적 파일이라 일반 정적 호스팅으로 서비스 가능하다.

### 바로 배포하면 확인이 필요한 점

- `app.jsx`, `tweaks-panel.jsx`는 브라우저에서 `text/babel`로 실행된다.
- React/Babel을 `unpkg` CDN에서 가져오므로 외부 네트워크 의존성이 있다.
- `waitlist.js`는 `https://formsubmit.co/ajax/hello@baryon.ai`로 전송한다.
- FormSubmit은 첫 제출 시 메일 소유 확인이 필요할 수 있다.
- `index v1.html`은 실제 엔트리 파일이 아니라 보관용 스냅샷으로 보인다.

결론:

- `정적 호스팅 관점`: 배포 가능
- `운영 완성도 관점`: 사전 점검 없이 즉시 프로덕션 반영은 비권장

## 권장 코드 관리 방식

이 저장소 루트에는 홈페이지와 직접 무관해 보이는 `ctl.ts`, `agent-daemon.ts`, `install.sh`, `architecture.svg`도 같이 있다.  
홈페이지 운영 기준으로는 아래처럼 관리하는 편이 명확하다.

- 현재 운영본 `index.html`은 백업한다.
- ZIP의 파일들을 루트에 풀어 새 사이트 자산을 명시적으로 버전 관리한다.
- `index v1.html`은 참조용이면 `archive/` 또는 `reference/`로 이동하는 편이 낫다.
- 배포 단위는 `index.html + styles.css + *.js + *.jsx` 묶음으로 본다.
- 가능하면 이후에는 브라우저 Babel 실행 대신 사전 번들링된 정적 자산으로 정리한다.

## 적용 전 체크리스트

- 새 `index.html`의 실제 링크 대상이 유효한지 확인
- `hello@baryon.ai` 웨이팅리스트 메일 수신 확인
- KO/EN 전환 동작 확인
- 모바일 레이아웃 확인
- CDN 차단 환경에서도 문제없는지 판단

## 추천 다음 단계

1. ZIP 파일을 작업 디렉터리로 풀어 새 자산을 실제 파일로 반영한다.
2. 기존 `index.html`과 나란히 비교해 필요한 문구/링크만 조정한다.
3. 로컬 브라우저에서 동작 확인 후 배포한다.
4. 배포 후에는 폼 제출과 주요 CTA 링크를 실사용 테스트한다.
