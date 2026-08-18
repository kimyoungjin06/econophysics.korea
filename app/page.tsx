import { KakaoMap } from "./KakaoMap";
import event from "../content/events/2026-summer-workshop.json";

const dayOne = event.schedule.filter((item) => item.date === "2026-08-21");
const dayTwo = event.schedule.filter((item) => item.date === "2026-08-22");

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="network" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => <i key={i} />)}
        </div>
        <nav className="nav shell" aria-label="주요 메뉴">
          <a className="brand" href="#top"><span>경사연</span><b>경제사회물리연구회</b></a>
          <div><a href="#program">프로그램</a><a href="#location">오시는 길</a></div>
        </nav>
        <div className="hero-body shell">
          <p className="eyebrow">ECONOPHYSICS KOREA · SUMMER WORKSHOP 2026</p>
          <h1>경제와 사회를<br />복잡계의 언어로.</h1>
          <div className="hero-meta">
            <div><small>DATE</small><strong>2026. 08. 21—22</strong></div>
            <div><small>VENUE</small><strong>부산대학교 제2물리관 106호</strong></div>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="#registration">참가 안내 보기 <span>↗</span></a>
            <a className="button ghost" href="#location">오시는 길</a>
          </div>
        </div>
        <div className="ticker" aria-hidden="true"><span>DATA · NETWORKS · FINANCE · SOCIETY · COMPLEX SYSTEMS · COLLABORATION · </span></div>
      </section>

      <section className="intro shell" id="registration">
        <div><p className="section-no">01 / INVITATION</p><h2>여름의 부산에서<br />나누는 새로운 관점</h2></div>
        <div className="intro-copy">
          <p>경제·금융·사회 현상을 바라보는 새로운 방법론과 공동 연구의 가능성 · 2026년 여름 · 부산대학교</p>
          <p>원활한 행사와 식사 준비를 위한 사전 참가 조사</p>
          <a className="text-link disabled" aria-disabled="true">참가 조사 링크 · 추후 공개</a>
        </div>
      </section>

      <section className="program" id="program">
        <div className="shell">
          <header className="section-head"><div><p className="section-no">02 / PROGRAM</p><h2>프로그램</h2></div><span className="status">잠정 일정</span></header>
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

      <section className="notices">
        <div className="shell notice-grid">
          <article><span>DINNER</span><h3>효원주가</h3><p>8월 21일 공식 일정 후 이동 · 제2물리관에서 약 600m · 도보 약 10분</p><a href="https://map.kakao.com/?q=%ED%9A%A8%EC%9B%90%EC%A3%BC%EA%B0%80" target="_blank" rel="noreferrer">카카오맵에서 보기 ↗</a></article>
          <article><span>PARKING</span><h3>대중교통 이용 권장</h3><p>협소한 교내 주차 공간 · 할인 적용 후에도 비교적 높은 주차비<br />차량 이용 시 당일 운영진에게 할인권 문의</p></article>
          <article><span>STAY</span><h3>개별 숙소 예약</h3><p>금번 모임은 별도 숙소 지원 없음 · 숙박이 필요한 경우 개별 예약</p></article>
        </div>
      </section>

      <footer><div className="shell footer-inner"><div><span className="footer-mark">경사연</span><p>경제사회물리연구회<br />econophysics.korea@gmail.com</p></div><div className="footer-links"><a href="#top">맨 위로 ↑</a><a href="https://sites.google.com/view/econophysics/" target="_blank" rel="noreferrer">기존 Google Sites 보기 ↗</a></div></div></footer>
    </main>
  );
}
