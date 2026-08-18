"use client";

import { useEffect, useRef, useState } from "react";

declare global { interface Window { kakao?: any } }

const places = [
  { label: "부산대문창회관 정류장", query: "부산대문창회관 정류장", marker: "1" },
  { label: "부산대학교 제2물리관", query: "부산대학교 제2물리관", marker: "2" },
  { label: "효원주가", query: "부산 효원주가", marker: "3" },
];

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
      <div ref={mapRef} className="map-canvas" role="img" aria-label="부산대문창회관 정류장, 부산대학교 제2물리관, 효원주가 위치 지도" />
      {status !== "ready" ? <div className="map-fallback"><div className="map-copy"><small>KAKAO MAP</small><strong>부산대학교 제2물리관 106호</strong><p>{status === "loading" ? "지도를 불러오는 중입니다." : "지도를 불러오지 못했습니다. 아래 카카오맵 링크를 이용해 주세요."}</p></div></div> : null}
    </div>
    <nav className="map-links" aria-label="카카오맵 바로가기">
      <a href="https://map.kakao.com/?q=%EB%B6%80%EC%82%B0%EB%8C%80%EC%97%AD" target="_blank" rel="noreferrer"><span>01</span> 부산대역 위치</a>
      <a href="https://map.kakao.com/?q=%EB%B6%80%EC%82%B0%EB%8C%80%ED%95%99%EA%B5%90%20%EC%A0%9C2%EB%AC%BC%EB%A6%AC%EA%B4%80" target="_blank" rel="noreferrer"><span>02</span> 행사장 위치</a>
      <a href="https://map.kakao.com/?q=%ED%9A%A8%EC%9B%90%EC%A3%BC%EA%B0%80" target="_blank" rel="noreferrer"><span>03</span> 저녁 장소</a>
    </nav>
  </>;
}
