import { useEffect, useState } from "react";
import "./custom-select.scss";
import { FaArrowDown, TfiClose } from "react-icons/all";
import { UseContext, clinic } from "../../context/Context";
type option = {
  name: string;
  options: (string | number)[];
};
interface PropsI {
  title: string | undefined;
  options?: option[];
  clinicName: string;
  info: string;
}
function CustomSelect({ title, options, clinicName, info }: PropsI) {
  const { setPatientState, patientState } = UseContext();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<(string | number)[]>([]);
  function handleDelete(e: any) {
    e.stopPropagation();
    setValues([]);
  }
  function select(v: string | number) {
    setValues((prev) => [...prev, v]);
  }
  function deleteValue(val: string | number) {
    setValues(values.filter((value) => value !== val));
  }
  function isOptionSelected(val: string | number) {
    return values.includes(val);
  }
  useEffect(() => {
    if (patientState)
      if (patientState[clinicName as keyof typeof patientState]) {
        setPatientState!((prev) => {
          return {
            ...prev,
            [clinicName as keyof typeof patientState]: [
              ...(prev![clinicName as keyof typeof patientState]?.filter(
                (e) => e.info !== info
              ) as clinic[]),
              { info, extra: [...values] },
            ],
          };
        });
      }
  }, [values]);
  return (
    <div className="d-none flex-column w-100 select-container">
      <h5 className="cl-bl">{title}</h5>
      <div
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
        className="relative select flex align-center w-100 justify-between p-1 radius flex-wrap"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="values flex g-1 flex-1 flex-wrap">
          {values.map((value, index) => (
            <span
              className="fs-small bold p-1 blue-bg cl-w pointer"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                deleteValue(value);
              }}
            >
              {value}
            </span>
          ))}
        </div>
        <div className="controller flex align-center g-1">
          <div
            className="flex cl-t pointer close_icon smooth relative"
            onClick={handleDelete}
          >
            <TfiClose />
          </div>
          <div className="cl-t2 relative wall"></div>
          <div className="show_icon flex cl-t pointer smooth">
            <FaArrowDown />
          </div>
        </div>
        <ul
          className={`list flex flex-column absolute w-100 white-bg radius ${
            isOpen ? "show" : ""
          }`}
        >
          {options!.map((item) => (
            <li
              className="flex flex-column g-1 p-1 bold cl-t smooth option"
              key={item.name}
            >
              <span className="cl-m">{item.name}</span>
              <div className="flex flex-wrap g-1 align-center justify-center tooth_container">
                {item.options.map((num, index: number) => (
                  <span
                    onClick={() => select(num)}
                    key={index}
                    className={`tooth_number smooth p-1 fs-x-small bold pointer centering-content cloudy-bg cl-t ${
                      isOptionSelected(num) ? "selected" : ""
                    }`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default CustomSelect;
