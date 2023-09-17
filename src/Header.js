import React from "react";

const Header = ({ useage }) => {
  return (
    <nav className="navbar bg-body-tertiary d-flex px-2">
      <button className="btn">
        <i className="fa-solid fa-bars"></i>
      </button>
      <p className="text-center">{useage}円</p>
    </nav>
  );
};

export default Header;
