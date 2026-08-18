import { KakaoMap } from "./KakaoMap";
import event from "../content/events/2026-summer-workshop.json";

const dayOne = event.schedule.filter((item) => item.date === "2026-08-21");
const dayTwo = event.schedule.filter((item) => item.date === "2026-08-22");

export default function Home() {
  return (
    <main id="main-content">
      <a className="skip-link" href="#program">프로그램으로 바로가기</a>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="주요 메뉴">
          <a className="brand" href="#top"><span>경사연</span><b>경제사회물리연구회</b></a>
          <div><a href="#program">프로그램</a><a href="#location">오시는 길</a><a href="/about">연구회 소개</a></div>
        </nav>
        <div className="hero-body shell">
          <p className="eyebrow">ECONOPHYSICS KOREA · SUMMER WORKSHOP 2026</p>
          <h1>2026 여름<br />워크숍</h1>
          <p className="hero-description">경제·금융·사회 현상을 주제로 연구 결과와 분석 방법을 공유하고<br />향후 연구 방향과 협업 주제를 논의합니다.</p>
          <div className="hero-meta">
            <div><small>DATE</small><strong>2026. 08. 21—22</strong></div>
            <div><small>VENUE</small><strong>부산대학교 제2물리관 106호</strong></div>
            <div><small>PARTICIPANTS</small><strong>30명+</strong></div>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="#program">프로그램 확인 <span>↓</span></a>
            <a className="button ghost" href="#location">오시는 길</a>
          </div>
        </div>
      </section>

      <section className="intro shell" id="overview">
        <div><p className="section-no">01 / OVERVIEW</p><h2>워크숍 개요</h2></div>
        <div className="intro-copy">
          <p>경제·금융·사회 현상에 관한 최신 연구와 분석 방법을 공유합니다. 발표 이후에는 연구회의 운영 방향과 공동 연구 주제를 논의합니다.</p>
          <div className="participation-status">
            <span>참가 신청 마감</span>
            <strong>참석 예정 30명+</strong>
          </div>
          <p className="history-note"><b>SINCE 2011</b><span>2011년 2월 첫 기록부터 이어온 27번째 모임</span><a href="/about">연구회 소개 →</a></p>
        </div>
      </section>

      <section className="program" id="program">
        <div className="shell">
          <header className="section-head"><div><p className="section-no">02 / PROGRAM</p><h2>프로그램</h2></div><span className="status">{event.status}</span></header>
          <div className="day-block">
            <div className="day-label"><strong>21</strong><span>AUG<br />FRI</span></div>
            <div className="schedule">
              {dayOne.map((item) => <article className="schedule-row" key={item.time}>
                <time>{item.time}</time><div><h3>{item.title}</h3><p>{item.person}</p></div><span className="tag">{item.kind}</span>
              </article>)}
            </div>
          </div>
          <div className="day-block second-day">
            <div className="day-label"><strong>22</strong><span>AUG<br />SAT</span></div>
            <div className="schedule">{dayTwo.map((item) => <article className="schedule-row" key={item.time}><time>{item.time}</time><div><h3>{item.title}</h3><p>{item.person}</p></div><span className="tag">{item.kind}</span></article>)}</div>
          </div>
        </div>
      </section>

      <section className="location shell" id="location">
        <header className="section-head"><div><p className="section-no">03 / LOCATION</p><h2>오시는 길</h2></div></header>
        <KakaoMap />
        <div className="route-grid">
          <article><span className="route-index">STEP 1</span><h3>부산대역</h3><p>인근 정류장에서 마을버스 <b>금정구7</b> 탑승</p></article>
          <article><span className="route-index">STEP 2</span><h3>부산대문창회관 정류장</h3><p>6개 정류장 · 약 8분 이동</p></article>
          <article><span className="route-index">STEP 3</span><h3>제2물리관 106호</h3><p>정류장에서 도보 약 2분 · 제1물리관과 실내 연결</p></article>
        </div>
      </section>

      <section className="notices" id="notices">
        <div className="shell notice-grid">
          <article><span>DINNER</span><h3>효원주가</h3><p>8월 21일 공식 일정 후 이동 · 제2물리관에서 약 600m · 도보 약 10분</p><a href="https://map.kakao.com/?q=%ED%9A%A8%EC%9B%90%EC%A3%BC%EA%B0%80" target="_blank" rel="noreferrer">카카오맵에서 보기 ↗</a></article>
          <article><span>PARKING</span><h3>주차 안내</h3><p>교내 주차 공간이 협소하며, 할인 적용 후에도 주차 요금 부담이 있을 수 있습니다. 가급적 대중교통을 이용해 주세요. 차량 이용 시 행사 당일 운영진에게 주차 할인권을 문의해 주세요.</p></article>
          <article><span>STAY</span><h3>숙박 안내</h3><p>금번 모임에서는 별도의 숙소를 지원하지 않습니다. 숙박이 필요한 참가자께서는 개별적으로 예약해 주세요.</p></article>
        </div>
      </section>

      <section className="partners" aria-labelledby="partners-title">
        <div className="shell partners-inner">
          <div><p className="section-no">04 / ORGANIZERS</p><h2 id="partners-title">함께하는 기관</h2></div>
          <dl className="partner-list">
            <div><dt>주최</dt><dd>경제사회물리연구회</dd></div>
            <div><dt>공동 주관</dt><dd>전남대학교 데이터사이언스대학원<br />부산대학교 물리학과</dd></div>
            <div><dt>후원</dt><dd>아시아태평양 이론물리센터 <span>APCTP</span></dd></div>
          </dl>
        </div>
      </section>

      <footer><div className="shell footer-inner"><div><span className="footer-mark">경사연</span><p>경제사회물리연구회<br /><a href="mailto:econophysics.korea@gmail.com">econophysics.korea@gmail.com</a></p></div><div className="footer-links"><a href="/about">연구회 소개</a><a href="#top">맨 위로 ↑</a><a href="https://sites.google.com/view/econophysics/" target="_blank" rel="noreferrer">기존 Google Sites 보기 ↗</a></div></div></footer>
      <nav className="mobile-quick-nav" aria-label="모바일 빠른 메뉴"><a href="#program">일정</a><a href="#location">길찾기</a><a href="#notices">현장 안내</a></nav>
    </main>
  );
}
