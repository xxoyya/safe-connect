import { useEffect, useRef } from "react";
declare global {
  interface Window {
    sop: any;
  }
}

const SgisMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tryInitializeMap = () => {
      if (
        mapContainer.current &&
        window.sop &&
        typeof window.sop.Map === "function"
      ) {
        try {
          const map = new window.sop.Map(mapContainer.current);

          map.setView(window.sop.utmk(989674, 1818313), 1);
        } catch (error) {
          console.error("❌ 지도 생성 중 오류 발생:", error);
        }
      } else {
        console.log("sop 객체 로딩 대기 중...");
        setTimeout(tryInitializeMap, 100);
      }
    };

    tryInitializeMap();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "450px", height: "100%", margin: "0 auto" }}
    />
  );
};

export default SgisMap;
