import React, { useState } from "react";
import Graph from "./Graph";
import SgisMap from "./SgisMap";
import "./DataSlider.css";

// 슬라이드 데이터의 타입을 정의
type SlideData = {
  type: "graph" | "map";
  title: string;
  componentData: any; // 그래프나 지도에 전달될 데이터
};

type DataSliderProps = {
  slides: SlideData[];
};

const DataSlider: React.FC<DataSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    // 이전 슬라이드로, 0보다 작아지면 마지막 슬라이드로 이동
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    // 다음 슬라이드로, 배열 길이를 넘어서면 첫 슬라이드로 이동
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="slider-container">
      <div className="slider-header">
        <button onClick={handlePrev} className="arrow-button">
          ‹
        </button>
        <div className="slider-title">{currentSlide.title}</div>
        <button onClick={handleNext} className="arrow-button">
          ›
        </button>
      </div>
      <div className="slider-content">
        {currentSlide.type === "graph" && (
          <Graph
            {...currentSlide.componentData}
            datasets={currentSlide.componentData.datasets as any}
          />
        )}
        {currentSlide.type === "map" && <SgisMap />}
      </div>
    </div>
  );
};

export default DataSlider;
