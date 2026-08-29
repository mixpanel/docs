# Mixpanel docs — English → Korean glossary

**Linear:** [DF-826](https://linear.app/mixpanel/issue/DF-826) · Machine-readable copy: [`ko.csv`](ko.csv)

Terms are ranked by how often they actually appear in `docs/` and `guides/` (counts in the table are
occurrences across the corpus), so the top of each section is where consistency pays off most.

## The rule this glossary follows

**Mixpanel's product UI is English-only.** A Korean reader following these docs is looking at an English
screen. So feature names use the *established Korean transliteration* — phonetically recognisable against
the English button they are about to click — while ordinary nouns become real Korean.

- First use on a page: `코호트(Cohort)`. After that, `코호트` alone.
- Register: **-합니다 / -하세요**. Not 해요체 (too casual), not 합쇼체 (too stiff).
- Anything in the "Never translate" section stays in Latin script, including inside Korean sentences.

---

## Core data model

| English | Korean | ~Freq | Note |
| --- | --- | ---: | --- |
| event | 이벤트 | 858 | |
| property / properties | 속성 | 424 | |
| user | 사용자 | 807 | |
| user profile | 사용자 프로필 | 322 | |
| profile property | 프로필 속성 | | |
| super property | 슈퍼 속성 | | |
| group profile | 그룹 프로필 | | |
| Group Analytics | 그룹 애널리틱스 | 91 | Product feature |
| cohort | 코호트 | 244 | |
| Behavior / Behaviors | 행동(Behavior) | 96 | Cohort-builder concept — gloss on first use |
| custom event | 커스텀 이벤트 | 31 | |
| custom property | 커스텀 속성 | 17 | |
| lookup table | 룩업 테이블 | 102 | |
| distinct ID | distinct ID | 58 | **Never translate** — literal identifier |
| identity merge | 아이덴티티 병합 | 10 | |
| alias | 별칭(alias) | | |
| anonymous ID | 익명 ID | | |
| reserved property | 예약 속성 | | |
| data model | 데이터 모델 | | |
| schema | 스키마 | | |
| taxonomy | 택소노미 | | |
| timestamp | 타임스탬프 | | |

## Reports and analysis

| English | Korean | ~Freq | Note |
| --- | --- | ---: | --- |
| Insights | 인사이트 | 126 | Report name |
| Funnels | 퍼널 | 107 | Report name |
| Retention | 리텐션 | 145 | **Report name only** — see pitfalls |
| Flows | 플로우 | 65 | Report name |
| Boards | 보드 | 217 | Mixpanel renamed Dashboards → Boards; prefer 보드 |
| dashboard | 대시보드 | 18 | Legacy term; use only where the source insists |
| report | 리포트 | 76 | |
| breakdown | 브레이크다운 | 21 | |
| segmentation | 세그멘테이션 | 10 | |
| segment (noun) | 세그먼트 | | |
| filter | 필터 | | |
| formula | 수식(Formula) | 17 | |
| metric | 지표 | | |
| Metric Tree | 메트릭 트리 | 40 | Product feature |
| Impact Report | 임팩트 리포트 | | |
| conversion | 전환 | | |
| conversion rate | 전환율 | | |
| conversion window | 전환 기간 | | |
| step (funnel) | 단계 | | |
| churn | 이탈 | | |
| stickiness | 스티키니스(Stickiness) | | Report name |
| frequency | 빈도 | | |
| Annotations | 어노테이션 | 33 | |
| Alerts | 알림(Alert) | 79 | Gloss on first use — 알림 also means "notification" |
| chart | 차트 | | |
| query | 쿼리 | | |
| Signal | 시그널(Signal) | 19 | Product feature |

## Product surfaces

| English | Korean | ~Freq | Note |
| --- | --- | ---: | --- |
| Session Replay | 세션 리플레이 | 292 | |
| Feature Flags | 기능 플래그 | 198 | 피처 플래그 also circulates — pick one, this is it |
| Experiments | 실험 | 242 | |
| variant | 변형(Variant) | | |
| rollout | 롤아웃 | | |
| Lexicon | Lexicon | 291 | **Never translate** — product name |
| Autocapture | 오토캡처 | | |
| Mixpanel Agent | Mixpanel Agent | | **Never translate** |
| Warehouse Connectors | 웨어하우스 커넥터 | 39 | |
| Data Pipelines | 데이터 파이프라인 | 41 | |
| Cohort Sync | 코호트 동기화 | 45 | |

## Data in

| English | Korean | Note |
| --- | --- | --- |
| tracking | 트래킹 | |
| to track (verb) | 트래킹합니다 / 전송합니다 | Use 전송 when the emphasis is on sending |
| ingestion | 수집 | |
| instrumentation | 트래킹 구현(instrumentation) | |
| import | 임포트 | |
| batch | 배치 | |
| payload | 페이로드 | |
| endpoint | 엔드포인트 | |
| rate limit | 요청 제한(rate limit) | |
| deduplication | 중복 제거 | |
| opt out | 트래킹 거부(opt-out) | |
| server-side / client-side | 서버 사이드 / 클라이언트 사이드 | |
| library | 라이브러리 | |

## Data out

| English | Korean | Note |
| --- | --- | --- |
| export | 내보내기 | |
| destination | 전송 대상 | Cohort Sync / Data Pipelines targets |
| sync | 동기화 | |
| one-time export | 일회성 내보내기 | Recurring heading |
| dynamic sync | 동적 동기화 | Recurring heading |
| warehouse | 웨어하우스 | |
| connector | 커넥터 | |

## Admin, security, billing

| English | Korean | ~Freq | Note |
| --- | --- | ---: | --- |
| project | 프로젝트 | 462 | |
| organization | 조직 | 306 | |
| workspace | 워크스페이스 | 24 | |
| service account | 서비스 계정 | 29 | |
| project token | 프로젝트 토큰 | | |
| API secret | API 시크릿 | | |
| role | 역할 | | |
| permission | 권한 | | |
| Single Sign-On (SSO) | 싱글 사인온(SSO) | | |
| audit log | 감사 로그 | | |
| data governance | 데이터 거버넌스 | | |
| data residency | 데이터 레지던시 | | EU/India residency pages |
| **data retention** | **데이터 보관** | | **Not 리텐션** — see pitfalls |
| plan | 요금제 | | |
| usage | 사용량 | | |
| billing | 결제 | | |

## Recurring doc furniture

Translate these identically every time — they are structural, and inconsistency here is the most visible
kind. Counts are how often the heading appears across the corpus.

| English | Korean | ~Freq |
| --- | --- | ---: |
| Overview | 개요 | 119 |
| FAQ / Frequently Asked Questions | 자주 묻는 질문 | 48 |
| Permissions | 권한 | 30 |
| Prerequisites | 사전 준비 사항 | 26 |
| Use Cases | 활용 사례 | 20 |
| Troubleshooting | 문제 해결 | 20 |
| Quick Start / Getting Started | 빠른 시작 / 시작하기 | 33 |
| Key Takeaways | 핵심 요약 | 16 |
| Next Steps | 다음 단계 | 14 |
| Installation | 설치 | 14 |
| Installing the Library | 라이브러리 설치 | 13 |
| Sending Events | 이벤트 전송 | 14 |
| Storing User Profiles | 사용자 프로필 저장 | 13 |
| Setting Profile Properties | 프로필 속성 설정 | 13 |
| Managing User Identity | 사용자 아이덴티티 관리 | 13 |
| Release History | 릴리스 히스토리 | 13 |
| Privacy-Friendly Tracking | 프라이버시 친화적 트래킹 | 13 |
| Library Configuration | 라이브러리 설정 | 9 |
| Error Handling | 오류 처리 | 9 |
| Best Practices | 모범 사례 | 8 |
| Debug Mode / Debugging | 디버그 모드 / 디버깅 | 12 |
| Usage | 사용법 | 10 |
| Limitations | 제한 사항 | |
| Example | 예시 | |
| Note / Warning (callout prose) | 참고 / 주의 | |

## Never translate

Latin script, verbatim, including mid-sentence in Korean.

- **Product names:** Mixpanel, Lexicon, Mixpanel Agent, Mixpanel MCP
- **SDK / platform names:** JavaScript, React Native, Android, iOS, Swift, Objective-C, Flutter, Python,
  Node.js, Ruby, Go, Java, Unity
- **Integration and brand names:** Segment, RudderStack, mParticle, Snowplow, Tealium, Freshpaint, Shopify,
  Stripe, Customer.io, LaunchDarkly, Langfuse, Amazon S3, Google Cloud Storage, Google Pub/Sub,
  Google Tag Manager, BigQuery, Snowflake, Databricks, Redshift
- **Reserved properties and wire values:** `$identify`, `$create_alias`, `$distinct_id`, `$anon_id`,
  `$identified_id`, `distinct_id`, `mp_*`, `token`
- **API and spec terms:** JQL, GDPR, MTU, SSO, SAML, OpenAPI, MCP, REST, JSON, YAML, CSV, SDK, API, URL,
  UUID, HTTP, endpoint paths (`/track`, `/import`, `/engage`)
- **Anything inside code fences or inline code**, without exception

## Pitfalls

**"Retention" is two different words.** The *Retention report* is 리텐션. A *data retention policy* is
데이터 보관 정책. A machine translator will collapse them. Check every occurrence in
`docs/privacy/`, `docs/data-governance/`, and `docs/pricing/`.

**"Property" is two different words.** The data-model concept is 속성. A JS object property in a code
explanation is also 속성 — fine. But `properties` as a literal JSON key stays `properties`.

**"Board" vs "Dashboard".** Mixpanel renamed Dashboards to Boards. Prefer 보드; use 대시보드 only where the
English source deliberately says "dashboard" (usually about a third-party tool).

**"Group" is two different words.** *Group Analytics* / group profile → 그룹. A UI "group" of settings →
그룹 too, but a *cohort* is never 그룹.

**"Users" is two different things.** The `Users` report/section → 사용자. A seat-licence "user" in billing
context → 사용자 계정, to avoid implying tracked end-users.

**Particles after Latin words.** Korean particles are chosen by the *final sound of the preceding word*.
After a Latin-script term, choose by how it is read aloud in Korean: `Mixpanel을`(믹스패널 → ㄹ받침),
`SDK를`(에스디케이 → vowel), `API를`, `Lexicon을`(렉시콘 → ㄴ받침), `event를`. Machine output gets this wrong
often; it is the highest-frequency thing a native reviewer should be scanning for.
