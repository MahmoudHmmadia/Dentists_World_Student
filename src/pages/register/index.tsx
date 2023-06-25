import {
  FaUser,
  FaLock,
  AiFillProfile,
  FaCheckCircle,
  FaList,
  IoImage,
  RiErrorWarningFill,
  VscError,
  RiRefreshFill,
} from "react-icons/all";
import Title from "../../components/title";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "../login/login.scss";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { SyntheticEvent, useEffect, useState } from "react";
import { Input } from "../../components/input/Input";
import Button from "../../components/button";
import axios from "../../api/axios";
import { UseContext } from "../../context/Context";
export interface ErrorI {
  name: string;
  value: string;
}
import { motion as m } from "framer-motion";
function Register() {
  const {
    handleBlur,
    handleFocus,
    setIsRegister,
    getFormData,
    clearInputs,
    reset,
    firstYearRef,
    secondYearRef,
    thirdYearRef,
    fourthYearRef,
    fivYearRef,
    masterYearRef,
    nameRef,
    passwordRef,
    passwordCRef,
    universityIdRef,
    imageRef,
    isValid,
    valid,
  } = useAuth();
  const { setAuth } = UseContext();
  const [isLoading, setIsLoading] = useState(false);
  const [IsSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<undefined | ErrorI[] | string>(undefined);
  const formData = new FormData();
  async function handleSubmit(e: SyntheticEvent) {
    if (isValid) {
      setIsLoading(true);
      e.preventDefault();
      getFormData(formData);
      await axios
        .post("/register", formData)
        .then(({ data }) => {
          setAuth!({ ...data.user, token: data.token });
          setIsLoading(false);
          setIsSuccess(true);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response?.status === 400) {
            const tempErr: ErrorI[] = [];
            err.response?.data!.forEach((e: string) => {
              tempErr.push({
                name: e.split('"')[1].trim(),
                value: e.split('"')[2].trim(),
              });
            });
            setError(tempErr);
          } else if (err.response?.status === 409) {
            setError(err.response.data.message);
          } else {
            setError("يوجد عطل بالسيرفر");
          }
        });
      clearInputs();
    } else {
      e.preventDefault();
    }
  }
  useEffect(() => {
    setIsRegister(true);
  }, []);
  useEffect(() => {
    if (!error) reset();
  }, [error]);
  return (
    <m.div
      className="register flex flex-column g-1 radius relative z-10000"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: "easeOut",
      }}
    >
      <div className="flex flex-column g-2 w-100">
        <div className="image p-1 centering-content">
          <img
            src={logo}
            alt="LOGO"
            style={{
              maxWidth: "300px",
            }}
            className="logo"
          />
        </div>
        <form
          className="p-2 blue_gradient_bg radius flex flex-column g-2 cl-w flex-1 align-center overflow-hidden relative"
          onSubmit={handleSubmit}
        >
          {isLoading && (
            <div className="w-100 absolute centering-content h-100 blue-bg opacity-80 smooth t-0 l-0 progress z-10000">
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {error && (
            <div className="w-100 absolute centering-content h-100 white-bg red_gradient_bg smooth t-0 l-0 z-10000">
              <div className="flex-column p-2 flex g-2 absolute t-50 l-50 translate-50 w-100">
                <div className="flex fs-large justify-center">
                  <RiErrorWarningFill />
                </div>
                {typeof error === "string" ? (
                  <div className="flex g-1 align-center w-100 justify-center">
                    <div className="icon flex fs-b-small">
                      <VscError />
                    </div>
                    <p className="cl-w">{error}</p>
                  </div>
                ) : (
                  <>
                    {error.map((e) => (
                      <div className="flex g-1 align-center">
                        <div className="icon flex fs-b-small">
                          <VscError />
                        </div>
                        <p className="cl-w">
                          {e.name == "password"
                            ? "يجب أن تكون كلمة السر من ثمانية حروف على الأقل"
                            : e.name == "universityID"
                            ? "يجب أن تتأكد من إدخال رقم في حقل رقم الجامعة"
                            : "تأكد من تطابق كلمتي السر"}
                        </p>
                      </div>
                    ))}
                  </>
                )}
                <Button
                  bgColor="green_gradient_bg"
                  content="أعد المحاولة"
                  icon={<RiRefreshFill />}
                  color="cl-w"
                  extraStyles="m-auto fs-b-small"
                  valid={true}
                  clickFunction={() => setError(undefined)}
                />
              </div>
            </div>
          )}
          <Title icon={<AiFillProfile />} title="تسجيل" color="#fff" />
          <Input
            inputName="name"
            inputRef={nameRef}
            inputType="text"
            labelContent="الاسم"
            labelIcon={<FaUser />}
            handleBlurAnimation={handleBlur}
            handleFocusAnimation={handleFocus}
            onChange={valid}
          />
          <Input
            inputName="password"
            inputRef={passwordRef}
            inputType="password"
            labelContent="كلمة السر"
            labelIcon={<FaLock />}
            handleBlurAnimation={handleBlur}
            onChange={valid}
            handleFocusAnimation={handleFocus}
          />
          <Input
            inputName="passwordC"
            inputRef={passwordCRef}
            inputType="password"
            labelContent="تأكيد كلمة السر"
            labelIcon={<FaLock />}
            handleBlurAnimation={handleBlur}
            onChange={valid}
            handleFocusAnimation={handleFocus}
          />
          <Input
            inputName="universityId"
            inputRef={universityIdRef}
            inputType="text"
            labelContent="الرقم الجامعي"
            labelIcon={<FaList />}
            handleBlurAnimation={handleBlur}
            onChange={valid}
            handleFocusAnimation={handleFocus}
          />
          <motion.div
            className={`w-80 pointer sunny_gradient_bg radius ${
              isLoading && "mouse-none"
            }`}
            style={{
              border: "none",
            }}
            whileHover={{
              scale: 1.2,
            }}
          >
            <label
              htmlFor="file"
              className="relative p-1 centering-content g-1 bold pointer"
            >
              <span>أضف صورتك</span>
              <span className="flex">
                <IoImage />
              </span>
              <input
                type="file"
                id="file"
                name="image"
                className="d-none"
                onChange={valid}
                ref={imageRef}
              />
            </label>
          </motion.div>
          <div className="year_chosen w-100">
            <div className="flex align-center g-1 pointer">
              <input
                type="radio"
                id="السنة الأولى"
                name="year"
                className="cool-radio"
                ref={firstYearRef}
                defaultChecked
              />
              <label htmlFor="السنة الأولى" className="pointer fs-small">
                السنة الأولى
              </label>
            </div>
            <div className="flex align-center g-1 pointer fs-small">
              <input
                type="radio"
                id="السنة الثانية"
                name="year"
                className="cool-radio"
                ref={secondYearRef}
              />
              <label htmlFor="السنة الثانية" className="pointer fs-small">
                السنة الثانية
              </label>
            </div>
            <div className="flex align-center g-1 pointer fs-small">
              <input
                type="radio"
                id="السنة الثالثة"
                name="year"
                className="cool-radio"
                ref={thirdYearRef}
              />
              <label htmlFor="السنة الثالثة" className="pointer fs-small">
                السنة الثالثة
              </label>
            </div>
            <div className="flex align-center g-1 pointer">
              <input
                type="radio"
                id="السنة الرابعة"
                name="year"
                className="cool-radio"
                ref={fourthYearRef}
              />
              <label htmlFor="السنة الرابعة" className="pointer fs-small">
                السنة الرابعة
              </label>
            </div>
            <div className="flex align-center g-1 pointer">
              <input
                type="radio"
                id="السنة الخامسة"
                name="year"
                className="cool-radio"
                ref={fivYearRef}
              />
              <label htmlFor="السنة الخامسة" className="pointer fs-small">
                السنة الخامسة
              </label>
            </div>
            <div className="flex align-center g-1 justify-start pointer">
              <input
                type="radio"
                id="ماستر"
                name="year"
                className="cool-radio"
                ref={masterYearRef}
              />
              <label htmlFor="ماستر" className="pointer fs-small flex-1">
                ماستر
              </label>
            </div>
          </div>
          <Button
            bgColor="sunny_gradient_bg"
            content="تسجيل"
            fontSize="fs-b-small"
            icon={<FaCheckCircle />}
            valid={isValid}
            extraStyles="w-80 m-auto"
          />
          <div className="fs-small cl-light-w flex align-center g-1">
            <p> لديك حساب ؟ </p>
            <Link to="/login" className="bold cl-w neon pointer">
              سجل الدخول !
            </Link>
          </div>
        </form>
      </div>
    </m.div>
  );
}
export default Register;
