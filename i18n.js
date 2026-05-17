// i18n.js — KO/EN toggle driven by a selector→Korean dictionary.
// English stays as the visible HTML (direct-editable). Switching to KO swaps innerHTML.
// Persisted in localStorage. Hooked to the .lang button in the nav.

const KO_DICT = [
  // ─── nav ───
  ['.nav-dropdown > a[href="#paths"]', '경로'],
  ['.nav-links a[href="#company"]',  '회사'],
  ['.nav-links a[href="#proof"]',    '작동 방식'],
  ['.nav-links a[href="#faq"]',      'FAQ'],
  ['.nav-submenu a:nth-child(1) .nav-path-desc', 'AI 팀을 운영하고 학습시키는 운영체제'],
  ['.nav-submenu a:nth-child(2) .nav-path-desc', 'AI가 하는 일을 실시간으로 보기'],
  ['.nav-submenu a:nth-child(3) .nav-path-desc', '진지한 코드베이스를 위한 AI 동료'],
  ['.nav-submenu a:nth-child(4) .nav-path-desc', '같은 비서를 업무 흐름 안으로'],
  ['.nav-submenu a:nth-child(5) .nav-path-desc', 'Mac 안에 사는 음성 비서'],

  // ─── hero ───
  ['.hero-eyebrow span:last-child', '서울에서 빌드 · 어디서든 리서치'],
  ['.hero-head', '먼저 시작하는<br/><em>AI Agent OS.</em>'],
  ['.hero-sub',  '에이전트를 위한 운영체제 <strong>Nautilus</strong>, 에이전트가 뭘 하는지 보여주는 <strong>ROH</strong>, 그리고 그 위에서 동작하는 도구들 — 초 단위 과금, 견적도 SKU도 없습니다.'],
  ['.hero-ctas .btn-solid', '경로 둘러보기 →'],
  ['.hero-ctas .btn-ghost', '작동 방식 보기'],
  ['.trust-label', '찾기'],

  // ─── paths ───
  ['.paths .kicker span:last-child', '경로'],
  ['.paths .section-head', '이미 만들어진 것 중<br/><em>맞는 것을 고르세요.</em>'],
  ['.paths .section-sub', '각 경로는 지금 바로 살펴볼 수 있는 제품으로 이어집니다. AI 팀을 운영하는 곳, 움직임을 보는 곳, 함께 일하는 곳, 말로 쓰는 곳 중 지금 하는 일에 맞는 것을 고르면 됩니다.'],
  ['.path-card:nth-child(1) .path-desc', 'AI 팀이 한 번 실행하고 끝나는 것이 아니라, 역할과 기억과 개선을 다음 사이클까지 이어가도록 돕습니다.'],
  ['.path-card:nth-child(1) .path-link', '제품 보기 ↗'],
  ['.path-card:nth-child(2) .path-desc', 'AI의 판단과 진행 상황을 실시간으로 보면서, 지연이나 실수나 막힘을 문제가 되기 전에 알아챌 수 있습니다.'],
  ['.path-card:nth-child(2) .path-link', '어떻게 보이는지 보기 ↗'],
  ['.path-card:nth-child(3) .path-desc', '실제 소프트웨어 팀을 위한 AI 협업 도구로, 코드베이스를 이해하고 일을 책임감 있게 앞으로 밀어줍니다.'],
  ['.path-card:nth-child(3) .path-link', '제품 열기 ↗'],
  ['.path-card:nth-child(4) .path-desc', '같은 비서를 일상적인 배포 업무 안으로 가져와, 로컬 작업부터 자동화 파이프라인과 팀 운영까지 이어줍니다.'],
  ['.path-card:nth-child(4) .path-link', 'npm에서 설치 ↗'],
  ['.path-card:nth-child(5) .path-desc', '업무 중간에도 자연스럽게 쓸 수 있을 만큼 빠르고, 프라이빗하고, 즉각적인 Mac용 음성 비서입니다.'],
  ['.path-card:nth-child(5) .path-link', 'TalkMode 열기 ↗'],

  // ─── company ───
  ['.company .kicker span:last-child', '회사'],
  ['.company .section-head', 'Baryon Labs는<br/>AI가 회사의 <em>팀원처럼</em><br/>일하게 하는 도구를 만듭니다.'],
  ['.company .section-sub', '우리는 AI 일을 운영하고, 무슨 일이 일어나는지 보고, 일상적인 업무 속에 넣어 쓰게 만드는 제품을 만듭니다. 홈페이지는 개요만 보여주고, 각 경로에서 제품 설명을 이어갑니다.'],
  ['.company-card:nth-child(1) .company-k', '우리가 만드는 것'],
  ['.company-card:nth-child(1) h3', '운영 화면, 비서, 그리고 교육.'],
  ['.company-card:nth-child(1) p', 'Nautilus는 AI 팀을 시간이 지나도 운영하게 돕고, ROH는 그 움직임을 보이게 하며, miri와 TalkMode는 실제 업무 안으로 AI를 가져옵니다. Vibecamp는 이런 도구를 잘 쓰도록 돕습니다.'],
  ['.company-card:nth-child(2) .company-k', '누구를 위한 것인가'],
  ['.company-card:nth-child(2) h3', '신기한 데모보다 실질적 레버리지가 필요한 팀.'],
  ['.company-card:nth-child(2) p', '창업자, 운영자, 엔지니어, 디자이너, 도메인 전문가들이 일을 나누고, 진행을 보고, 통제권을 잃지 않기 위해 Baryon 도구를 사용합니다.'],
  ['.company-card:nth-child(3) .company-k', '어떻게 보면 좋은가'],
  ['.company-card:nth-child(3) h3', '당신의 역할에 맞는 경로부터.'],
  ['.company-card:nth-child(3) p', '루트는 짧게 두고, 제품 페이지에 스크린샷, 설치, 구현 세부를 담습니다. 필요한 만큼만 깊게 들어가면 됩니다.'],

  // ─── products intro ───
  ['.products-intro .kicker span:last-child', '우리가 만드는 것'],
  ['.products-intro .section-head',
    'AI 일을 운영하고,<br/>무슨 일이 일어나는지 보고,<br/>실제 업무에 <em>쓰게</em> 하는 제품들.'],

  // ─── Nautilus OS ───
  ['[data-screen-label="03 Nautilus OS"] .prod-tag',  '에이전트 OS · 학습 레이어'],
  ['[data-screen-label="03 Nautilus OS"] .prod-line', 'AI 팀은 그냥 실행만 하면 안 됩니다.<br/><em>학습</em>해야 합니다.'],
  ['[data-screen-label="03 Nautilus OS"] .prod-body',
    'Nautilus는 AI 팀이 시간이 지날수록 더 나아지도록 돕는 레이어입니다. 각 실행을 기록하고, 계보를 남기고, Soul Spec으로 에이전트의 역할을 고정하며, 잘된 generation을 다음 사이클의 출발점으로 이어줍니다.'],
  ['[data-screen-label="03 Nautilus OS"] .prod-points li:nth-child(1)', '<span class="bullet">→</span>모든 실행이 감사 가능한 계보로 기록'],
  ['[data-screen-label="03 Nautilus OS"] .prod-points li:nth-child(2)', '<span class="bullet">→</span>가장 좋은 generation이 다음 사이클의 씨앗이 됨'],
  ['[data-screen-label="03 Nautilus OS"] .prod-points li:nth-child(3)', '<span class="bullet">→</span>Soul Spec으로 역할, 계약, 도구, 책임을 정의'],
  ['[data-screen-label="03 Nautilus OS"] .prod-ctas .btn-solid', 'Nautilus 보기 ↗'],
  ['[data-screen-label="03 Nautilus OS"] .prod-ctas .btn-ghost', 'glhub 보기 ↗'],
  ['.vs-side.bad .vs-l', '기억하지 못하는 AI 팀'],
  ['.vs-side.good .vs-l', 'Nautilus'],
  ['.vs-side.bad .vs-step:nth-of-type(1)', '좋았던 실행'],
  ['.vs-side.bad .vs-step:nth-of-type(2)', '맥락 소실'],
  ['.vs-side.bad .vs-step:nth-of-type(3)', '같은 실수 반복'],
  ['.vs-side.good .vs-step:nth-of-type(1)', '기록'],
  ['.vs-side.good .vs-step:nth-of-type(2)', '다음 사이클의 씨앗'],
  ['.naut-side .naut-side-h:nth-of-type(1)', '워크스페이스'],
  ['.naut-meter .meter-eyebrow', '실시간 사용량'],
  ['.naut-meter .meter-sub', '초 단위 과금 · 언제든 중단'],
  ['.naut-meter .meter-row:nth-of-type(1) span:first-child', '이번 시간'],
  ['.naut-meter .meter-row:nth-of-type(2) span:first-child', '오늘'],
  ['.naut-meter .meter-row:nth-of-type(3) span:first-child', '이번 달'],
  ['.naut-chart-l span:first-child', '사용량 · 최근 24시간'],
  ['.naut-chart-l span:last-child', '최고 $0.86/시간'],
  ['.naut-toolbar .naut-status', '<span class="status-dot"></span>4개 에이전트 · 실행 중'],

  // ─── ROH ───
  ['[data-screen-label="04 ROH"] .prod-tag',  '관측성 · 실시간'],
  ['[data-screen-label="04 ROH"] .prod-line', '에이전트가 <em>진짜로</em> 뭘 하는지 보세요.'],
  ['[data-screen-label="04 ROH"] .prod-body',
    'ROH는 실시간 에이전트 시각화입니다. 모든 플랜, 모든 툴 콜, 모든 재시도가 라이브 트레이스로 렌더링됩니다 — 에이전트가 돈을 태우거나 멈추면, <em>어디서</em> 그런지 200ms 안에 알 수 있습니다. 채팅 형식 디버그 출력은 엔지니어에 대한 범죄이기 때문에 만들었습니다.'],
  ['[data-screen-label="04 ROH"] .prod-points li:nth-child(1)', '<span class="bullet">→</span>실행 중인 모든 에이전트의 라이브 그래프'],
  ['[data-screen-label="04 ROH"] .prod-points li:nth-child(2)', '<span class="bullet">→</span>어떤 트레이스든 재생, 어떤 프레임이든 공유'],
  ['[data-screen-label="04 ROH"] .prod-points li:nth-child(3)', '<span class="bullet">→</span>OpenTelemetry 호환 · 기존 인프라에 그대로'],
  ['[data-screen-label="04 ROH"] .prod-ctas .btn-solid', '라이브 트레이스 보기 →'],
  ['[data-screen-label="04 ROH"] .prod-ctas .btn-ghost', '트레이스 구조 보기'],
  ['.roh-side .roh-pill', '실행 중'],
  ['.roh-row:nth-of-type(1) span:first-child', '지연'],
  ['.roh-row:nth-of-type(2) span:first-child', '토큰'],
  ['.roh-row:nth-of-type(3) span:first-child', '비용'],
  ['.roh-row:nth-of-type(4) span:first-child', '모델'],

  // ─── miri.dev ───
  ['[data-screen-label="05 miri.dev"] .prod-tag',  '대표 제품 · 운영 중'],
  ['[data-screen-label="05 miri.dev"] .prod-line', '레포를 <em>진짜로</em> 읽는<br/>페어 프로그래머.'],
  ['[data-screen-label="05 miri.dev"] .prod-body',
    'Miri는 코드베이스 전체를 인덱싱하고 컨벤션을 학습하며, 시니어 엔지니어가 만질 법한 파일에 패치를 작성합니다. 프롬프트가 아닌 컨텍스트를 이해합니다.'],
  ['[data-screen-label="05 miri.dev"] .prod-points li:nth-child(1)', '<span class="bullet">→</span>키 입력마다 레포 전체 정적 분석'],
  ['[data-screen-label="05 miri.dev"] .prod-points li:nth-child(2)', '<span class="bullet">→</span>테스트 커버리지까지 붙은 PR 수준의 diff'],
  ['[data-screen-label="05 miri.dev"] .prod-points li:nth-child(3)', '<span class="bullet">→</span>Claude, GPT, 로컬 모델 모두 호환'],
  ['[data-screen-label="05 miri.dev"] .prod-ctas .btn-solid', 'miri.dev 바로가기 ↗'],
  ['[data-screen-label="05 miri.dev"] .prod-ctas .btn-ghost', 'npm에서 CLI 보기'],

  // ─── miridev-cli ───
  ['[data-screen-label="06 miridev-cli"] .prod-tag',  'CLI · 오픈소스'],
  ['[data-screen-label="06 miridev-cli"] .prod-line', 'miri를 <em>모든</em> 터미널로.'],
  ['[data-screen-label="06 miridev-cli"] .prod-body',
    '동일한 에이전트, IDE 없이도. <code>miridev</code>는 tmux 친화적 TUI로, CI용 exec 래퍼로, 혹은 파이프로 연결되는 JSON-RPC 서버로 동작합니다. CLI는 완전 오픈소스이며 조직 GitHub에서 관리됩니다.'],
  ['[data-screen-label="06 miridev-cli"] .prod-points li:nth-child(1)', '<span class="bullet">→</span>제로 컨피그 레포 인덱싱'],
  ['[data-screen-label="06 miridev-cli"] .prod-points li:nth-child(2)', '<span class="bullet">→</span>에이전트의 에이전트를 위한 JSON 출력 모드'],
  ['[data-screen-label="06 miridev-cli"] .prod-points li:nth-child(3)', '<span class="bullet">→</span>Claude Code, Codex, 로컬 모델과 호환'],
  ['[data-screen-label="06 miridev-cli"] .prod-ctas .btn-solid', 'npm에서 보기 ↗'],
  ['[data-screen-label="06 miridev-cli"] .prod-ctas .btn-ghost', 'GitHub 소스'],

  // ─── TalkMode ───
  ['[data-screen-label="07 TalkMode"] .prod-tag', '데스크톱 앱 · 운영 중'],
  ['[data-screen-label="07 TalkMode"] .prod-line', '또 하나의 채팅 탭이 아니라,<br/>당신의 <em>Mac</em> 위 실제 비서.'],
  ['[data-screen-label="07 TalkMode"] .prod-body', 'TalkMode는 Mac mini를 음성 중심 비서로 바꿉니다. 빠른 한국어 턴테이킹, 온디바이스 멀티모달 신호, 로컬 우선 상호작용을 바탕으로 브라우저 위젯이 아니라 옆자리에 앉은 동료처럼 동작하도록 설계했습니다.'],
  ['[data-screen-label="07 TalkMode"] .prod-points li:nth-child(1)', '<span class="bullet">→</span>한국어에 맞춘 초저지연 대화 흐름'],
  ['[data-screen-label="07 TalkMode"] .prod-points li:nth-child(2)', '<span class="bullet">→</span>20개 UI 언어, 50개+ 온디바이스 음성 로케일'],
  ['[data-screen-label="07 TalkMode"] .prod-points li:nth-child(3)', '<span class="bullet">→</span>Homebrew 설치, 로컬 진단, 기본 프라이버시'],
  ['[data-screen-label="07 TalkMode"] .prod-ctas .btn-solid', 'TalkMode 열기 ↗'],
  ['[data-screen-label="07 TalkMode"] .prod-ctas .btn-ghost', 'macOS 설치'],
  ['.tm-title', 'Mac mini가<br/>진짜 비서가 됩니다.'],
  ['.tm-bubble.user', '회의 끝나면 요약도 남겨줘.'],
  ['.tm-bubble.ai:not(.subtle)', '알겠습니다. 대화가 끝나면 요점, 결정사항, 액션 아이템까지 정리해 둘게요.'],
  ['.tm-bubble.ai.subtle', '시선 · 음성 · 전사를 함께 써서 턴 종료를 판단'],
  ['.tm-metric:nth-child(1) span', '모드'],
  ['.tm-metric:nth-child(2) span', 'UI 언어'],
  ['.tm-metric:nth-child(3) span', '음성 로케일'],

  // ─── vibecamp ───
  ['[data-screen-label="07 vibecamp"] .prod-tag',  '교육 · 코호트 기반'],
  ['[data-screen-label="07 vibecamp"] .prod-line', '<em>만드는 사람</em>이<br/>만드는 사람에게 배운다.'],
  ['[data-screen-label="07 vibecamp"] .prod-body',
    'LLM과 함께 빌드하고 싶은 현직 엔지니어를 위한 6주 집중 코호트. 라이브 강의, 실제 코드베이스, 매주 데모. 프롬프트 엔지니어링이 아닌 모델을 동료로 두는 프로덕트 엔지니어링을 가르칩니다.'],
  ['[data-screen-label="07 vibecamp"] .prod-points li:nth-child(1)', '<span class="bullet">→</span>6회 코호트 완주 · 240+ 동문'],
  ['[data-screen-label="07 vibecamp"] .prod-points li:nth-child(2)', '<span class="bullet">→</span>현직 창업자가 평가하는 캡스톤'],
  ['[data-screen-label="07 vibecamp"] .prod-points li:nth-child(3)', '<span class="bullet">→</span>Anthropic, 토스, KRX 채용 연결'],
  ['[data-screen-label="07 vibecamp"] .prod-ctas .btn-solid', '지원하기 ↗'],

  // vibecamp mock content
  ['.camp-eyebrow', '코호트 07 · 2026년 7월 오픈'],
  ['.camp-h', '6주, <em>한 가지</em>를 출시.'],
  ['.camp-grid .camp-cell:nth-child(1) .cl', '레포 부트스트랩 & 평가'],
  ['.camp-grid .camp-cell:nth-child(2) .cl', '거짓말하지 않는 검색'],
  ['.camp-grid .camp-cell:nth-child(3) .cl', '결과 있는 툴 사용'],
  ['.camp-grid .camp-cell:nth-child(4) .cl', '저렴하고 시끄러운 에이전트 루프'],
  ['.camp-grid .camp-cell:nth-child(5) .cl', '낯선 100명에게 출시'],
  ['.camp-grid .camp-cell:nth-child(6) .cl', '데모 나이트 · 라이브 심사'],
  ['.camp-row .camp-stat:nth-child(1) .cs-l', '동문'],
  ['.camp-row .camp-stat:nth-child(2) .cs-l', '→ 창업'],
  ['.camp-row .camp-stat:nth-child(3) .cs-l', 'NPS'],

  // ─── ai-native ───
  ['[data-screen-label="08 ai-native"] .prod-tag',  '신규 · 비개발자 대상'],
  ['[data-screen-label="08 ai-native"] .prod-line', '<em>코드</em>는 배운 적 없지만,<br/><em>만들기</em>는 멈춘 적 없는 사람들에게.'],
  ['[data-screen-label="08 ai-native"] .prod-body',
    '디자이너, PM, 창업자, 오퍼레이터 — 타입스크립트 없이 프로덕트를 출시해 본 사람이라면. AI 네이티브 바이브캠프는 에이전트 스택을 당신의 IDE, 린터, QA, 제2의 뇌로 만들어 줍니다.'],
  ['[data-screen-label="08 ai-native"] .prod-points li:nth-child(1)', '<span class="bullet">→</span>선수 과목 없음 · 프롬프트부터'],
  ['[data-screen-label="08 ai-native"] .prod-points li:nth-child(2)', '<span class="bullet">→</span>4주 안에 실제 제품 빌드 & 출시'],
  ['[data-screen-label="08 ai-native"] .prod-points li:nth-child(3)', '<span class="bullet">→</span>한국어 / 영어 코호트'],
  ['[data-screen-label="08 ai-native"] .prod-ctas .btn-solid', '다음 코호트 신청 ↗'],

  // ai-native mock content
  ['.ai-eyebrow', 'AI 네이티브 바이브캠프 · 코호트 02'],
  ['.ai-h', '당신은 <em>이미</em> 빌더입니다.<br/><em>딱 맞는 도구</em>가 필요합니다.'],
  ['.ai-stack .ai-tile:nth-child(1) .t-t', '레포에 말 걸기'],
  ['.ai-stack .ai-tile:nth-child(2) .t-t', '디자인 → 동작하는 앱'],
  ['.ai-stack .ai-tile:nth-child(3) .t-t', 'PR 없이 출시'],
  ['.ai-stack .ai-tile:nth-child(4) .t-t', '유저와 라이브로 반복'],
  ['.ai-cohort .ac-h', '코호트 02 — 잔여 자리'],
  ['.ai-cohort .ac-meta', '31 / 40 채워짐 · 8/12 → 9/9'],
  ['.ai-apply', '신청 →'],

  // ─── how it works ───
  ['#proof .kicker span:last-child', '작동 방식'],
  ['#proof .section-head', '겉은 분명하게,<br/>속은 <em>진지하게.</em>'],
  ['#proof .section-sub', '기계를 다 이해하지 않아도 가치가 보여야 합니다. 루트에서 중요한 건 단순합니다. Baryon의 도구는 일을 나누고, 진행 상황을 보고, 통제권을 잃지 않게 돕습니다.'],
  ['#proof .proof-card:nth-of-type(1) .proof-card-k', '위임'],
  ['#proof .proof-card:nth-of-type(1) h3', '맥락을 잃지 않고 일을 나눌 수 있습니다.'],
  ['#proof .proof-card:nth-of-type(1) p', '하나의 비서에게 맡기든 여러 비서에게 동시에 맡기든, 팀이 이해할 수 있는 같은 작업 맥락 안에서 진행됩니다.'],
  ['#proof .proof-card:nth-of-type(1) li:nth-child(1)', '한 번 쓰고 버리는 프롬프트용이 아닙니다'],
  ['#proof .proof-card:nth-of-type(1) li:nth-child(2)', '여럿이 함께 움직이는 일을 전제로 합니다'],
  ['#proof .proof-card:nth-of-type(1) li:nth-child(3)', '세부 구조는 제품별 페이지에서 봅니다'],
  ['#proof .proof-card:nth-of-type(2) .proof-card-k', '가시성'],
  ['#proof .proof-card:nth-of-type(2) h3', '신뢰가 무너지기 전에 AI의 움직임을 볼 수 있습니다.'],
  ['#proof .proof-card:nth-of-type(2) p', '결과가 잘못된 뒤에 알기보다, 일이 진행되는 동안 판단과 손넘김과 지연을 볼 수 있도록 설계했습니다.'],
  ['#proof .proof-card:nth-of-type(2) li:nth-child(1)', '운영자, 검토자, 고객 모두에게 유용합니다'],
  ['#proof .proof-card:nth-of-type(2) li:nth-child(2)', '불필요한 놀람을 줄이기 위한 구조입니다'],
  ['#proof .proof-card:nth-of-type(2) li:nth-child(3)', '기술적 세부는 제품별 상세 페이지에 둡니다'],
  ['#proof .proof-card:nth-of-type(3) .proof-card-k', '통제'],
  ['#proof .proof-card:nth-of-type(3) h3', '필요한 만큼만 복잡해지면 됩니다.'],
  ['#proof .proof-card:nth-of-type(3) p', '누군가는 바로 쓸 수 있는 제품을 원하고, 누군가는 더 깊은 운영 화면을 원합니다. 둘 다 열어두되 모두에게 같은 복잡성을 강요하지 않습니다.'],
  ['#proof .proof-card:nth-of-type(3) li:nth-child(1)', '도구로 시작하고 나중에 시스템으로 확장할 수 있습니다'],
  ['#proof .proof-card:nth-of-type(3) li:nth-child(2)', '루트는 선택을 위한 곳이지 공부를 위한 곳이 아닙니다'],
  ['#proof .proof-card:nth-of-type(3) li:nth-child(3)', '정말 필요할 때만 더 깊게 들어가면 됩니다'],
  ['#proof .proof-panel:first-of-type .proof-panel-k', '기술팀을 위해'],
  ['#proof .proof-panel:first-of-type .proof-panel-h', '구현이 궁금한 팀을 위해 공개해 둡니다.'],
  ['#proof .proof-panel:first-of-type .proof-inline-btn', '기술 상세 보기 ↗'],
  ['#proof .proof-panel.runtime .proof-panel-k', '한눈에'],
  ['#proof .proof-panel.runtime .proof-panel-h', '도구마다 관여 수준이 다릅니다.'],
  ['#proof .proof-runtime-item:nth-child(1) .proof-runtime-l', '탐색'],
  ['#proof .proof-runtime-item:nth-child(1) .proof-runtime-v', '내 역할과 현재 문제에 맞는 도구부터 고릅니다.'],
  ['#proof .proof-runtime-item:nth-child(2) .proof-runtime-l', '검토'],
  ['#proof .proof-runtime-item:nth-child(2) .proof-runtime-v', '더 자세한 설명이나 데모나 설치가 필요하면 전용 페이지로 들어갑니다.'],
  ['#proof .proof-runtime-item:nth-child(3) .proof-runtime-l', '결정'],
  ['#proof .proof-runtime-item:nth-child(3) .proof-runtime-v', '루트에서는 큰 그림만 보고, 구현은 팀이 준비됐을 때만 깊게 봅니다.'],

  // ─── OSS ───
  ['.oss .kicker span:last-child', '오픈소스'],
  ['.oss .section-head', '우리가 만드는 것의<br/><em>공개된 층</em>.'],
  ['.oss .section-sub',  '더 자세히 보고 싶은 분들을 위해 스택의 일부를 공개해 둡니다. 홈페이지는 단순하게 두고, 구현 세부는 저장소 안에 담습니다.'],
  ['.oss-head > .btn', '저장소 둘러보기 ↗'],

  // repo descriptions (in DOM order)
  ['.repo-grid .repo:nth-child(1) .repo-desc', 'miri 에이전트를 CLI로. 어떤 레포든 몇 초 안에 인덱싱하고 JSON-RPC, TUI, exec 모드를 제공합니다.'],
  ['.repo-grid .repo:nth-child(2) .repo-desc', '공유 에이전트 런타임 — 스케줄러, 툴 콜, 재시도, 구조화 출력. 우리가 만드는 모든 것의 기반.'],
  ['.repo-grid .repo:nth-child(3) .repo-desc', 'Node용 작고 빠른 로깅 라이브러리. 오래 포크해 쓰던 것을 이제 제대로 유지보수합니다.'],
  ['.repo-grid .repo:nth-child(4) .repo-desc', 'LLM 앱을 위한 작고 단호한 평가 하네스. 케이스 20개면 CI 대시보드 완성. 스프레드시트는 그만.'],
  ['.repo-grid .repo:nth-child(5) .repo-desc', 'AI 에이전트를 위한 YAML 워크플로우 — 분기, 재시도, 휴먼 인 더 루프. miri에서 추출한 오케스트레이터.'],
  ['.repo-grid .repo:nth-child(6) .repo-desc', '한글 자모를 존중하는 한국어 우선 BPE 토크나이저. 한국어 코퍼스에서 tiktoken보다 훨씬 빠릅니다.'],

  // ─── numbers ───
  ['.numbers .num-cell:nth-child(1) .num-l', '운영 중인 제품'],
  ['.numbers .num-cell:nth-child(2) .num-l', '쉬핑 중인 vibecamp 동문'],
  ['.numbers .num-cell:nth-child(3) .num-l', '조직 누적 스타'],
  ['.numbers .num-cell:nth-child(4) .num-l', '서울 설립 연도'],

  // ─── FAQ ───
  ['.faq .kicker span:last-child', 'FAQ'],
  ['.faq .section-head', '자주 묻는 질문.'],
  ['.faq-list details:nth-of-type(1) summary', '"Baryon"은 무슨 뜻이고, 왜 이 이름인가요?'],
  ['.faq-list details:nth-of-type(1) p',
    '바리온(baryon)은 일상 물질을 구성하는 무거운 입자 — 양성자, 중성자입니다. 모든 것이 그 위에 올라가지만, 정작 화제로 삼지 않는 것. 우리 도구도 마찬가지입니다. 보이는 에이전트는 이미 출하된 작고 견고한 프리미티브 위에 쌓여 있습니다.'],
  ['.faq-list details:nth-of-type(2) summary', '제품은 무료인가요?'],
  ['.faq-list details:nth-of-type(2) p',
    '<strong>miridev-cli</strong>는 npm에서 무료, 오픈소스입니다. <strong>miri.dev</strong>는 무료 티어와 유료 플랜이 있습니다. <strong>vibecamp</strong>와 <strong>ai-native vibecamp</strong>는 유료 코호트이며 부분 장학금이 가능합니다 — 신청 폼 참조.'],
  ['.faq-list details:nth-of-type(3) summary', '회사 기존 툴체인과 같이 쓸 수 있나요?'],
  ['.faq-list details:nth-of-type(3) p',
    '네. miri는 어떤 git 레포든 읽고 PR로 패치를 작성합니다. miridev-cli는 CI를 위한 JSON-RPC와 exec 모드를 제공합니다. baryon-core는 MIT 라이센스로 LLM 프로바이더 무관하게 동작합니다.'],
  ['.faq-list details:nth-of-type(4) summary', '채용 중인가요?'],
  ['.faq-list details:nth-of-type(4) p',
    '조용히, 항상. 프로덕션에 에이전트를 쉬핑해 본 적이 있다면 — 우리가 알아볼 만한 코드베이스가 있다면 — 링크 한 줄과 함께 메일 주세요. 아래에 이메일이 있습니다.'],
  ['.faq-list details:nth-of-type(5) summary', '왜 영어/한국어 코호트를 동시에 운영하나요?'],
  ['.faq-list details:nth-of-type(5) p',
    '한국에는 세계 수준의 엔지니어가 있지만 AI 네이티브 빌딩을 위한 동료 코호트가 거의 없습니다. vibecamp를 이중언어로 운영하는 이유는 — 교훈은 국경을 넘지만 네트워크는 로컬이기 때문입니다.'],

  // ─── end CTA ───
  ['.endcta-h', '모델을 쫓아다니지 마세요.<br/>이제 <em>조합</em>할 시간입니다.'],
  ['.endcta-row .btn-solid', 'miri.dev 써보기'],

  // ─── notices ───
  ['.seminars .kicker span:last-child', '공지'],
  ['.seminars .section-head', '지금 열려 있는<br/><em>모임들.</em>'],
  ['.seminars .section-sub', '루트에서는 지금 신청 가능한 모임 두 가지만 짧게 보여줍니다. 자세한 안내와 등록은 Luma에서 이어집니다.'],
  ['.seminar.featured .sem-tag', '<span>법률 AI</span> <span class="sem-dot">·</span> <span>변호사 모임</span> <span class="sem-dot">·</span> <span class="sem-brand">Baryon Labs</span>'],
  ['.seminar.featured .sem-badge', '<span class="sem-pulse"></span><span class="sem-badge-l">2026년 6월 19일</span>'],
  ['.seminar.featured .sem-h', '변호사 모임:<br/><em>첫 리걸 에이전트</em>를 만드는 자리.'],
  ['.seminar.featured .sem-body', '리서치, 초안 작성, 내부 업무 흐름을 AI가 어떻게 거들 수 있는지 직접 보고 이야기하는 작은 실전 세션입니다.'],
  ['.seminar.featured .sem-row:nth-of-type(1) .sm-l', '정원'],
  ['.seminar.featured .sem-row:nth-of-type(1) .sm-v', '6명'],
  ['.seminar.featured .sem-row:nth-of-type(2) .sm-l', '일시'],
  ['.seminar.featured .sem-row:nth-of-type(2) .sm-v', '2026년 6월 19일 · 오후 2시'],
  ['.seminar.featured .sem-row:nth-of-type(3) .sm-l', '형식'],
  ['.seminar.featured .sem-row:nth-of-type(3) .sm-v', '핸즈온 세션'],
  ['.seminar.featured .sem-cta', 'Luma에서 신청 <span aria-hidden="true">↗</span>'],
  ['.seminar.recurring .sem-tag', '<span>정기</span> <span class="sem-dot">·</span> <span>주말 모임</span>'],
  ['.seminar.recurring .sem-badge', '<span class="sem-badge-l">매주 일요일</span>'],
  ['.seminar.recurring .sem-h', '정기 주말<br/><em>당근 모임.</em>'],
  ['.seminar.recurring .sem-body', 'AI를 실제 일에 붙여 쓰는 사람들을 위한 정기 모임입니다. 데모, 짧은 발표, 질문, 그리고 실제로 무엇이 나가고 있는지에 대한 대화를 나눕니다.'],
  ['.seminar.recurring .sem-row:nth-of-type(1) .sm-l', '주기'],
  ['.seminar.recurring .sem-row:nth-of-type(1) .sm-v', '매주'],
  ['.seminar.recurring .sem-row:nth-of-type(2) .sm-l', '요일'],
  ['.seminar.recurring .sem-row:nth-of-type(2) .sm-v', '일요일'],
  ['.seminar.recurring .sem-row:nth-of-type(3) .sm-l', '안내'],
  ['.seminar.recurring .sem-row:nth-of-type(3) .sm-v', 'Luma 캘린더'],
  ['.seminar.recurring .sem-cta', '일정 보기 <span aria-hidden="true">↗</span>'],
  ['.seminars-foot .btn', 'Luma에서 전체 모임 보기 ↗'],

  // ─── footer ───
  ['.foot-tag', '제1원리에서 시작하는 AI.<br/>서울 · 글로벌.'],
  ['.foot-top .foot-col:nth-of-type(1) .foot-h', '제품'],
  ['.foot-top .foot-col:nth-of-type(2) .foot-h', '오픈'],
  ['.foot-top .foot-col:nth-of-type(3) .foot-h', '소통'],
  ['.foot-top .foot-col:nth-of-type(3) a[href="#faq"]', 'FAQ'],
  ['.foot-bot span:last-child', '제1원리에서 시작하는 AI 혁신.'],

  // ─── waitlist modal ───
  ['.modal-eyebrow-label', '사전 신청'],
  ['.modal-h', '<em>웨이팅 리스트</em>에<br/>등록하세요.'],
  ['.modal-sub', '<span class="modal-product">이 제품</span>이 열리면 이메일로 알려드립니다. 마케팅 메일 없음. 제3자 공유 없음.'],
  ['.modal-submit-label', '신청하기'],
  ['.modal-fine', '신청 시 <span class="modal-product">이 제품</span>에 한해 안내 메일을 보낼 수 있음에 동의합니다. 제3자와 공유하지 않습니다.'],
  ['.modal-success-h', '신청 완료.'],
  ['.modal-success-p', '<strong class="ms-email">your@email</strong>로 <span class="modal-product">이 제품</span> 준비 소식을 보내드릴게요.'],
  ['.modal-success-btn', '닫기'],
  ['.modal-error p', '문제가 발생했습니다. 다시 시도하거나 <a href="mailto:hello@baryon.ai">hello@baryon.ai</a>로 직접 메일 주세요.']
];

