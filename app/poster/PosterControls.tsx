"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function PosterControls() {
  const [overflow, setOverflow] = useState(false);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const sheet = document.querySelector<HTMLElement>("[data-poster-sheet]");
    if (!sheet) return;
    const measure = () => setOverflow(sheet.scrollHeight > 1047);
    const observer = new ResizeObserver(measure);
    observer.observe(sheet);
    void document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  // One delegated action handler covers every tagged print button on this page.
  useEffect(() => {
    const handleAction = async (click: MouseEvent) => {
      if (!(click.target instanceof Element)) return;
      const button = click.target.closest<HTMLButtonElement>('[data-action="print-poster"]');
      if (!button || button.disabled) return;
      setPrinting(true);
      try {
        await document.fonts.ready;
        await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined)));
        window.print();
      } finally {
        setPrinting(false);
      }
    };
    document.addEventListener("click", handleAction);
    return () => document.removeEventListener("click", handleAction);
  }, []);

  return (
    <div className="poster-controls">
      <div className="poster-toolbar">
        <Link href="/">← 행사 페이지</Link>
        <button type="button" data-action="print-poster" disabled={printing}>
          {printing ? "인쇄 준비 중…" : "인쇄 / PDF 저장"}
        </button>
      </div>
      <p>용지 A4 · 세로 · 배율 100% · 머리글과 바닥글 끄기. 인쇄 대상에서 ‘PDF로 저장’을 선택할 수 있습니다.</p>
      {overflow && <p role="status">내용이 A4 한 장을 넘습니다. 인쇄 미리보기에서 페이지 수를 확인해 주세요. 모든 일정은 이어서 출력됩니다.</p>}
    </div>
  );
}
