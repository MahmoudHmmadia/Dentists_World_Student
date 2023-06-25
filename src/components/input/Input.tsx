import { RefObject, SyntheticEvent } from "react";
const INPUT_CONTAINER_STYLE_CLASSES =
  "input-container flex flex-column g-1 relative input-filed w-100";
const INPUT_STYLE_CLASSES = "w-100 p-1 transparent-bg cl-w bold";
const LABEL_STYLE_CLASSES =
  "fs-small flex align-center g-1 absolute t-50 smooth";
interface InputI {
  labelIcon: any;
  labelContent: string;
  inputType: string;
  inputName: string;
  inputRef: RefObject<HTMLInputElement>;
  handleFocusAnimation?: (e: SyntheticEvent) => void;
  handleBlurAnimation?: (e: SyntheticEvent) => void;
  onChange?: () => void;
}

export function Input({
  labelIcon,
  labelContent,
  inputType,
  inputName,
  inputRef,
  handleFocusAnimation,
  handleBlurAnimation,
  onChange,
}: InputI) {
  return (
    <div className={INPUT_CONTAINER_STYLE_CLASSES}>
      <label htmlFor={inputName} className={LABEL_STYLE_CLASSES}>
        <p>{labelContent}</p>
        <div className="icon flex">{labelIcon}</div>
      </label>
      <input
        type={inputType}
        id={inputName}
        className={INPUT_STYLE_CLASSES}
        autoComplete="off"
        onBlur={handleBlurAnimation ? handleBlurAnimation : undefined}
        onFocus={handleFocusAnimation ? handleFocusAnimation : undefined}
        ref={inputRef}
        onChange={onChange}
      />
    </div>
  );
}
