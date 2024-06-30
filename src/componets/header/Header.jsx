import { IoPersonCircleSharp } from "react-icons/io5";
import "../header/Header.css";
const Header = () => {
  return (
    <div className="Header max-w-screen-xl  ">
      <div className="container">
        <div className="header flex:cw-70 h-7 d-flex gap-3 justify-content-center align-items-center border-spacing-8 border-r-4  text-white ">
          <h1 className="name">USERS</h1>
          <IoPersonCircleSharp className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
