import { motion } from "framer-motion";
import { SyntheticEvent } from "react";
interface ButtonI {
  bgColor: string;
  icon: any;
  content: string;
  fontSize?: string;
  color?: string;
  extraStyles?: string;
  valid?: boolean;
  clickFunction?: (e: SyntheticEvent<Element, Event>) => void;
}
function Button({
  fontSize,
  bgColor,
  content,
  icon,
  color,
  extraStyles,
  valid,
  clickFunction,
}: ButtonI) {
  return (
    <motion.button
      className={`radius g-1 pt-1 pb-1 pl-2 pr-2 bold centering-content smooth ${
        !valid ? "mouse-none opacity-50" : ""
      } ${fontSize} ${bgColor} ${color ? color : "cl-w"} ${
        extraStyles ? extraStyles : ""
      }`}
      whileHover={{
        scale: 0.9,
      }}
      transition={{
        duration: 0,
      }}
      onClick={clickFunction && clickFunction}
    >
      <span>{content}</span>
      <div className="icon flex">{icon}</div>
    </motion.button>
  );
}
export default Button;
