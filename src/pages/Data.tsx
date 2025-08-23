import Title from "../components/Title";
import DataSlider, { type SlideData } from "../components/dataPage/DataSlider";

import yearlyForecast from "../data/yearlyForecast.json";
import facilityNeeds from "../data/facilityNeeds.json";
import currentFacilityCount from "../data/currentFacilityCount.json";
import disparityIndex from "../data/disparityIndex.json";
import counselingCenters from "../data/counselingCenters.json";

const dataSection1Slides: SlideData[] = [
  {
    type: "graph" as const,
    title: "지역별 가정폭력 신고 예측 데이터 (2026)",
    componentData: yearlyForecast,
  },
  {
    type: "graph" as const,
    title: "필요 시설(보호소·상담소) 차트",
    componentData: facilityNeeds,
  },
];

const dataSection2Slides: SlideData[] = [
  {
    type: "map" as const,
    mapType: "choropleth", // 단계적 구분도
    title: "지역별 현재 격차 지수(2023)", // 2-1 (지도)
    componentData: disparityIndex,
  },
  {
    type: "graph" as const,
    title: "지역별 현재 시설(보호소·상담소) 수", // 2-2 (그래프)
    componentData: currentFacilityCount,
  },
  {
    type: "map" as const,
    mapType: "marker", // 마커 지도
    title: "상담소 위치", // 2-3 (지도)
    componentData: counselingCenters,
  },
];

const Data = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "80px"
      }}
    >
      <Title text="데이터 대시보드" />

      {/* 데이터 1 섹션 */}
      <DataSlider slides={dataSection1Slides} />

      {/* 데이터 2 섹션 */}
      <DataSlider slides={dataSection2Slides} />
    </div>
  );
};

export default Data;
