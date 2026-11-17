# 경제사회물리연구회

2026 가을 워크숍 행사 안내 사이트입니다.

## 환경 변수

`.env.example`을 참고해 다음 값을 Vercel에 등록합니다.

- `NEXT_PUBLIC_KAKAO_MAP_APP_KEY`: Kakao Developers의 JavaScript 키
- `NEXT_PUBLIC_SITE_URL`: 실제 배포 주소

Kakao Developers의 JavaScript SDK 도메인에는 로컬 주소와 실제 Vercel 도메인을 등록해야 합니다.

## 콘텐츠 수정

현재 행사는 `content/current-event.json`의 `slug`로 선택합니다. 행사 정보는 `content/events/<slug>.json`, 지도 연동은 `app/KakaoMap.tsx`에서 관리합니다.

이전 여름 워크숍 데이터는 `content/events/2026-summer-workshop.json`에 보관합니다. 현재 참가 신청 안내는 사전 신청 마감 및 이메일 문의로 표시합니다.

## 자동 포스터

홈페이지의 `data-action="print-poster"` 링크는 `/poster` 미리보기를 엽니다. 미리보기의 같은 태그를 가진 버튼은 공통 클릭 처리기에서 인쇄를 실행합니다. 링크는 자바스크립트가 없어도 열리며, 브라우저 기본 인쇄도 사용할 수 있습니다.

다음 행사에는 현재 가을 행사 JSON을 복사해 새 파일을 만들고 `current-event.json`의 `slug`를 바꾼 뒤 빌드·배포합니다. `WorkshopEvent` 형식은 `app/event.ts`에 정의되어 있습니다. 행사명(`title`, `displayTitle`), 부제(`subtitle`, 생략 가능), 날짜, 장소, 일정, 문의처, 주최·공동 주관·후원 정보를 갱신하면 홈페이지와 포스터에 함께 반영됩니다. `displayTitle`은 줄별 문자열 배열입니다. 일정의 `date`는 `YYYY-MM-DD`, `time`은 `13:20—14:50` 형식을 사용합니다. 일정은 날짜별로 자동 구분하며 하루·여러 날 행사 모두 지원합니다.

포스터는 A4 세로 인쇄용입니다. 브라우저 인쇄에서 PDF로 저장할 수 있습니다. 긴 프로그램은 압축 간격을 적용하며 한 장을 넘으면 화면에 안내합니다. 초과 내용을 잘라내지 않고 다음 페이지로 이어서 인쇄합니다. 인쇄 배율은 100%, 머리글·바닥글은 끄는 것을 권장합니다. 홈페이지의 신청 안내·오시는 길·지도는 다음 행사에 맞게 별도 확인해야 합니다.
