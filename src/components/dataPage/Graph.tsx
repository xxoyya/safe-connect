// src/components/Graph.tsx
import "./Graph.css";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import type { ChartData, ChartOptions, ChartDataset } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type GraphProps = {
  title: string;
  labels: string[];
  datasets: ChartDataset<"bar">[];
  description?: string; // 선택적 설명 prop
};

const Graph: React.FC<GraphProps> = ({
  title,
  labels,
  datasets,
  description,
}) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        // props로 받은 title 사용
        text: title,
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        type: "logarithmic",
      },
    },
  };

  const data: ChartData<"bar"> = {
    // props로 받은 labels와 datasets 사용
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="graph-with-description-container">
      <div className="chart-wrapper">
        <Bar options={options} data={data} />
      </div>
      {description && <div className="graph-description">{description}</div>}
    </div>
  );
};

export default Graph;
