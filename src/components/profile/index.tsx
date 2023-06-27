import { IoCloseCircle } from "react-icons/io5";
import { UseContext } from "../../context/Context";
import { Dispatch } from "react";
import { FaNotesMedical, FaUniversity } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import "./profile.scss";
function Profile({
  setShowenProfile,
}: {
  setShowenProfile: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { auth } = UseContext();
  return (
    <div
      className="profile radius cloudy-bg flex align-center pt-1 pb-1 flex-column g-1 fixed l-50 z-10000000 translate-50 w-50"
      style={{
        top: "40%",
        height: "400px",
      }}
    >
      <div
        className="absolute p-2 cl-r fs-x-med pointer"
        style={{
          right: "-17px",
          top: "-30px",
        }}
        onClick={() => setShowenProfile(false)}
      >
        <IoCloseCircle />
      </div>
      <div
        className="image overflow-hidden circle flex"
        style={{
          aspectRatio: "1/1",
        }}
      >
        <img
          src={`https://dentist-world-api.onrender.com/assets/${auth?.profileImage}`}
          alt=""
          style={{
            objectFit: "cover",
            width: "200px",
          }}
        />
      </div>
      <h4 className="cl-b">{auth?.fullName}</h4>
      <div className="w-100 flex flex-column g-1">
        <div className="flex align-center g-1 pl-2 pr-2">
          <p className="bold">السنة الدراسية</p>
          <div className="icon flex cl-m">
            <FaUniversity />
          </div>
          <span className="bold">:</span>
          <p className="cl-t2">{auth?.academicYear}</p>
        </div>
        <div
          className="line w-100"
          style={{
            height: "1px",
            backgroundColor: "#ccc",
          }}
        ></div>
        <div className="flex align-center g-1 pl-2 pr-2">
          <p className="bold">الرقم الجامعي</p>
          <div className="icon flex cl-m">
            <FaUniversity />
          </div>
          <span className="bold">:</span>
          <p className="cl-t2">{auth?.universityID.toString()}</p>
        </div>
        <div
          className="line w-100"
          style={{
            height: "1px",
            backgroundColor: "#ccc",
          }}
        ></div>
        <div className="flex align-center g-1 pl-2 pr-2">
          <p className="bold">عدد الحالات المحجوزة</p>
          <div className="icon flex cl-m">
            <FaNotesMedical />
          </div>
          <span className="bold">:</span>
          <p className="cl-t2">{auth?.reservedCases.length.toString()}</p>
        </div>
        <div
          className="line w-100"
          style={{
            height: "1px",
            backgroundColor: "#ccc",
          }}
        ></div>
        <div className="flex align-center g-1 pl-2 pr-2">
          <p className="bold">عدد الملاحظات</p>
          <div className="icon flex cl-m">
            <GiNotebook />
          </div>
          <span className="bold">:</span>
          <p className="cl-t2">{auth?.notes.length.toString()}</p>
        </div>
      </div>
    </div>
  );
}
export default Profile;
