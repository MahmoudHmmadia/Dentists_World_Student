import { FaSkull } from "react-icons/fa";
import { UseContext, clinic } from "../../context/Context";
import { patient, usePatients } from "../../hooks/usePatients";
import Button from "../button";
import { BsFillCheckCircleFill, BsFlower1 } from "react-icons/bs";
import { useState } from "react";
import { RiGalleryFill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import ImageRenderer from "../coolImage/CoolImage";

type props = {
  name: string;
  patients: patient[] | undefined;
};

function Clinic({ name, patients }: props) {
  const { reservePatient } = usePatients();
  const { setIsisOverLay } = UseContext();
  const [isSeenX, setIsSeenX] = useState(false);
  const [patientId, setPatientId] = useState("");
  return (
    <div className="flex flex-column g-1">
      {isSeenX && (
        <>
          <div
            className="fixed l-0 t-0 w-100 h-100 black-bg opacity-80"
            style={{
              zIndex: 999999,
            }}
          ></div>
          <div
            className="fixed t-50 l-50 translate-50 radius p-2"
            style={{
              zIndex: 9999999,
            }}
          >
            <div
              className="pointer flex cl-r fs-med absolute t-0 r-0 z-1000000"
              onClick={() => {
                setIsisOverLay(false);
                setIsSeenX(false);
              }}
            >
              <IoCloseCircle />
            </div>
            <ImageRenderer
              height={"auto"}
              thumb=""
              // url={`https://dentist-world-api.onrender.com/assets/xray/${
              //   patients?.filter((p) => p._id === patientId)[0].xRay
              // }`}
              url={`http://localhost:3500//assets/xray/${
                patients?.filter((p) => p._id === patientId)[0].xRay
              }`}
              width={"auto"}
            />
          </div>
        </>
      )}
      <h2 className="cl-b">{name}</h2>
      {patients && patients.length > 0 ? (
        <div className="flex flex-column g-2">
          {patients?.map((patient) => (
            <div
              key={patient._id}
              className="radius white-bg flex flex-column box-shadow pt-1 pb-1"
            >
              <div
                className="name flex g-1 align-center p-1"
                style={{
                  borderBottom: "2px solid #ddd",
                }}
              >
                <p className="bold">الاسم : </p>
                <p className="cl-t2">{patient.fullName}</p>
              </div>
              <div
                className="age flex g-1 align-center p-1"
                style={{
                  borderBottom: "2px solid #ddd",
                }}
              >
                <p className="bold">العمر : </p>
                <p className="cl-t2">{patient.age}</p>
              </div>
              <div
                className="occupation flex g-1 align-center p-1"
                style={{
                  borderBottom: "2px solid #ddd",
                }}
              >
                <p className="bold">المهنة : </p>
                <p className="cl-t2">{patient.occupation}</p>
              </div>
              <div
                className="address flex g-1 align-center p-1"
                style={{
                  borderBottom: "2px solid #ddd",
                }}
              >
                <p className="bold">العنوان : </p>
                <p className="cl-t2">{patient.address}</p>
              </div>
              <div
                className="number flex g-1 align-center p-1"
                style={{
                  borderBottom: "2px solid #ddd",
                }}
              >
                <p className="bold">الرقم : </p>
                <p className="cl-t2">{patient.phoneId}</p>
              </div>
              <div
                className="smoker flex g-1 align-center p-1"
                style={{
                  borderBottom: "2px solid #ddd",
                }}
              >
                {patient.smoker === "yes" ? (
                  <>
                    <p className="cl-r bold">مدخن</p>
                    <div className="icon flex cl-r">
                      <FaSkull />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="cl-g bold">غير مدخن</p>
                    <div className="icon flex cl-g">
                      <BsFlower1 />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-column g-1 p-1">
                <p className="bold">التفاصيل :</p>
                {name === "التشخيص" ? (
                  <p className="cl-t2">تشخيص</p>
                ) : (
                  <>
                    {patient.state[`${name}`].map(
                      (clinicState: clinic, index: number) => (
                        <div key={index} className="flex align-center g-1">
                          <p className="cl-t2">{clinicState.info}</p>
                          {clinicState.extra &&
                            clinicState.extra.map((num) => (
                              <div key={num} className="flex align-center g-1">
                                <div
                                  className="h-100 line-bg"
                                  style={{
                                    width: "2px",
                                  }}
                                >
                                  <p className="opacity-0">asd</p>
                                </div>
                                <p className="bold cl-bl">رقم السن :</p>
                                <p className="cl-m">{num}</p>
                              </div>
                            ))}
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
              <div className="flex g-1 align-center">
                <Button
                  bgColor="sunny_gradient_bg"
                  content="مشاهدة الصورة الشعاعية"
                  icon={<RiGalleryFill />}
                  valid={patient.xRay !== "" ? true : false}
                  fontSize="fs-b-small"
                  extraStyles="w-50 m-auto mt-1"
                  clickFunction={() => {
                    setIsSeenX(true);
                    setIsisOverLay(true);
                    setPatientId(patient._id);
                  }}
                />
                <Button
                  bgColor="blue_gradient_bg"
                  content="حجز"
                  icon={<BsFillCheckCircleFill />}
                  valid={true}
                  fontSize="fs-b-small"
                  extraStyles="w-50 m-auto mt-1"
                  clickFunction={() => reservePatient(patient._id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="cl-t2 bold txt-c">لا يوجد حالات بعد</p>
      )}
    </div>
  );
}
export default Clinic;
