import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;

  color: ${(props) => {
    if (props.type === "positive" || "negative") return "white";
    else return "black";
  }};

  background-color: ${(props) => {
    if (props.type === "positive") return "#64c964";
    else if (props.type === "negative") return "#fd565f;";
    else return "#ececec";
  }};
`;

const MyButton = ({ text, type, onClick }) => {
  return (
    <Button type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
