import "./Button.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={`Button`}>
      {text}
    </button>
  );
};

export default Button;
