import React, { useEffect, useRef } from "react";

// window 객체에 sop 네임스페이스가 있음을 TypeScript에 알려줍니다.
declare global {
  interface Window {
    sop: any;
  }
}

const SgisMap = () => {
  // 1. 지도가 그려질 DOM 요소를 참조하기 위해 useRef를 사용합니다.
  const mapContainer = useRef<HTMLDivElement>(null);

  // 2. 발급받은 API 키를 여기에 입력합니다.
  const API_KEY = "YOUR_CONSUMER_KEY"; // 발급받은 서비스 키(Consumer Key)

  // 3. useEffect를 사용해 컴포넌트가 처음 렌더링될 때 스크립트를 불러옵니다.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://sgisapi.kostat.go.kr/OpenAPI3/auth/javascriptAuth?consumer_key=${API_KEY}`;
    script.async = true;

    // 4. 스크립트 로딩이 완료되면 실행될 콜백 함수입니다.
    script.onload = () => {
      // ✅ 1. 스크립트가 로드되면 이 메시지가 보여야 합니다.
      console.log("✅ 스크립트 onload 실행됨");

      // ✅ 2. window.sop 객체가 생성되었는지 확인합니다.
      console.log("▶️ window.sop 객체:", window.sop);

      // ✅ 3. 지도를 그릴 div DOM 요소가 있는지 확인합니다.
      console.log("▶️ mapContainer.current:", mapContainer.current);

      if (
        mapContainer.current &&
        window.sop &&
        typeof window.sop.Map === "function"
      ) {
        console.log("🗺️ 지도 생성 시도...");
        try {
          const map = new window.sop.Map(mapContainer.current);
          map.setView(window.sop.utmk(953820, 1953437), 9);
          console.log("🎉 지도 생성 성공!");
        } catch (error) {
          console.error("❌ 지도 생성 중 오류 발생:", error);
        }
      } else {
        console.error(
          "❌ 지도 생성 실패: mapContainer 또는 window.sop.Map 함수가 없습니다."
        );
      }
    };

    document.head.appendChild(script);

    // 5. 컴포넌트가 사라질 때 스크립트를 정리합니다. (메모리 누수 방지)
    return () => {
      document.head.removeChild(script);
    };
  }, [API_KEY]); // API_KEY가 변경될 때만 이 effect를 다시 실행합니다.

  return (
    // 6. 지도가 그려질 컨테이너 div입니다.
    <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
  );
};

export default SgisMap;
