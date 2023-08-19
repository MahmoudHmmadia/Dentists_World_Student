import Sidebar from "./components/sidebar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import TreatmentPlan from "./pages/treatmentPlan";
import States from "./pages/states";
import Login from "./pages/login";
import Register from "./pages/register";
import { UseContext } from "./context/Context";
import Settings from "./pages/profile";
import { useState } from "react";
import Profile from "./components/profile";
import "./sass/app.scss";
import { AnimatePresence } from "framer-motion";
import ServerResponse from "./components/serverResponse";

function App() {
  const { auth, serverResponse, loader } = UseContext();
  const [showenProfile, setShowenProfile] = useState(false);
  const location = useLocation();
  return (
    <div className="app flex rtl relative">
      {serverResponse && (
        <>
          <div className="fixed z-100000 w-100 h-100 opacity-80 black-bg"></div>
          <ServerResponse response={serverResponse} />
        </>
      )}
      {loader && (
        <div className="w-100 absolute centering-content h-100 blue-bg opacity-80 smooth t-0 l-0 progress z-10000">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {auth?.token ? (
        <>
          {showenProfile && (
            <>
              <div className="overlay absolute l-0 t-0 w-100 h-100 z-1000000 black-bg blue opacity-50"></div>
              <Profile setShowenProfile={setShowenProfile} />
            </>
          )}
          <Sidebar />

          <div className="flex flex-column g-3 flex-1 overflow-hidden">
            <div className="content relative flex-1">
              <div className="container w-100">
                <AnimatePresence>
                  <Routes location={location} key={location.pathname}>
                    <Route path="/">
                      <Route index element={<Home />} />
                      <Route path="treatmentPlan" element={<TreatmentPlan />} />
                      <Route path="reservation" element={<States />} />
                      <Route path="profile" element={<Settings />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                  </Routes>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center w-100 content container">
          <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/">
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default App;
