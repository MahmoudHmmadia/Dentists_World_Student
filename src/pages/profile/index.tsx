import { MdEditCalendar, MdSettings } from "react-icons/md";
import Title from "../../components/title";
import { UseContext } from "../../context/Context";
import logo from "../../assets/logo1.png";
import { Helmet } from "react-helmet";
import ImageRenderer from "../../components/coolImage/CoolImage";
import "./profile.scss";
import { FaTooth, FaUniversity } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
function Profile() {
  const { auth } = UseContext();
  return (
    <div className="flex flex-column g-3 w-100 profile ">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Dentists World | Profile</title>
      </Helmet>
      <Title icon={<MdSettings />} title="الملف الشخصي" fs="fs-large" />
      <div className=" profile_coolImage flex flex-column g-1 align-center">
        <ImageRenderer
          height={"auto"}
          thumb=""
          url={`https://dentist-world-api.onrender.com/assets/profile/${auth?.profileImage}`}
          width={240}
        />
        <div className=" fs-large g-2 centering-content">
          <div className="flex cl-m">
            <FaTooth />
          </div>
          <span className="name uppercase bold cl-bl">{auth?.fullName}</span>
          <div className="flex cl-m">
            <FaTooth />
          </div>
        </div>
      </div>
      <div className="flex flex-column p-1 g-2 w-100 white-bg light-box-shadow radius light-box-shadow">
        <div
          className=""
          style={{
            display: "grid",
            gap: "1rem",
            placeContent: "center",
            gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))",
          }}
        >
          <div className="box radius p-1 sunny_gradient_bg flex-column centering-content cl-w">
            <div className="fs-med cl-w">
              <TbNotes />
            </div>
            <p>الملاحظات</p>
            <h1>{auth?.notes.length}</h1>
          </div>
          <div className="box radius p-1 green_gradient_bg centering-content flex-column cl-w">
            <div className="fs-med cl-w">
              <MdEditCalendar />
            </div>
            <p>الحالات المحجوزة</p>
            <h1>{auth?.reservedCases.length}</h1>
          </div>
          <div className="box radius p-1 blue_gradient_bg centering-content flex-column cl-w">
            <div className="fs-med cl-w">
              <FaUniversity />
            </div>
            <p>السنة الدراسية</p>
            <h1>{auth?.academicYear}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
