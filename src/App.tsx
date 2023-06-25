import Sidebar from "./components/sidebar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import TreatmentPlan from "./pages/treatmentPlan";
import States from "./pages/states";
import Login from "./pages/login";
import Register from "./pages/register";
import { UseContext } from "./context/Context";
import Settings from "./pages/settings";
import { useState } from "react";
import Profile from "./components/profile";
import "./sass/app.scss";
import { AnimatePresence } from "framer-motion";

function App() {
  const { auth } = UseContext();
  const [showenProfile, setShowenProfile] = useState(false);
  const location = useLocation();
  return (
    <div className="app flex rtl relative">
      {auth?.token ? (
        <>
          {showenProfile && (
            <>
              <div className="overlay absolute l-0 t-0 w-100 h-100 z-1000000 black-bg blue opacity-50"></div>
              <Profile setShowenProfile={setShowenProfile} />
            </>
          )}
          <Sidebar />
          <div className="flex flex-column g-2 flex-1 overflow-hidden">
            <Navbar setShowenProfile={setShowenProfile} />
            <div className="content relative flex-1">
              <div className="container w-100">
                <AnimatePresence>
                  <Routes location={location} key={location.pathname}>
                    <Route path="/">
                      <Route index element={<Navigate to="home" />} />
                      <Route path="home" element={<Home />} />
                      <Route path="treatmentPlan" element={<TreatmentPlan />} />
                      <Route path="reservation" element={<States />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="home" />} />
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
