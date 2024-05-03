import "./Button.scss";

type ButtonProps = {
  onClick?: () => void;
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  outline?: boolean;
};

const Button = ({ onClick, name, type, disabled, outline }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${outline ? "btn-outline" : ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
