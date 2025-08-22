import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Title from "../components/Title";
import Survey from "../components/selfPage/Survey";
import Button from "../components/Button";

import "../components/selfPage/Self.css";

// JSON 설문조사 데이터
import surveyDataJson from "../data/surveyData.json";

// -------------------- 타입 정의 --------------------
interface SubQuestion {
  id: string;
  text: string;
  options: string[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  subQuestions?: Record<string, SubQuestion>;
}

interface SurveyData {
  questions: Question[];
}

const surveyData: SurveyData = surveyDataJson;

// -------------------- Self 컴포넌트 --------------------
function Self() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleSelect = (qId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
    navigate("/result");
  };

  return (
    <>
      <Title text="나의 상태는? 자가진단하기" />
      <div className="self-container">
        {surveyData.questions.map((q) => {
          const qId = q.id.toString();
          const selectedOption = answers[qId];

          // 선택된 서브 질문 (있을 경우)
          const subQ =
            q.subQuestions && selectedOption
              ? q.subQuestions[selectedOption]
              : undefined;

          return (
            <div key={qId} className="survey-wrapper">
              {/* 기본 질문 */}
              <Survey
                questionId={qId}
                question={q.text}
                options={q.options}
                selectedOption={selectedOption}
                onSelect={handleSelect}
              />

              {/* 선택된 서브 질문 */}
              {subQ && (
                <div className="sub-survey-container">
                  <Survey
                    key={subQ.id}
                    questionId={subQ.id}
                    question={subQ.text}
                    options={subQ.options}
                    selectedOption={answers[subQ.id]}
                    onSelect={handleSelect}
                  />
                </div>
              )}
            </div>
          );
        })}

        <Button onClick={handleSubmit} text="결과 확인하기" />
      </div>
    </>
  );
}

export default Self;
