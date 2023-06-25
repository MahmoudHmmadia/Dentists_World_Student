import { useEffect, useState } from "react";
import { clinicType, toothOptions } from "../../data/data";
import { BsCheckLg, IoCloseSharp, FaClinicMedical } from "react-icons/all";
import CustomSelect from "../customSelect";
import { useTreatmentPlan } from "../../hooks/useTreatmentPlan";
import "./cure-box.scss";
interface PropsI {
  title: string;
  inputs: clinicType[];
}
function CureBox({ title, inputs }: PropsI) {
  const [toggle, setToggle] = useState(false);
  const { getPatientState, reset } = useTreatmentPlan();
  useEffect(() => {
    reset(title);
  }, []);
  return (
    <div className="box radius white-bg box-shadow flex flex-column g-1 cure-box">
      <div className="title p-1 flex align-center justify-between">
        <h3 className="main-title">{title}</h3>
        <div
          className={`toggle relative pointer ${
            toggle ? "green_gradient_bg" : "red_gradient_bg"
          }`}
          onClick={() => {
            setToggle((prev) => !prev);
            if (toggle) reset(title);
          }}
        >
          {toggle ? (
            <div className="circle pointer absolute ball cl-g centering-content checked smooth">
              <BsCheckLg />
            </div>
          ) : (
            <div className="circle pointer absolute ball cl-r centering-content closed smooth">
              <IoCloseSharp />
            </div>
          )}
        </div>
      </div>
      <div className={`${!toggle ? "off" : "on"} toggler`}>
        <div className="clinic-icon fs-med txt-c cl-bl">
          <FaClinicMedical />
        </div>
        <div className="flex flex-column g-1 clinic-plan">
          {toggle && (
            <>
              {inputs.map((item: clinicType) => (
                <div
                  className="input-container flex flex-wrap align-center g-1 justify-between p-1 fs-small"
                  key={item.info}
                >
                  <div className="flex align-center flex-1 w-50">
                    <label
                      htmlFor={item.info}
                      className="bold flex cl-t2 label pl-1 pointer"
                    >
                      {item.info}
                    </label>
                    <input
                      type="checkbox"
                      id={item.info}
                      name={title}
                      className="pointer"
                      onChange={getPatientState}
                    />
                  </div>
                  <div
                    className="flex align-center bold g-1 info"
                    style={{ color: item.color }}
                  >
                    <span className="cl-t">{item.deg}</span>
                    <div className="icon flex">
                      <item.icon />
                    </div>
                  </div>
                  {item?.extra && (
                    <CustomSelect
                      title={item.collections}
                      options={toothOptions}
                      info={item.info}
                      key={item.info}
                      clinicName={title}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default CureBox;
