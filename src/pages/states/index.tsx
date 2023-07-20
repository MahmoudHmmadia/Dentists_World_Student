import Title from "../../components/title";
import { IoIosPeople } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import "./states.scss";
import { useEffect, useState } from "react";
import Clinic from "../../components/clinic";
import { usePatients } from "../../hooks/usePatients";
import { UseContext } from "../../context/Context";
import logo from "../../assets/logo1.png";
import { Helmet } from "react-helmet";
import { IoCloseCircle } from "react-icons/io5";
import { clinicsNames } from "../../data/data";
import { GiToothbrush } from "react-icons/gi";
function States() {
  const { getPatients, clinicName, setClinicName } = usePatients();
  const { patients, serverResponse } = UseContext();
  const [isSeenStatesMenu, setIsSeenStatesMenu] = useState(false);
  useEffect(() => {
    getPatients();
    setIsSeenStatesMenu(false);
  }, []);
  return (
    <div className="states flex flex-column g-3">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Dentists World | States</title>
      </Helmet>

      <Title icon={<IoIosPeople />} title="حجز حالة" fs="fs-large" />
      <div
        className="flex menu fs-med pointer cl-m w-fit"
        onClick={() => setIsSeenStatesMenu(true)}
        style={{
          margin: "0 auto 0 0",
        }}
      >
        <MdMenu />
      </div>
      <div className=" m-auto w-100">
        {isSeenStatesMenu && (
          <div className="fixed w-100 h-100 cloudy-bg opacity-90 l-0 t-0 z-100000 overlay"></div>
        )}
        <ul
          className={`centering-content g-2 p-1 box-shadow m-auto flex-wrap w-fit clinics ${
            isSeenStatesMenu ? "show" : "white-bg"
          }`}
        >
          {isSeenStatesMenu && (
            <>
              <div className="states_icon fs-x-large cl-m centering-content">
                <GiToothbrush />
              </div>
              <div
                className="fs-med absolute pointer cl-r"
                style={{
                  top: "3rem",
                  right: "3rem",
                }}
                onClick={() => setIsSeenStatesMenu(false)}
              >
                <IoCloseCircle />
              </div>
            </>
          )}
          {clinicsNames.map((clinic) => (
            <li
              className={`smooth bold p-1 fs-small centering-content pointer relative ${
                isSeenStatesMenu && clinic !== clinicName
                  ? "cl-b"
                  : isSeenStatesMenu && clinic === clinicName
                  ? "cl-w blue_gradient_bg"
                  : !isSeenStatesMenu && clinic === clinicName
                  ? "cl-w blue_gradient_bg"
                  : "cl-t"
              }`}
              key={clinic}
              onClick={() => {
                setClinicName(clinic);
                setIsSeenStatesMenu(false);
              }}
              style={{
                border: isSeenStatesMenu ? "1px solid #ccc" : "",
              }}
            >
              <p>{clinic}</p>
              {patients &&
                patients!.filter((patient) => patient.clinics.includes(clinic))
                  .length > 0 && (
                  <div
                    className="absolute fs-x-small w-fit circle  cl-w sunny_gradient_bg centering-content"
                    style={{
                      width: "20px",
                      height: "20px",
                      right: !isSeenStatesMenu ? "-5px" : "0px",
                      top: "-10px",
                    }}
                  >
                    {patients
                      ?.filter((patient) => patient.clinics.includes(clinic))
                      .length.toString()}
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
      <Clinic
        name={clinicName}
        patients={
          patients &&
          patients?.filter((patient) => patient.clinics.includes(clinicName))
        }
      />
    </div>
  );
}
export default States;
