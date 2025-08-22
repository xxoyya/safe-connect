import React from "react";
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";
import "./KoreaMap.css";

type RegionData = {
  locale: string;
  count: number;
};

type KoreaMapProps = {
  data: RegionData[];
};

const legendItems = [
  { level: "적정", color: "#5CB85C" },
  { level: "주의", color: "#F7E3A1" },
  { level: "부족", color: "#F0AD4E" },
  { level: "심각", color: "#D9534F" },
];

const KoreaMap: React.FC<KoreaMapProps> = ({ data }) => {
  const getCountColor = (count: number): string => {
    if (count >= 4000)
      return legendItems.find((i) => i.level === "심각")?.color || "#D9534F";
    if (count >= 3000)
      return legendItems.find((i) => i.level === "부족")?.color || "#F0AD4E";
    if (count >= 2000)
      return legendItems.find((i) => i.level === "주의")?.color || "#F7E3A1";
    if (count >= 1000)
      return legendItems.find((i) => i.level === "적정")?.color || "#5CB85C";
    return "#CCCCCC";
  };

  return (
    <div className="korea-map-layout-container">
      {/* 지도 영역 */}
      <div className="map-chart-wrapper">
        <SimpleSouthKoreaMapChart data={data} setColorByCount={getCountColor} />
      </div>

      {/* 범례 영역 */}
      <div className="map-legend-container">
        {legendItems.map((item) => (
          <div key={item.level} className="legend-item">
            <span
              className="legend-color-dot"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="legend-text">{item.level}</span>
          </div>
        ))}
      </div>

      {/* 설명란 영역 */}
      <div className="map-description">
        격차지수 = 신고건수 / (상담소 수 × 1,000 (한 시설당 적정 커버
        가능신고건수) + 보호소 수 × 16.74 (보호소 1개소당 평균 입소 정원))
      </div>
    </div>
  );
};

export default KoreaMap;
