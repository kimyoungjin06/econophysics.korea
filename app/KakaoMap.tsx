"use client";

import { useEffect, useRef, useState } from "react";

declare global { interface Window { kakao?: any } }

const places = [
  { label: "부산대역", query: "부산대역", marker: "1" },
  { label: "부산대학교 제2물리관", query: "부산대학교 제2물리관", marker: "2" },
  { label: "효원주가", query: "부산 효원주가", marker: "3" },
];

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
    if (!key || !mapRef.current) return;
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => window.kakao?.maps.load(() => {
      const kakao = window.kakao;
      if (!kakao || !mapRef.current) return;
      const map = new kakao.maps.Map(mapRef.current, { center: new kakao.maps.LatLng(35.233, 129.082), level: 4 });
      const service = new kakao.maps.services.Places();
      const bounds = new kakao.maps.LatLngBounds();
      const path: any[] = new Array(places.length);
      let done = 0;
      places.forEach((place, index) => service.keywordSearch(place.query, (result: any[], status: string) => {
        done += 1;
        if (status === kakao.maps.services.Status.OK && result[0]) {
          const point = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
          path[index] = point; bounds.extend(point);
          const marker = new kakao.maps.Marker({ map, position: point });
          const info = new kakao.maps.InfoWindow({ content: `<div style="padding:8px 10px;font:600 13px sans-serif;white-space:nowrap">${place.marker}. ${place.label}</div>` });
          kakao.maps.event.addListener(marker, "click", () => info.open(map, marker));
        }
        if (done === places.length) {
          const validPath = path.filter(Boolean);
          if (validPath.length > 1) new kakao.maps.Polyline({ map, path: validPath, strokeWeight: 4, strokeColor: "#F3C623", strokeOpacity: .95, strokeStyle: "solid" });
          if (validPath.length) map.setBounds(bounds, 60, 60, 60, 60);
          setLoaded(true);
        }
      }));
    });
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return <div className="map-wrap">
    <div ref={mapRef} className="map-canvas" aria-label="부산대학교 제2물리관과 이동 동선 지도" />
    {!loaded && <div className="map-fallback"><div className="route-line" /><span className="pin a">A</span><span className="pin b">B</span><span className="pin c">C</span><div className="map-copy"><small>KAKAO MAP</small><strong>부산대학교 제2물리관 106호</strong><p>지도는 카카오 API 키 연결 후 표시됩니다.</p><a href="https://map.kakao.com/?q=%EB%B6%80%EC%82%B0%EB%8C%80%ED%95%99%EA%B5%90%20%EC%A0%9C2%EB%AC%BC%EB%A6%AC%EA%B4%80" target="_blank" rel="noreferrer">카카오맵에서 열기 ↗</a></div></div>}
  </div>;
}
