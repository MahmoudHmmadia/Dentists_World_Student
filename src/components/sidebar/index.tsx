import { NavLink } from "react-router-dom";
import { GiSunflower } from "react-icons/gi";
import { AiTwotoneHome } from "react-icons/ai";
import { FaNotesMedical } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import "./sidebar.scss";
import { UseContext } from "../../context/Context";
import { RiProfileFill } from "react-icons/ri";
import ImageRenderer from "../coolImage/CoolImage";
function Sidebar() {
  const { auth, isOverLay, setAuth } = UseContext();
  return (
    <div
      className={`sidebar flex flex-column align-center g-2 light-box-shadow w-25 h-100 white-bg sticky-top`}
      style={{
        zIndex: isOverLay ? "1" : "99",
      }}
    >
      <h2 className="title p-1 relative rtl flex">
        <span className="title cl-bl">أمل لابتسامة أجمل</span>
        <span className="icon cl-m">
          <GiSunflower />
        </span>
      </h2>
      <div
        className="profile flex flex-column align-center g-1 p-1"
        style={{
          maxWidth: "180px",
        }}
      >
        <div className="profile_image flex overflow-hidden circle">
          <ImageRenderer
            height={""}
            thumb=""
            // url={`https://dentist-world-api.onrender.com/assets/profile/${auth?.profileImage}`}
            url={`http://localhost:3500/assets/profile/${auth?.profileImage}`}
            width={""}
          />
        </div>
        <h3 className="name bold capitalize">{auth?.fullName}</h3>
      </div>
      <ul className="links flex flex-column g-2 w-100 rtl">
        <li>
          <NavLink
            data-link="الصفحة الرئيسية"
            to="/"
            className="cl-t flex align-center g-1 p-1 smooth bold"
          >
            <div className="icon cl-t flex">
              <AiTwotoneHome />
            </div>
            <span className="cl-t2 link_text">الصفحة الرئيسية</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/treatmentPlan"
            className="cl-t flex align-center g-1 p-1 smooth bold"
            data-link="خطة العلاج"
          >
            <div className="icon cl-t flex ">
              <FaNotesMedical />
            </div>
            <span className="cl-t2 link_text">خطة المعالجة</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reservation"
            className="cl-t flex align-center g-1 p-1 smooth bold"
            data-link="حجز حالة"
          >
            <div className="icon cl-t flex ">
              <IoIosPeople />
            </div>
            <span className="cl-t2 link_text">حجز حالة</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="profile"
            className="cl-t flex align-center g-1 p-1 smooth bold"
            data-link="الملف الشخصي"
          >
            <div className="icon cl-t flex ">
              <RiProfileFill />
            </div>
            <span className="cl-t2 link_text">الملف الشخصي</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="logout"
            className="cl-t flex align-center g-1 p-1 smooth bold"
            data-link="تسجيل الخروج"
            onClick={() => setAuth!(undefined)}
          >
            <div className="icon cl-t flex ">
              <IoLogOut />
            </div>
            <span className="cl-t2 link_text">تسجيل الخروج</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
