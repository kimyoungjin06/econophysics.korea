import Image from "next/image";
import { KakaoMap } from "./KakaoMap";
import event from "../content/events/2026-autumn-workshop.json";

const registrationUrl: string | null = event.registrationUrl;
const registrationDeadline: string | null = event.registrationDeadline;

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
          <p className="eyebrow">ECONOPHYSICS KOREA · AUTUMN WORKSHOP 2026</p>
          <h1>2026 가을<br />워크숍</h1>
          <p className="hero-description">경제·금융·사회 현상을 주제로 연구 결과와 분석 방법을 공유하고<br />향후 연구 방향과 협업 주제를 논의합니다.</p>
          <div className="hero-meta">
            <div><small>DATE</small><strong>2026. 11. 13 (금)</strong></div>
            <div><small>VENUE</small><strong>{event.venue}</strong></div>
            <div><small>TIME</small><strong>13:15—17:00</strong></div>
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
          <p>11월 13일 금요일, 포항 APCTP에서 경제사회물리연구회 워크숍을 개최합니다. 한양대학교 문준영 교수님과 경상국립대학교 물리학과 이상훈 교수님을 모시고 연구와 아이디어를 나눕니다.</p>
          <div className="participation-status">
            <span>{registrationUrl ? "참가 신청 접수" : "참가 신청 준비 중"}</span>
            {registrationUrl ? <a href={registrationUrl} target="_blank" rel="noreferrer">Google Forms에서 신청 ↗</a> : <strong>Google Forms 추후 공개</strong>}
          </div>
          <p className="history-note"><b>SINCE 2011</b><span>2011년부터 이어 온 경제사회물리연구회의 모임입니다.</span><a href="/about">연구회 소개 →</a></p>
        </div>
      </section>

      <section className="program" id="program">
        <div className="shell">
          <header className="section-head"><div><p className="section-no">02 / PROGRAM</p><h2>프로그램</h2></div><span className="status">{event.status}</span></header>
          <div className="day-block">
            <div className="day-label"><strong>13</strong><span>NOV<br />FRI</span></div>
            <div className="schedule">
              {event.schedule.map((item) => <article className="schedule-row" key={item.time}>
                <time>{item.time}</time><div><h3>{item.title}</h3>{item.person ? <p>{item.person}</p> : null}{item.abstract ? <p>초록: {item.abstract}</p> : null}</div><span className="tag">{item.kind}</span>
              </article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="location shell" id="location">
        <header className="section-head"><div><p className="section-no">03 / LOCATION</p><h2>오시는 길</h2></div></header>
        <KakaoMap />
        <div className="route-grid">
          <article><span className="route-index">VENUE</span><h3>포항 APCTP</h3><p>아시아태평양이론물리센터에서 진행합니다.</p></article>
          <article><span className="route-index">ROOM</span><h3>512호</h3><p>워크숍은 APCTP 512호에서 진행합니다.</p></article>
          <article><span className="route-index">ARRIVAL</span><h3>13:15 개회</h3><p>첫 발표는 13:20에 시작합니다.</p></article>
        </div>
      </section>

      <section className="notices" id="notices">
        <div className="shell notice-grid">
          <article><span>REGISTRATION</span><h3>참가 신청</h3><p>{registrationUrl ? "아래 Google Forms에서 참가 신청을 해 주세요." : "Google Forms로 참가 신청을 받을 예정입니다. 신청 링크는 추후 공개합니다."}</p><p>{registrationDeadline ? `신청 마감: ${registrationDeadline}` : "신청 마감일 추후 안내"}</p>{registrationUrl ? <a href={registrationUrl} target="_blank" rel="noreferrer">참가 신청 ↗</a> : null}</article>
          <article><span>PARTICIPATION</span><h3>참가 안내</h3><p>참가비 {event.registrationFee} · {event.eligibility}</p><p>관심 있는 분 누구나 참여하실 수 있습니다.</p></article>
          <article><span>CONTACT</span><h3>행사 문의</h3><p>행사 관련 문의는 연구회 이메일로 보내 주세요.</p><a href="mailto:econophysics.korea@gmail.com">econophysics.korea@gmail.com</a></article>
        </div>
      </section>

      <section className="partners" aria-labelledby="partners-title">
        <div className="shell partners-inner">
          <div><p className="section-no">04 / ORGANIZERS</p><h2 id="partners-title">주최·주관<br />및 후원</h2><p className="partners-copy">이번 워크숍을 함께 준비하고 지원하는 기관입니다.</p></div>
          <dl className="partner-list">
            <div><dt>주최</dt><dd>경제사회물리연구회</dd></div>
            <div><dt>공동 주관</dt><dd>전남대학교 데이터사이언스대학원<br />부산대학교 물리학과</dd></div>
            <div className="supporter-row"><dt>후원</dt><dd><Image src="/apctp-logo.svg" width={319} height={40} alt="아시아태평양이론물리센터 APCTP" /><span>Asia Pacific Center for Theoretical Physics</span></dd></div>
          </dl>
        </div>
      </section>

      <footer><div className="shell footer-inner"><div><span className="footer-mark">경사연</span><p>경제사회물리연구회<br /><a href="mailto:econophysics.korea@gmail.com">econophysics.korea@gmail.com</a></p></div><div className="footer-links"><a href="/about">연구회 소개</a><a href="#top">맨 위로 ↑</a><a href="https://sites.google.com/view/econophysics/" target="_blank" rel="noreferrer">기존 Google Sites 보기 ↗</a></div></div></footer>
      <nav className="mobile-quick-nav" aria-label="모바일 빠른 메뉴"><a href="#program">일정</a><a href="#location">길찾기</a><a href="#notices">현장 안내</a></nav>
    </main>
  );
}
