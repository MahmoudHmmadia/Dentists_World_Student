import Title from "../../components/title";
import { CgClose, IoIosPeople, MdMenu } from "react-icons/all";
import "./states.scss";
import { clinicsNames } from "../../data/data";
import { useEffect } from "react";
import Clinic from "../../components/clinic";
import { usePatients } from "../../hooks/usePatients";
import { UseContext } from "../../context/Context";
import logo from "../../assets/logo1.png";
import { Helmet } from "react-helmet";
function States() {
  const { getPatients, clinicName, isSeenMenu, setClinicName, setIsSeenMenu } =
    usePatients();
  const { patients } = UseContext();
  useEffect(() => {
    getPatients();
  }, []);
  return (
    <div className="states flex flex-column g-1">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Dentists World | States</title>
      </Helmet>
      <Title icon={<IoIosPeople />} title="حجز حالة" />
      <div
        className="flex menu fs-med pointer cl-m w-fit"
        onClick={() => setIsSeenMenu(!isSeenMenu)}
        style={{
          margin: "0 auto 0 0",
        }}
      >
        {isSeenMenu ? <CgClose /> : <MdMenu />}
      </div>
      <div className="relative m-auto w-100">
        <ul
          className={`centering-content g-2 p-1 white-bg box-shadow m-auto flex-wrap w-fit clinics ${
            isSeenMenu ? "show" : "hide"
          }`}
        >
          {clinicsNames.map((clinic) => (
            <li
              className={`smooth bold p-1 fs-small centering-content pointer relative ${
                clinic === clinicName ? "cl-w blue_gradient_bg" : "cl-t"
              }`}
              key={clinic}
              onClick={() => {
                setClinicName(clinic);
                setIsSeenMenu(false);
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
                      right: "-5px",
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
