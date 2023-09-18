import React from "react";
import HamburgerMenu from "./HamburgerMenu";

const Header = ({ useage, userData, onLogout }) => {
  return (
    <nav className="navbar bg-body-tertiary d-flex px-2">
      <HamburgerMenu userData={userData} onLogout={onLogout} />
      <div className="d-flex align-items-center fs-5">
        {useage}
        <span className="mx-1">円</span>
      </div>
      {/* <p className="text-center"></p> */}
    </nav>
  );
};

export default Header;
