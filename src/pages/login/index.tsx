import {
  FiLogIn,
  FaUser,
  FaLock,
  BiLogIn,
  RiErrorWarningFill,
  RiRefreshFill,
  VscError,
} from "react-icons/all";
import Title from "../../components/title";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SyntheticEvent, useEffect, useState } from "react";
import { Input } from "../../components/input/Input";
import Button from "../../components/button";
import axios from "../../api/axios";
import { UseContext } from "../../context/Context";
import "./login.scss";
import { motion as m } from "framer-motion";
function Login() {
  const {
    handleBlur,
    handleFocus,
    nameRef,
    passwordRef,
    setIsRegister,
    valid,
    isValid,
    getFormData,
    clearInputs,
    reset,
  } = useAuth();
  const { setAuth } = UseContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const formData = new FormData();
  async function handleSubmit(e: SyntheticEvent) {
    if (isValid) {
      e.preventDefault();
      getFormData(formData);
      setIsLoading(true);
      await axios
        .post("/auth", formData, {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          setIsLoading(false);
          setAuth!({ ...data.user, token: data.token });
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response?.status === 401) {
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
    setIsRegister(false);
  }, []);
  useEffect(() => {
    if (!error) reset();
  }, [error]);
  return (
    <m.div
      className="login flex flex-column g-1 radius relative z-10000"
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
          className="p-2 blue_gradient_bg radius flex flex-column g-2 cl-w flex-1 align-center relative overflow-hidden"
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
            <div className="w-100 absolute centering-content h-100 blue-bg red_gradient_bg smooth t-0 l-0 z-10000">
              <div className="flex-column p-2 flex g-2 absolute t-50 l-50 translate-50 w-100">
                <div className="flex fs-large justify-center">
                  <RiErrorWarningFill />
                </div>
                <div className="flex align-center g-1 w-100 justify-center">
                  <div className="icon flex fs-b-small">
                    <VscError />
                  </div>
                  <p className="cl-w bold">{error}</p>
                </div>
                <Button
                  bgColor="green_gradient_bg"
                  content="أعد المحاولة"
                  icon={<RiRefreshFill />}
                  color="cl-w"
                  extraStyles="m-auto bold fs-b-small"
                  valid={true}
                  clickFunction={() => setError(undefined)}
                />
              </div>
            </div>
          )}
          <Title icon={<FiLogIn />} title="تسجيل الدخول" color="#fff" />
          <Input
            inputName="name"
            inputRef={nameRef}
            inputType="text"
            labelContent="اسم الطالب"
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
            handleFocusAnimation={handleFocus}
            onChange={valid}
          />
          <Button
            bgColor="sunny_gradient_bg"
            content="تسجيل الدخول"
            fontSize="fs-b-small"
            icon={<BiLogIn />}
            extraStyles="w-80 m-auto"
            valid={isValid}
          />
          <div className="fs-small cl-light-w flex align-center g-1">
            <p>ليس لديك حساب ؟ </p>
            <Link to="/register" className="bold cl-w neon pointer">
              سجل الآن !
            </Link>
          </div>
        </form>
      </div>
    </m.div>
  );
}
export default Login;
