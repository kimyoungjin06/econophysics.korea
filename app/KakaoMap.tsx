"use client";

import { useEffect, useRef, useState } from "react";

declare global { interface Window { kakao?: any } }

// Kakao place 17559903: 포항공과대학교 무은재기념관.
const venue = { latitude: 36.0121207276346, longitude: 129.32233400387 };

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing-key" | "error">("loading");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
    if (!key || !mapRef.current) {
      setStatus("missing-key");
      return;
    }
    let disposed = false;
    let removeResizeListener: (() => void) | undefined;
    const timer = window.setTimeout(() => setStatus((current) => current === "loading" ? "error" : current), 10000);
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    script.async = true;
    script.onerror = () => { if (!disposed) setStatus("error"); };
    script.onload = () => {
      if (disposed) return;
      if (!window.kakao?.maps) {
        setStatus("error");
        return;
      }
      window.kakao.maps.load(() => {
        if (disposed || !mapRef.current) return;
        try {
          const kakao = window.kakao;
          const point = new kakao.maps.LatLng(venue.latitude, venue.longitude);
          const map = new kakao.maps.Map(mapRef.current, { center: point, level: 3 });
          const marker = new kakao.maps.Marker({ map, position: point });
          const info = new kakao.maps.InfoWindow({ content: '<div style="padding:8px 10px;font:600 13px sans-serif;white-space:nowrap">APCTP · 무은재기념관 512호 강의실</div>' });
          info.open(map, marker);
          kakao.maps.event.addListener(marker, "click", () => info.open(map, marker));
          const fitViewport = () => { map.relayout(); map.setCenter(point); };
          window.addEventListener("resize", fitViewport);
          removeResizeListener = () => window.removeEventListener("resize", fitViewport);
          window.clearTimeout(timer);
          setStatus("ready");
        } catch {
          setStatus("error");
        }
      });
    };
    document.head.appendChild(script);
    return () => { disposed = true; window.clearTimeout(timer); removeResizeListener?.(); script.remove(); };
  }, []);

  return <>
    <div className="map-wrap">
      <div ref={mapRef} className="map-canvas" role="img" aria-label="포스텍 무은재기념관 APCTP 위치 지도" />
      {status !== "ready" ? <div className="map-fallback"><div className="map-copy"><small>KAKAO MAP</small><strong>APCTP (포스텍 무은재기념관) 512호 강의실</strong><p>{status === "loading" ? "지도를 불러오는 중입니다." : "지도를 불러오지 못했습니다. 아래 카카오맵 링크를 이용해 주세요."}</p></div></div> : null}
    </div>
    <nav className="map-links" aria-label="카카오맵 바로가기">
      <a href="https://place.map.kakao.com/17559903" target="_blank" rel="noreferrer"><span>01</span> 무은재기념관 위치 ↗</a>
      <a href="https://map.kakao.com/link/to/17559903" target="_blank" rel="noreferrer"><span>02</span> 무은재기념관 길찾기 ↗</a>
    </nav>
  </>;
}
