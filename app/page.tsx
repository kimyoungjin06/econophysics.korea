import Image from "next/image";
import { KakaoMap } from "./KakaoMap";
import { event, eventDateRange, eventDays } from "./event";

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
          <p className="eyebrow">{event.eyebrow}</p>
          <h1>{event.displayTitle.map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}</h1>
          {event.subtitle && <p className="hero-subtitle">{event.subtitle}</p>}
          <p className="hero-description">경제사회물리연구회는 물리학의 관점과 방법으로<br />경제와 사회의 다양한 현상을 연구합니다.</p>
          <div className="hero-meta">
            <div><small>DATE</small><strong>{eventDateRange}</strong></div>
            <div><small>VENUE</small><strong>{event.venue}</strong></div>
            <div><small>TIME</small><strong>{eventDays.map((day) => <span key={day.date} style={{ display: "block" }}>{day.ko} {day.items[0].time.split("—")[0]}—{day.items.at(-1)!.time.split("—").filter(Boolean).at(-1)}</span>)}</strong></div>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="#program">프로그램 확인 <span>↓</span></a>
            <a className="button ghost" href="#location">오시는 길</a>
            <a className="button ghost" href="/poster" data-action="print-poster">포스터 출력</a>
          </div>
        </div>
      </section>

      <section className="intro shell" id="overview">
        <div><p className="section-no">01 / OVERVIEW</p><h2>워크숍 개요</h2></div>
        <div className="intro-copy">
          <p>{event.overview}</p>
          <div className="participation-status">
            <span>사전 참가 신청 마감</span>
            <a href={`mailto:${event.contact}`}>참가 신청은 이메일로 문의해 주세요 ↗</a>
          </div>
          <p className="history-note"><b>SINCE 2011</b><span>경제사회물리연구회는 2011년 2월에 시작했습니다.</span><a href="/about">연구회 소개 →</a></p>
        </div>
      </section>

      <section className="program" id="program">
        <div className="shell">
          <header className="section-head"><div><p className="section-no">02 / PROGRAM</p><h2>프로그램</h2></div><span className="status">{event.status}</span></header>
          {eventDays.map((day, index) => <div className={index === 0 ? "day-block" : "day-block second-day"} key={day.date}>
            <div className="day-label"><strong>{day.day}</strong><span>{day.month}<br />{day.weekday}</span></div>
            <div className="schedule">
              {day.items.map((item) => <article className="schedule-row" key={item.time}>
                <time>{item.time}</time><div><h3>{item.title}</h3>{item.person ? <p>{item.person}</p> : null}</div><span className="tag">{item.kind}</span>
              </article>)}
            </div>
          </div>)}
        </div>
      </section>

      <section className="location shell" id="location">
        <header className="section-head"><div><p className="section-no">03 / LOCATION</p><h2>오시는 길</h2></div></header>
        <KakaoMap />
        <div className="route-grid">
          <article><span className="route-index">VENUE</span><h3>APCTP</h3><p>포항 포스텍 무은재기념관</p></article>
          <article><span className="route-index">ROOM</span><h3>512호 강의실</h3><p>포스텍 무은재기념관에 위치해 있습니다.</p></article>
          <article><span className="route-index">ARRIVAL</span><h3>13:15 개회</h3><p>첫 발표는 13:20에 시작합니다.</p></article>
        </div>
      </section>

      <section className="notices" id="notices">
        <div className="shell notice-grid">
          <article><span>REGISTRATION</span><h3>참가 신청</h3><p>이메일로 안내한 Google Forms 사전 참가 신청은 마감되었습니다. 참가 신청은 연구회 이메일로 문의해 주세요.</p><a href={`mailto:${event.contact}`}>{event.contact}</a></article>
          <article><span>PARTICIPATION</span><h3>참가 안내</h3><p>참가비 {event.registrationFee} · {event.eligibility}</p><p>관심 있는 분 누구나 참여하실 수 있습니다.</p></article>
          <article><span>CONTACT</span><h3>행사 문의</h3><p>행사 관련 문의는 연구회 이메일로 보내 주세요.</p><a href={`mailto:${event.contact}`}>{event.contact}</a></article>
        </div>
      </section>

      <section className="partners" aria-labelledby="partners-title">
        <div className="shell partners-inner">
          <div><p className="section-no">04 / ORGANIZERS</p><h2 id="partners-title">주최·주관<br />및 후원</h2></div>
          <dl className="partner-list">
            <div><dt>주최</dt><dd>{event.organizers.join(" · ")}</dd></div>
            <div><dt>공동 주관</dt><dd>{event.coOrganizers.map((name, index) => <span key={name}>{index > 0 && <br />}{name}</span>)}</dd></div>
            {event.supporters.map((supporter) => <div className="supporter-row" key={supporter.name}><dt>후원</dt><dd>{supporter.logo ? <Image src={supporter.logo} width={319} height={40} alt={supporter.name} /> : supporter.name}{supporter.englishName && <span>{supporter.englishName}</span>}</dd></div>)}
          </dl>
        </div>
      </section>

      <footer><div className="shell footer-inner"><div><span className="footer-mark">경사연</span><p>경제사회물리연구회<br /><a href={`mailto:${event.contact}`}>{event.contact}</a></p></div><div className="footer-links"><a href="/about">연구회 소개</a><a href="#top">맨 위로 ↑</a><a href="https://sites.google.com/view/econophysics/" target="_blank" rel="noreferrer">기존 Google Sites 보기 ↗</a></div></div></footer>
      <nav className="mobile-quick-nav" aria-label="모바일 빠른 메뉴"><a href="#program">일정</a><a href="#location">길찾기</a><a href="#notices">현장 안내</a></nav>
    </main>
  );
}
