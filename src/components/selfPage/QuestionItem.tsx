import Survey from "../selfPage/Survey";

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

interface QuestionItemProps {
  question: Question;
  answers: Record<string, string>;
  onSelect: (qId: string, option: string) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  answers,
  onSelect,
}) => {
  const qId = question.id.toString();
  const selectedOption = answers[qId];

  const subQ =
    question.subQuestions && selectedOption
      ? question.subQuestions[selectedOption]
      : undefined;

  const renderSubQuestion = (subQ: SubQuestion) => (
    <div className="sub-survey-container" key={subQ.id}>
      <Survey
        questionId={subQ.id}
        question={subQ.text}
        options={subQ.options}
        selectedOption={answers[subQ.id]}
        onSelect={onSelect}
      />
    </div>
  );

  return (
    <div className="survey-wrapper" key={qId}>
      <Survey
        questionId={qId}
        question={question.text}
        options={question.options}
        selectedOption={selectedOption}
        onSelect={onSelect}
      />
      {subQ && renderSubQuestion(subQ)}
    </div>
  );
};

export default QuestionItem;
