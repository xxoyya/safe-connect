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
};

const NaverMap: React.FC<NaverMapProps> = ({ data }) => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // naver.maps 객체가 로드될 때까지 기다립니다.
    const tryInitializeMap = () => {
      if (!window.naver || !mapElement.current) {
        setTimeout(tryInitializeMap, 100);
        return;
      }

      // 지도 초기 옵션 설정
      const mapOptions = {
        center: new window.naver.maps.LatLng(36.3504, 127.3845), // 초기 중심점: 대전
        zoom: 7,
      };

      // 지도 생성
      const map = new window.naver.maps.Map(mapElement.current, mapOptions);

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
          function (e: naver.maps.PointerEvent) {
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

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
