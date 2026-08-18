# 경제사회물리연구회

2026 여름 워크숍 행사 안내 사이트입니다.

## 환경 변수

`.env.example`을 참고해 다음 값을 Vercel에 등록합니다.

- `NEXT_PUBLIC_KAKAO_MAP_APP_KEY`: Kakao Developers의 JavaScript 키
- `NEXT_PUBLIC_SITE_URL`: 실제 배포 주소

Kakao Developers의 JavaScript SDK 도메인에는 로컬 주소와 실제 Vercel 도메인을 등록해야 합니다.

## 콘텐츠 수정

행사 정보는 `content/events/2026-summer-workshop.json`, 지도 연동은 `app/KakaoMap.tsx`에서 관리합니다.
