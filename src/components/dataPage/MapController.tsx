import React, { useState } from "react";
import NaverMap from "./NaverMap";
import "./MapController.css";

const regions = [
  { name: "전체", lat: 36.3, lng: 127.8, zoom: 7 },
  { name: "서울", lat: 37.5665, lng: 126.978, zoom: 10 },
  { name: "부산", lat: 35.1796, lng: 129.0756, zoom: 9 },
  { name: "대구", lat: 35.8714, lng: 128.6014, zoom: 9 },
  { name: "인천", lat: 37.4563, lng: 126.7052, zoom: 9 },
  { name: "광주", lat: 35.1601, lng: 126.8517, zoom: 10 },
  { name: "대전", lat: 36.3504, lng: 127.3845, zoom: 10 },
  { name: "울산", lat: 35.5384, lng: 129.3114, zoom: 9 },
  { name: "세종", lat: 36.4801, lng: 127.289, zoom: 10 },
  { name: "경기", lat: 37.2752, lng: 127.0095, zoom: 8 },
  { name: "강원", lat: 37.8854, lng: 127.7298, zoom: 8 },
  { name: "충북", lat: 36.6359, lng: 127.4913, zoom: 8 },
  { name: "충남", lat: 36.6588, lng: 126.6735, zoom: 8 },
  { name: "전북", lat: 35.8204, lng: 127.1089, zoom: 8 },
  { name: "전남", lat: 34.8164, lng: 126.4629, zoom: 8 },
  { name: "경북", lat: 36.576, lng: 128.5056, zoom: 8 },
  { name: "경남", lat: 35.2383, lng: 128.6924, zoom: 8 },
  { name: "제주", lat: 33.4996, lng: 126.5312, zoom: 9 },
];

type Center = {
  name: string;
  lat: number;
  lng: number;
};

type MapControllerProps = {
  markerData: Center[];
};

const MapController: React.FC<MapControllerProps> = ({ markerData }) => {
  const [view, setView] = useState(regions[0]); // 초기 뷰는 '전체'

  return (
    <div className="map-controller-container">
      {/* 지역 선택 버튼 UI */}
      <div className="region-selector">
        {regions.map((region) => (
          <button
            key={region.name}
            className={view.name === region.name ? "active" : ""}
            onClick={() => setView(region)}
          >
            {region.name}
          </button>
        ))}
      </div>

      {/* NaverMap 컴포넌트에 상태를 props로 전달 */}
      <div className="map-area">
        <NaverMap
          data={markerData}
          center={{ lat: view.lat, lng: view.lng }}
          zoom={view.zoom}
        />
      </div>
    </div>
  );
};

export default MapController;
