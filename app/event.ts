import fs from "node:fs";
import path from "node:path";
import current from "../content/current-event.json";

export type WorkshopEvent = {
  slug: string;
  title: string;
  displayTitle: string[];
  eyebrow: string;
  subtitle?: string;
  overview: string;
  startDate: string;
  endDate: string;
  status: string;
  venue: string;
  contact: string;
  organizers: string[];
  coOrganizers: string[];
  supporters: { name: string; logo?: string; englishName?: string }[];
  registrationFee: string;
  eligibility: string;
  schedule: { date: string; time: string; title: string; person: string; kind: string }[];
};

// Explicitly include this directory in Next.js output tracing (next.config.ts).
if (!/^[a-z0-9-]+$/.test(current.slug)) throw new Error("Invalid current event slug");
export const event: WorkshopEvent = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "content/events", `${current.slug}.json`), "utf8"),
);
if (event.slug !== current.slug || !event.title || !event.venue || !event.schedule.length) {
  throw new Error("Current event is missing required poster information");
}

export function dateParts(date: string) {
  const value = new Date(`${date}T00:00:00+09:00`);
  return {
    day: date.slice(8),
    month: new Intl.DateTimeFormat("en", { month: "short", timeZone: "Asia/Seoul" }).format(value).toUpperCase(),
    weekday: new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "Asia/Seoul" }).format(value).toUpperCase(),
    ko: new Intl.DateTimeFormat("ko", { weekday: "short", timeZone: "Asia/Seoul" }).format(value),
  };
}

export function formatDateRange(start: string, end: string) {
  const first = `${start.replaceAll("-", ". ")} (${dateParts(start).ko})`;
  if (start === end) return first;
  if (start.slice(0, 7) === end.slice(0, 7)) {
    return `${start.replaceAll("-", ". ")}–${end.slice(8)} (${dateParts(start).ko}–${dateParts(end).ko})`;
  }
  return `${first} – ${end.replaceAll("-", ". ")} (${dateParts(end).ko})`;
}

export const eventDays = [...new Set(event.schedule.map((item) => item.date))].sort().map((date) => ({
  date,
  ...dateParts(date),
  items: event.schedule.filter((item) => item.date === date),
}));
export const eventDateRange = formatDateRange(event.startDate, event.endDate);
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://econophysics-korea.vercel.app";
