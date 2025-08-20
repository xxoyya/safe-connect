import "./Title.css";

type TitleProps = {
  text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="TitleContainer">
      <div className="Stroke Right"></div>
      <div className={`Title`}>{text}</div>
      <div className="Stroke Left"></div>
    </div>
  );
};

export default Title;
