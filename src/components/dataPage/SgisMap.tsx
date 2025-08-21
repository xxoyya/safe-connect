import React, { useEffect, useRef, useState } from "react";

// 1. props로 받을 데이터 타입을 정의합니다.
type DisparityData = {
  adm_cd: string;
  adm_nm: string;
  level: "심각" | "부족" | "주의" | "적정";
};

type SgisMapProps = {
  data: DisparityData[];
};

declare global {
  interface Window {
    sgis: any;
  }
}

const SgisMap: React.FC<SgisMapProps> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_SGIS_CONSUMER_KEY; // 수정
  const SERVICE_KEY = import.meta.env.VITE_SGIS_CONSUMER_SECRET; // 수정

  useEffect(() => {
    // ... (스크립트 로드하는 부분은 이전과 동일)
    const script = document.createElement("script");
    script.src = "https://sgisapi.kostat.go.kr/OpenAPI3/js/sgis.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    // 2. 등급에 따라 색상 코드를 반환하는 함수
    const getColorByLevel = (level: DisparityData["level"]) => {
      switch (level) {
        case "심각":
          return "#D9534F"; // 빨강
        case "부족":
          return "#F0AD4E"; // 주황
        case "주의":
          return "#FFFF00"; // 노랑
        case "적정":
          return "#5CB85C"; // 초록
        default:
          return "#CCCCCC"; // 회색
      }
    };

    const initializeMap = async () => {
      // 3. 인증 토큰 받아오기 (이전과 동일)
      const getAccessToken = async () => {
        try {
          const res = await fetch(
            `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${SERVICE_ID}&consumer_secret=${SERVICE_KEY}`
          );
          const json = await res.json();
          return json.result.accessToken;
        } catch (error) {
          console.error("인증 토큰 발급 실패:", error);
        }
      };

      const accessToken = await getAccessToken();
      if (!accessToken) return;

      // 4. 지도 생성 (이전과 동일)
      mapInstanceRef.current = new window.sgis.Map(mapRef.current, {
        accessToken: accessToken,
        center: [966307, 1943468],
        zoom: 7,
      });

      // 5. 행정구역 경계 데이터 가져와서 폴리곤 그리기
      data.forEach(async (regionData) => {
        try {
          // 행정구역 경계 API 호출
          const res = await fetch(
            `https://sgisapi.kostat.go.kr/OpenAPI3/boundary/hadmarea.geojson?accessToken=${accessToken}&year=2024&adm_cd=${regionData.adm_cd}`
          );
          const geojson = await res.json();

          // 폴리곤 생성 및 지도에 추가
          new window.sgis.Polygon(mapInstanceRef.current, {
            geometry: geojson, // API로 받은 GeoJSON 데이터
            style: {
              fillColor: getColorByLevel(regionData.level), // 등급에 따른 색상
              fillOpacity: 0.7,
              strokeColor: "#FFFFFF",
              strokeWeight: 1,
            },
          });
        } catch (error) {
          console.error(`${regionData.adm_nm} 경계 데이터 로드 실패:`, error);
        }
      });
    };

    initializeMap();
  }, [isScriptLoaded, data]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default SgisMap;
