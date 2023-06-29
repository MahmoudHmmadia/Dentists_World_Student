import { MdSettings } from "react-icons/md";
import Title from "../../components/title";
import { useRef, useState } from "react";
import HomeBox from "../../components/homeBox";
import { RiGalleryFill } from "react-icons/ri";
import { UseContext } from "../../context/Context";
import { BiCheck, BiEdit, BsBack } from "react-icons/all";
import Button from "../../components/button";
import logo from "../../assets/logo1.png";
import { Helmet } from "react-helmet";
function Settings() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState(false);
  const [valid, setValid] = useState(false);
  const { auth } = UseContext();
  return (
    <div className="flex flex-column g-1">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Dentists World | Settings</title>
      </Helmet>
      <Title icon={<MdSettings />} title="إعدادت" />
      <HomeBox title="تعديل الملف الشخصي">
        <div className="flex flex-column g-2">
          <div className="flex g-1 flex-column">
            <div className="flex align-center g-1 justify-between">
              <div className="flex align-center g-1">
                <p className="bold">الاسم :</p>
                {!toggle && <p className="cl-t2 ltr">{auth?.fullName}</p>}
              </div>
              <div
                className="icon flex pointer cl-m fs-b-small"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <BsBack /> : <BiEdit />}
              </div>
            </div>
            {toggle && (
              <div className="flex flex-column g-1">
                <input
                  type="text"
                  className="bold w-100 cloudy-bg radius"
                  style={{
                    border: "2px solid #2dc1e4",
                  }}
                  ref={nameRef}
                  onChange={() =>
                    nameRef.current?.value ? setValid(true) : setValid(false)
                  }
                />
                <Button
                  bgColor="blue_gradient_bg"
                  content="حفظ"
                  icon={<BiCheck />}
                  valid={valid}
                />
              </div>
            )}
          </div>
          <div
            className="line w-100"
            style={{
              height: "2px",
              backgroundColor: "#ccc",
            }}
          ></div>
          <div className="flex">
            <input type="file" className="d-none" id="file" />
            <label
              htmlFor="file"
              className="radius sunny_gradient_bg txt-c w-100 cl-w p-1 pointer centering-content g-1"
            >
              <p>تغيير الصورة الشخصية</p>
              <div className="icon flex">
                <RiGalleryFill />
              </div>
            </label>
          </div>
        </div>
      </HomeBox>
    </div>
  );
}
export default Settings;
