import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Title from "../components/Title";
import Button from "../components/Button";
import QuestionItem from "../components/selfPage/QuestionItem";

import "../components/selfPage/Self.css";
import surveyDataJson from "../data/surveyData.json";

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

function Self() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (qId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
    navigate("/result");
  };

  return (
    <div className="self-page">
      <Title text="나의 상태는? 자가진단하기" />
      <div className="self-container">
        {surveyData.questions.map((q) => (
          <QuestionItem
            key={q.id}
            question={q}
            answers={answers}
            onSelect={handleSelect}
          />
        ))}

        <Button onClick={handleSubmit} text="결과 확인하기" />
      </div>
    </div>
  );
}

export default Self;
