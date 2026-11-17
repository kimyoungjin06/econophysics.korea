import type { Metadata } from "next";
import { event, eventDateRange, eventDays, siteUrl } from "../event";
import { PosterControls } from "./PosterControls";
import "./poster.css";

export const metadata: Metadata = {
  title: `${event.title} | 포스터`,
  description: `${eventDateRange} · ${event.venue} · 행사 포스터`,
};

export default function PosterPage() {
  return (
    <main className="poster-preview">
      <PosterControls />
      <div className="poster-viewport">
        <article className={`poster-sheet${event.schedule.length > 9 ? " poster-compact" : ""}`} data-poster-sheet data-event={event.slug} aria-label={`${event.title} 포스터`}>
          <header className="poster-heading">
            <p className="poster-label">ECONOPHYSICS KOREA</p>
            <p className="poster-group">경제사회물리연구회</p>
            <h1>{event.displayTitle.map((line, index) => <span key={index}>{line}</span>)}</h1>
            {event.subtitle && <p className="poster-subtitle">{event.subtitle}</p>}
          </header>
          <dl className="poster-details">
            <div><dt>일시</dt><dd>{eventDateRange}</dd></div>
            <div><dt>장소</dt><dd>{event.venue}</dd></div>
          </dl>
          <section className="poster-program" aria-labelledby="poster-program-title">
            <h2 id="poster-program-title">PROGRAM <span>프로그램</span></h2>
            {eventDays.map((day) => <section className="poster-day" key={day.date} aria-label={`${day.date} 일정`}>
              <h3><time dateTime={day.date}>{day.date.slice(5).replace("-", ". ")} ({day.ko})</time></h3>
              {day.items.map((item) => <div className="poster-row" key={`${item.time}-${item.title}`}>
                <p className="poster-time">{item.time}</p>
                <div><h4>{item.title}</h4>{item.person && <p>{item.person}</p>}</div>
              </div>)}
            </section>)}
          </section>
          <footer className="poster-footer">
            <dl>
              <div><dt>주최</dt><dd>{event.organizers.join(" · ")}</dd></div>
              {event.coOrganizers.length > 0 && <div><dt>공동 주관</dt><dd>{event.coOrganizers.join(" · ")}</dd></div>}
              {event.supporters.length > 0 && <div><dt>후원</dt><dd>{event.supporters.map((supporter) => <span key={supporter.name}>
                {/* Local institution logos retain their original aspect ratio in print. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {supporter.logo ? <img src={supporter.logo} alt={supporter.name} /> : supporter.name}
              </span>)}</dd></div>}
            </dl>
            <div className="poster-source"><a href={siteUrl}>{siteUrl.replace(/\/$/, "")}</a><a href={`mailto:${event.contact}`}>{event.contact}</a></div>
          </footer>
        </article>
      </div>
    </main>
  );
}
