"use client";

import { useEffect, useRef, useState } from "react";

declare global { interface Window { kakao?: any } }

const places = [{ label: "포항 APCTP", query: "포스텍 무은재기념관", marker: "1" }];

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing-key" | "error">("loading");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
    if (!key || !mapRef.current) {
      setStatus("missing-key");
      return;
    }
    const timer = window.setTimeout(() => setStatus((current) => current === "loading" ? "error" : current), 10000);
    let removeResizeListener: (() => void) | undefined;
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.async = true;
    script.onerror = () => setStatus("error");
    script.onload = () => {
      if (!window.kakao?.maps) {
        setStatus("error");
        return;
      }
      window.kakao.maps.load(() => {
      const kakao = window.kakao;
      if (!kakao || !mapRef.current) return;
      const map = new kakao.maps.Map(mapRef.current, { center: new kakao.maps.LatLng(35.233, 129.082), level: 4 });
      const service = new kakao.maps.services.Places();
      const bounds = new kakao.maps.LatLngBounds();
      let done = 0;
      places.forEach((place) => service.keywordSearch(place.query, (result: any[], status: string) => {
        done += 1;
        if (status === kakao.maps.services.Status.OK && result[0]) {
          const point = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
          bounds.extend(point);
          const marker = new kakao.maps.Marker({ map, position: point });
          const info = new kakao.maps.InfoWindow({ content: `<div style="padding:8px 10px;font:600 13px sans-serif;white-space:nowrap">${place.marker}. ${place.label}</div>` });
          kakao.maps.event.addListener(marker, "click", () => info.open(map, marker));
        }
        if (done === places.length) {
          if (!bounds.isEmpty()) {
            const fitViewport = () => {
              const mobile = window.matchMedia("(max-width: 760px)").matches;
              map.relayout();
              map.setBounds(bounds, mobile ? 24 : 56, mobile ? 20 : 56, mobile ? 24 : 56, mobile ? 20 : 56);
            };
            window.requestAnimationFrame(fitViewport);
            window.addEventListener("resize", fitViewport);
            removeResizeListener = () => window.removeEventListener("resize", fitViewport);
          }
          setStatus(!bounds.isEmpty() ? "ready" : "error");
        }
      }));
      });
    };
    document.head.appendChild(script);
    return () => { window.clearTimeout(timer); removeResizeListener?.(); script.remove(); };
  }, []);

  return <>
    <div className="map-wrap">
      <div ref={mapRef} className="map-canvas" role="img" aria-label="포스텍 무은재기념관 APCTP 위치 지도" />
      {status !== "ready" ? <div className="map-fallback"><div className="map-copy"><small>KAKAO MAP</small><strong>APCTP (포스텍 무은재기념관) 512호 강의실</strong><p>{status === "loading" ? "지도를 불러오는 중입니다." : "지도를 불러오지 못했습니다. 아래 카카오맵 링크를 이용해 주세요."}</p></div></div> : null}
    </div>
    <nav className="map-links" aria-label="카카오맵 바로가기">
      <a href="https://map.kakao.com/?q=%ED%8F%AC%EC%8A%A4%ED%85%8D%20%EB%AC%B4%EC%9D%80%EC%9E%AC%EA%B8%B0%EB%85%90%EA%B4%80" target="_blank" rel="noreferrer"><span>01</span> 무은재기념관 위치 ↗</a>
    </nav>
  </>;
}