// ─── runtime ───────────────────────────────────────────────
const __snapshots = new WeakMap();

function setLang(lang) {
  document.documentElement.lang = lang;
  KO_DICT.forEach(([sel, koHtml]) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!__snapshots.has(el)) __snapshots.set(el, el.innerHTML);
      el.innerHTML = lang === 'ko' ? koHtml : __snapshots.get(el);
    });
  });
  // sync lang button visual state
  document.querySelectorAll('.lang').forEach(b => b.dataset.lang = lang);
  try { localStorage.setItem('baryon-lang', lang); } catch (e) {}
  // notify listeners (waitlist.js etc) that lang changed so dynamic text can re-apply
  document.dispatchEvent(new CustomEvent('baryon:langchanged', { detail: { lang } }));
}

function initI18n() {
  const saved = (() => { try { return localStorage.getItem('baryon-lang'); } catch (e) { return null; } })();
  const browserLang = (navigator.language || navigator.userLanguage || 'ko').toLowerCase();
  const initial = saved === 'ko' || saved === 'en'
    ? saved
    : (browserLang.startsWith('ko') ? 'ko' : 'en');
  setLang(initial);

  document.querySelectorAll('.lang').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // if user clicked a specific .lang-opt, honor that. otherwise toggle.
      const opt = e.target.closest('.lang-opt');
      const next = opt ? opt.dataset.set : (document.documentElement.lang === 'ko' ? 'en' : 'ko');
      setLang(next);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
