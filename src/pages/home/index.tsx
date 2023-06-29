import { AiTwotoneHome } from "react-icons/ai";
import { MdEngineering, MdNoteAdd } from "react-icons/md";
import {
  BsFillTrashFill,
  BiPlusMedical,
  GiSaveArrow,
  FaEye,
  FaPaintBrush,
  FaTelegram,
  BsBack,
  FaNotesMedical,
  CgCloseR,
  CgCheckR,
} from "react-icons/all";
import Title from "../../components/title";
import welcome from "../../assets/dentists.svg";
import dentist from "../../assets/dent.jpg";
import "./home.scss";
import { social } from "../../data/data";
import { useNotes } from "../../hooks/useNotes";
import Button from "../../components/button";
import HomeBox from "../../components/homeBox";
import { useEffect } from "react";
import { UseContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import { Helmet } from "react-helmet";
import logo from "../../assets/logo1.png";
function Home() {
  const {
    noteContentRef,
    noteTitleRef,
    isNote,
    isSeen,
    handleNotes,
    handleSaveNote,
    deleteNote,
    getNotes,
    setIsSeen,
  } = useNotes();
  useEffect(() => {
    getNotes();
  }, []);
  const { auth, setReservedPatient, setPatientState } = UseContext();
  const navigate = useNavigate();
  const { reservePatient } = usePatients();
  return (
    <div className="home flex flex-column g-1 w-100">
      <Helmet>
        <link rel="icon" href={logo} />
        <title>Dentists World | Home</title>
      </Helmet>
      <Title icon={<AiTwotoneHome />} title="الصفحة الرئيسية" />
      <div className="home__boxes rtl">
        <HomeBox title="أهلاً و سهلاً">
          <div className="welcome__box flex g-1 align-center">
            <div className="welcome_image">
              <img src={welcome} alt="" />
            </div>
            <div className="welcome_info fs flex flex-column g-1 ltr">
              <div className="dent_image">
                <img src={dentist} alt="" />
              </div>
              <div className="flex g-1 details">
                <span className="cl-t2">D:</span>
                <div className="flex align-center">
                  <span className="cl-bl bold">D</span>
                  <span className="cl-t">octor</span>
                  <span className="cl-bl flex icon ml-1">
                    <BiPlusMedical />
                  </span>
                </div>
              </div>
              <div className="flex g-1 details ">
                <span className="cl-t2">EN:</span>
                <div className="flex align-center">
                  <span className="cl-m bold">EN</span>
                  <span className="cl-t">gineer</span>
                  <span className="cl-m flex icon ml-1">
                    <MdEngineering />
                  </span>
                </div>
              </div>
              <div className="flex g-1 details">
                <span className="cl-t2">TIST:</span>
                <div className="flex align-center">
                  <span className="cl-t">ar</span>
                  <span className="cl-g bold">TIST</span>
                  <span className="icon flex cl-g ml-1">
                    <FaPaintBrush />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </HomeBox>
        <HomeBox title="مذكرة" extra="overflow-auto">
          {isSeen && auth!.notes.length > 0 ? (
            <>
              <div className="notes">
                {auth?.notes?.map((note) => (
                  <div
                    className="flex flex-column g-1 note radius p-1 rtl w-100"
                    key={note.id}
                  >
                    <h3 className="cl-b fs-small">{note.title}</h3>
                    <div
                      className="line w-100 blue-bg"
                      style={{
                        height: "2px",
                      }}
                    ></div>
                    <p className="cl-t fs-small">{note.content}</p>
                    <div className="controller flex justify-center g-2 w-100">
                      <Button
                        bgColor="red_gradient_bg"
                        content=""
                        icon={<BsFillTrashFill />}
                        clickFunction={() => deleteNote(note.id)}
                        extraStyles="w-100"
                        valid={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                bgColor="blue_gradient_bg"
                icon={<BsBack />}
                content="رجوع إلى الوراء"
                color="cl-w"
                fontSize="fs-small"
                clickFunction={() => setIsSeen(false)}
                valid={true}
                extraStyles="w-100"
              />
            </>
          ) : (
            <>
              <div className="w-100 flex flex-column g-2">
                <input
                  type="text"
                  className="cloudy-bg smooth cl-b bold w-100 flex-1 radius note_title"
                  placeholder="عنوان المذكرة"
                  ref={noteTitleRef}
                  onChange={handleSaveNote}
                />
                <textarea
                  className="input-filed smooth cloudy-bg cl-b bold radius w-100 flex-1 rtl p-1 note_content"
                  placeholder="اكتب مذكرتك"
                  style={{ minHeight: "100px" }}
                  ref={noteContentRef}
                  onChange={handleSaveNote}
                />
                <Button
                  bgColor={isNote ? "blue_gradient_bg" : "gray-bg"}
                  color={isNote ? "cl-w" : "cl-t"}
                  content="تسجيل في المذكرة"
                  icon={<GiSaveArrow />}
                  extraStyles={
                    isNote
                      ? "pointer fs-b-small w-100"
                      : "mouse-none fs-b-small w-100"
                  }
                  valid={true}
                  clickFunction={handleNotes}
                />
              </div>
              {auth?.notes && auth?.notes.length > 0 ? (
                <Button
                  bgColor="sunny_gradient_bg"
                  content={`تصفح المذكرة (${auth?.notes.length})`}
                  icon={<FaEye />}
                  color="cl-w"
                  fontSize="fs-small"
                  valid={true}
                  extraStyles="w-100"
                  clickFunction={() => setIsSeen(true)}
                ></Button>
              ) : (
                <p className="cl-t txt-c">لا يوجد ملاحظات لعرضها</p>
              )}
            </>
          )}
        </HomeBox>
        <HomeBox title="تواصل معنا">
          <ul className="flex flex-column g-2">
            {social.map((item, id) => (
              <li
                className="p-1 flex align-center g-1 ltr radius"
                style={{ backgroundColor: item.color }}
                key={id}
              >
                <div className="icon cl-w fs-med flex">
                  <item.icon />
                </div>
                <p className="cl-w">{item.address}</p>
              </li>
            ))}
          </ul>
        </HomeBox>
        <HomeBox title="رسائل">
          <p className="cl-t2 ltr">
            اكتب لنا أي ملاحظات حول مشاكل واجهتك ، أفكار ممكن تساعد بتطوير
            التطبيق ، و أي شي بتحبه
          </p>
          <div className="flex flex-column g-2 flex-1">
            <textarea
              name="notes"
              className="cloudy-bg cl-b flex-1 textarea p-1 radius bold"
              style={{
                minHeight: "100px",
              }}
            ></textarea>
            <Button
              bgColor="blue_gradient_bg"
              content="أرسل ملاحظاتك"
              icon={<FaTelegram />}
              fontSize="fs-b-small"
              extraStyles="w-100"
              valid={true}
            />
          </div>
        </HomeBox>
      </div>
      <div className="w-100 radius box-shadow flex flex-column txt-e g-2 p-1 white-bg">
        <h2 className="main-title">الحالات المحجوزة</h2>
        <div className="flex align-center g-1 flex-wrap">
          {auth?.reservedCases && auth?.reservedCases.length > 0 ? (
            <>
              {auth.reservedCases.map((reservedCase, index) => (
                <div
                  className="p-1 cloudy-bg radius flex flex-column g-2 w-100"
                  style={{
                    border: "2px solid #cccc",
                  }}
                  key={index}
                >
                  <div className="flex align-center g-1">
                    <p className="bold">الاسم :</p>
                    <p className="cl-t2">{reservedCase.fullName}</p>
                  </div>
                  <div className="flex align-center g-1">
                    <p className="bold">العيادات :</p>
                    <div className="flex align-center g-2">
                      {reservedCase.clinics.map((clinic) => (
                        <p className="cl-t2 clinic-name relative" key={clinic}>
                          {clinic}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex align-center g-1">
                    <Button
                      bgColor="blue_gradient_bg"
                      content="خطة المعالجة"
                      icon={<FaNotesMedical />}
                      extraStyles="fs-small w-50"
                      valid={true}
                      clickFunction={() => {
                        setReservedPatient(reservedCase);
                        setPatientState!(undefined);
                        navigate("/treatmentPlan");
                      }}
                    />
                    {reservedCase.clinics.length > 0 ? (
                      <Button
                        bgColor="red_gradient_bg"
                        content="فك الحجز"
                        icon={<CgCloseR />}
                        extraStyles="w-50"
                        valid={true}
                        clickFunction={() => {
                          reservePatient(reservedCase._id);
                        }}
                      />
                    ) : (
                      <Button
                        bgColor="green_gradient_bg"
                        content="تمت معالجة المريض"
                        icon={<CgCheckR />}
                        clickFunction={() => {
                          reservePatient(reservedCase._id);
                        }}
                        valid={true}
                        extraStyles="w-50"
                      />
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="w-100 p-1 sunny_gradient_bg fs-small cl-w bold flex justify-center ">
                لا يوجد حالات لعرضها
              </p>
              <Button
                bgColor="blue_gradient_bg"
                content="احجز حالة"
                icon={<MdNoteAdd />}
                extraStyles="m-auto w-50"
                valid={true}
                fontSize="fs-b-small"
                clickFunction={() =>
                  navigate("/reservation", { replace: true })
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
