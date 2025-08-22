import React, { useState } from "react";
import Graph from "./Graph";
import KoreaMap from "./KoreaMap";
import MapController from "./MapController";
import "./DataSlider.css";

export type SlideData = {
  type: "graph" | "map";
  mapType?: "choropleth" | "marker"; // type이 'map'일 때만 사용
  title: string;
  componentData: any;
};

type DataSliderProps = {
  slides: SlideData[];
};

const DataSlider: React.FC<DataSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const currentSlide = slides[currentIndex];
  const { type, mapType, componentData, title } = currentSlide;

  return (
    <div className="slider-container">
      <div className="slider-header">
        <button onClick={handlePrev} className="arrow-button">
          ‹
        </button>
        <div className="slider-title">{title}</div>
        <button onClick={handleNext} className="arrow-button">
          ›
        </button>
      </div>
      <div className="slider-content">
        {type === "graph" && (
          <Graph
            key={title}
            {...componentData}
            datasets={componentData.datasets as any}
          />
        )}

        {type === "map" && (
          <>
            {mapType === "choropleth" && (
              <KoreaMap key={title} data={componentData} />
            )}
            {mapType === "marker" && (
              <MapController key={title} markerData={componentData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DataSlider;
