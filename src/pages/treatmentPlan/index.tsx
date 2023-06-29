import {
  CgHomeScreen,
  FaHeart,
  FaNotesMedical,
  FaSkull,
  GiFlowerEmblem,
  IoIosSend,
  RiGalleryFill,
} from "react-icons/all";
import CureBox from "../../components/cure_box";
import Title from "../../components/title";
import {
  fifthClinic,
  firstClinic,
  fourthClinic,
  secondClinic,
  thirdClinic,
  viClinic,
  viiClinic,
  viiiClinic,
} from "../../data/data";
import "./treatmentPlan.scss";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../../context/Context";
import { usePatients } from "../../hooks/usePatients";
import { SyntheticEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo1.png";

function TreatmentPlan() {
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const { reservedPatient, setReservedPatient, patientState } = UseContext();
  const { updatePatientState, smookRef, endTreatmentPlan } = usePatients();
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    updatePatientState(reservedPatient!._id);
    setReservedPatient(undefined);
  }
  useEffect(() => {
    const checkboxes = document.querySelectorAll(
      ".cure-box .toggler .clinic-plan input"
    ) as NodeListOf<HTMLInputElement>;
    setValid(false);
    if (checkboxes.length > 0) {
      checkboxes.forEach((box) => {
        box.checked && setValid(true);
      });
    }
  }, [patientState]);
  return (
    <div className="treatment-plan rtl">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Dentists World | Treatment Plan</title>
      </Helmet>
      <Title title="خطة المعالجة" color="#2dc1e4" icon={<FaNotesMedical />} />
      {reservedPatient ? (
        <>
          <div className="flex flex-column g-2">
            <div className="treatment-plan__boxes">
              <div className="box radius white-bg box-shadow flex flex-column g-2 p-1 personal_info">
                <h3 className="main-title cl-b">المعلومات الشخصية للمريض</h3>
                <div className="flex flex-column g-2">
                  <div className="flex g-1 align-center">
                    <p className="bold">الاسم :</p>
                    <p className="cl-t2">{reservedPatient.fullName}</p>
                  </div>
                  <div className="flex g-1 align-center">
                    <p className="bold">العنوان :</p>
                    <p className="cl-t2">{reservedPatient.address}</p>
                  </div>
                  <div className="flex g-1 align-center">
                    <p className="bold">المهنة :</p>
                    <p className="cl-t2">{reservedPatient.occupation}</p>
                  </div>
                  <div className="flex g-1 align-center">
                    <p className="bold">العمر :</p>
                    <p className="cl-t2">{reservedPatient.age}</p>
                  </div>
                  <div className="flex g-1 align-center">
                    <p className="bold">الجنس :</p>
                    <p className="cl-t2">
                      {reservedPatient.gender == "female" ? "أنثى" : "ذكر"}
                    </p>
                  </div>
                  <div
                    className="line line-bg w-100"
                    style={{
                      height: "2px",
                    }}
                  ></div>
                  <div className="flex g-2 align-center justify-center">
                    <div className="input-container flex align-center g-1">
                      <label
                        htmlFor="smoker"
                        className="bold pointer flex align-center"
                      >
                        <p>مدخن</p>
                        <div className="flex">
                          <FaSkull />
                        </div>
                      </label>
                      <input
                        type="radio"
                        id="smoker"
                        name="smookes"
                        className="pointer gender cool-radio"
                        ref={smookRef}
                      />
                    </div>
                    <div
                      className="line h-100 line-bg"
                      style={{
                        width: "2px",
                      }}
                    ></div>
                    <div className="input-container flex align-center g-1">
                      <label
                        htmlFor="nonsmoker"
                        className="bold pointer flex align-center"
                      >
                        <p>غير مدخن</p>
                        <div className="flex">
                          <FaHeart />
                        </div>
                      </label>
                      <input
                        type="radio"
                        id="nonsmoker"
                        name="smookes"
                        className="pointer gender cool-radio"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CureBox title="لثة" inputs={firstClinic} />
              <CureBox title="متحركة" inputs={secondClinic} />
              <CureBox title="ثابتة" inputs={thirdClinic} />
              <CureBox title="لبية" inputs={fourthClinic} />
              <CureBox title="ترميمية" inputs={fifthClinic} />
              <CureBox title="أطفال" inputs={viClinic} />
              <CureBox title="تخدير و قلع" inputs={viiClinic} />
              <CureBox title="طب الفم و التقويم" inputs={viiiClinic} />
            </div>
            <div className="flex g-1">
              <Button
                bgColor="sunny_gradient_bg"
                content="إضافة صورة شعاعية"
                icon={<RiGalleryFill />}
                extraStyles="w-50"
                fontSize="fs-b-small"
                valid={true}
              />
              <Button
                bgColor="green_gradient_bg"
                content="تمت معالجة الحالة"
                icon={<GiFlowerEmblem />}
                extraStyles="w-50"
                fontSize="fs-b-small"
                valid={true}
                clickFunction={() => endTreatmentPlan(reservedPatient._id)}
              />
            </div>
            <Button
              bgColor="blue_gradient_bg"
              content="ارسال المعلومات"
              icon={<IoIosSend />}
              extraStyles="w-100"
              fontSize="fs-med"
              valid={valid}
              clickFunction={handleSubmit}
            />
          </div>
        </>
      ) : (
        <div className="centering-content g-2 flex-column">
          <p className="cl-t2">اختر حالة من قائمة الحالات المحجوزة لديك !</p>
          <Button
            bgColor="sunny_gradient_bg"
            fontSize="fs-b-small"
            content="اختر الحالة"
            icon={<CgHomeScreen />}
            extraStyles="w-100"
            valid={true}
            clickFunction={() => navigate("/", { replace: true })}
          />
        </div>
      )}
    </div>
  );
}
export default TreatmentPlan;
