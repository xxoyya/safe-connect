import React, { useState } from "react";
import Graph from "./Graph";
import KoreaMap from "./KoreaMap";
import "./DataSlider.css";

type SlideData = {
  type: "graph" | "map";
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
        {currentSlide.type === "map" && (
          <KoreaMap
            key={currentSlide.title}
            data={currentSlide.componentData}
          />
        )}
      </div>
    </div>
  );
};

export default DataSlider;
