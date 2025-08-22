import React, { useEffect, useRef } from "react";

// window 객체에 naver 네임스페이스가 있음을 TypeScript에 알려줍니다.
declare global {
  interface Window {
    naver: any;
  }
}

// props로 받을 데이터 타입을 정의합니다.
type Center = {
  name: string;
  lat: number;
  lng: number;
};

type NaverMapProps = {
  data: Center[];
  center?: { lat: number; lng: number };
  zoom?: number;
};

const NaverMap: React.FC<NaverMapProps> = ({ data, center, zoom }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    // naver.maps 객체가 로드될 때까지 기다립니다.
    const tryInitializeMap = () => {
      if (!window.naver?.maps || !mapElement.current) {
        setTimeout(tryInitializeMap, 100);
        return;
      }

      const mapOptions = {
        center: new window.naver.maps.LatLng(
          center?.lat || 36.3504,
          center?.lng || 127.3845
        ),
        zoom: zoom || 7,
      };

      const map = new window.naver.maps.Map(mapElement.current, mapOptions);
      mapInstanceRef.current = map;

      // 데이터 배열을 순회하며 마커 생성
      data.forEach((center) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(center.lat, center.lng),
          map: map,
        });

        // 마커에 정보창(InfoWindow) 추가
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:10px; font-size:14px;"><b>${center.name}</b></div>`,
        });

        // 마커 클릭 시 정보창 열기/닫기 이벤트 리스너 추가
        window.naver.maps.Event.addListener(
          marker,
          "click",
          function (_e: naver.maps.PointerEvent) {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          }
        );
      });
    };

    tryInitializeMap();
  }, [data]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && center && zoom) {
      map.setCenter(new window.naver.maps.LatLng(center.lat, center.lng));
      map.setZoom(zoom);
    }
  }, [center, zoom]); // center나 zoom prop이 바뀔 때마다 실행

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
