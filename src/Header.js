import React from "react";
import HamburgerMenu from "./HamburgerMenu";

const Header = ({ useage, userData, onLogout, intToStr }) => {
  return (
    <nav className="navbar bg-body-tertiary d-flex px-2 sticky-top">
      <HamburgerMenu userData={userData} onLogout={onLogout} />
      <div className="d-flex align-items-center fs-5">
        {intToStr(useage)}
        <span className="mx-1">円</span>
      </div>
    </nav>
  );
};

export default Header;
