import Title from "../components/Title";
import DataSlider from "../components/dataPage/DataSlider";

// JSON 데이터 import
import yearlyForecast from "../data/yearlyForecast.json";
import facilityNeeds from "../data/facilityNeeds.json";
import currentFacilityCount from "../data/currentFacilityCount.json";

// 데이터 섹션 1에 들어갈 슬라이드 데이터 배열
const dataSection1Slides = [
  {
    type: "graph" as const,
    title: "지역별 가정폭력 신고 예측 데이터",
    componentData: yearlyForecast,
  },
  {
    type: "graph" as const,
    title: "필요 시설(보호소·상담소) 차트",
    componentData: facilityNeeds,
  },
];

// 데이터 섹션 2에 들어갈 슬라이드 데이터 배열
const dataSection2Slides = [
  {
    type: "map" as const,
    title: "필요 시설(보호소·상담소) 분포", // 2-1 (지도)
    componentData: {}, // 지도 데이터 (나중에 추가)
  },
  {
    type: "graph" as const,
    title: "지역별 현재 시설(보호소·상담소) 수", // 2-2 (그래프)
    componentData: currentFacilityCount,
  },
  {
    type: "map" as const,
    title: "현재 시설(보호소·상담소) 분포", // 2-3 (지도)
    componentData: {}, // 지도 데이터 (나중에 추가)
  },
];

const Data = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "80px",
        padding: "20px 0",
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
