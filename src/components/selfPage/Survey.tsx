import "./Survey.css";
import q1Img from "../../assets/survey/q1.png";
import q2Img from "../../assets/survey/q2.png";
import q301Img from "../../assets/survey/q3-1.png";
import q302Img from "../../assets/survey/q3-2.png";
import q303Img from "../../assets/survey/q3-3.png";

interface SurveyProps {
  questionId: string;
  question: string;
  options: string[];
  selectedOption?: string;
  onSelect: (questionId: string, option: string) => void;
}

function Survey({ questionId, question, options, selectedOption, onSelect }: SurveyProps) {
  const surveyImages: { [key: string]: string } = {
    "1": q1Img,
    "2": q2Img,
    "3-1": q301Img,
    "3-2": q302Img,
    "3-3": q303Img,
  };
  
  return (
    <>
      <h2 className="survey-question">
        Q{questionId}. {question}
      </h2>
      <div className="survey-box">
        <div className="survey-options">
          {options.map((opt, idx) => (
            <label key={idx} className="survey-option">
              <input
                type="radio"
                name={`q${questionId}`}
                value={opt}
                checked={selectedOption === opt}
                onChange={() => onSelect(questionId, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
        {surveyImages[questionId] && (
          <img
            src={surveyImages[questionId]}
            alt={`질문 ${questionId} 이미지`}
            className="survey-img"
          />
        )}
      </div>
    </>
  );
}

export default Survey;
