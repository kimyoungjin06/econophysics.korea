export default function AboutPage() {
  return (
    <main className="under-construction">
      <nav className="nav shell" aria-label="주요 메뉴">
        <a className="brand" href="/"><span>경사연</span><b>경제사회물리연구회</b></a>
        <div><a href="/">2026 여름 워크숍</a><a href="https://sites.google.com/view/econophysics/" target="_blank" rel="noreferrer">기존 사이트 ↗</a></div>
      </nav>
      <section className="construction-body shell">
        <p className="eyebrow">ABOUT ECONOPHYSICS KOREA</p>
        <div className="construction-grid">
          <div>
            <p className="construction-mark" aria-hidden="true">뚝<br />딱</p>
          </div>
          <div>
            <p className="construction-kicker">SINCE FEBRUARY 2011 · 27TH RECORDED GATHERING</p>
            <h1>공사 중입니다.<br /><span>뚝딱뚝딱…</span></h1>
            <p className="construction-copy">경제사회물리연구회의 소개와 지난 모임 기록을 정리하고 있습니다. 조금만 기다려 주세요.</p>
            <div className="construction-actions"><a className="button primary" href="/">워크숍 페이지로 돌아가기</a><a className="button ghost" href="https://sites.google.com/view/econophysics/" target="_blank" rel="noreferrer">기존 기록 보기 ↗</a></div>
          </div>
        </div>
      </section>
      <footer className="construction-footer"><div className="shell"><span>2011년 2월, 포항공대</span><strong>기록으로 확인되는 첫 모임</strong></div></footer>
    </main>
  );
}
