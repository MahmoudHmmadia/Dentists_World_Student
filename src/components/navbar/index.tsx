import logo from "../../assets/logo.png";
import { FaUserAlt } from "react-icons/all";
import "./navbar.scss";
import { Dispatch } from "react";

function Navbar({
  setShowenProfile,
}: {
  setShowenProfile: Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav className="white-bg pt-1 pb-1 light-box-shadow w-100">
      <div className="container flex align-center justify-between w-100 ">
        <div className="logo">
          <img src={logo} alt="LOGO" />
        </div>
        <ul className="flex align-center g-1 links">
          <li className="pointer" onClick={() => setShowenProfile(true)}>
            <div className="icon circle cl-w blue-bg centering-content">
              <FaUserAlt />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
