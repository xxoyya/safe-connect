import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import "../components/selfPage/Result.css";
import { useNavigate } from "react-router-dom";

import descriptionsData from "../data/resultDescription.json";

interface DescriptionItem {
  title: string;
  content: string[];
}

interface Descriptions {
  [key: string]: DescriptionItem[];
}

function Result() {
  const navigate = useNavigate();
  const rawAnswers = JSON.parse(localStorage.getItem("surveyAnswers") || "{}");

  const answers: Record<string, string> = {};
  Object.keys(rawAnswers).forEach((key) => {
    const val = rawAnswers[key];
    if (Array.isArray(val)) {
      answers[key] = val.filter(Boolean).join(", ");
    } else if (typeof val === "string") {
      answers[key] = val.trim(); // 공백 제거
    } else {
      answers[key] = "";
    }
  });

  const descriptions = descriptionsData as Descriptions;
  const navItems = Object.keys(descriptions);

  const initialIndex = answers["2"] ? navItems.indexOf(answers["2"]) : 0;
  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );

  return (
    <div className="result-container">
      <Title text="자가진단 결과" />

      {/* 상태 + 응답 */}
      <div className="result-row">
        <div className="state-box">
          <h2>상태</h2>
          <p>{answers["2"] || "결과 없음"}</p>
        </div>

        <div className="result-box">
          <h2>응답 한 번에 몰아보기</h2>
          {Object.keys(answers).map((qId) => (
            <p key={qId}>
              <b>Q{qId}:</b> {answers[qId]}
            </p>
          ))}
        </div>
      </div>

      {/* nav + 설명 */}
      <div className="result-row">
        <div className="result-nav">
          <ul>
            {navItems.map((item, i) => (
              <li
                key={i}
                className={activeIndex === i ? "active" : ""}
                onClick={() => setActiveIndex(i)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="result-detail survey-box">
          <h2>{navItems[activeIndex]}</h2>
          {descriptions[navItems[activeIndex]]?.map((section, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <h3>{section.title}</h3>
              {section.content.map((line, lineIdx) => (
                <p key={lineIdx}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Button onClick={() => navigate("/self")} text="다시 검사하기" />
    </div>
  );
}

export default Result;
