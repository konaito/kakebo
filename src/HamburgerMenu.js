import React, { useState, useEffect, useRef } from "react";

const HamburgerMenu = ({ userData, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const deleteAllData = async () => {
    const endpoint = `${process.env.REACT_APP_GAS_ENDPOINT_DELETEALL}?userId=${userData.userId}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "success") {
        alert("データをすべて削除しました。");
      } else {
        alert("エラーが発生しました。");
      }
    } catch (error) {
      alert("エラーが発生しました。: " + error);
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button className="btn btn-light" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-bars"></i>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="position-fixed top-0 start-0 h-100 bg-light border-end p-4 d-flex flex-column z-1"
          style={{ width: "250px" }}
        >
          <div className="d-flex align-items-center mb-4">
            <img
              src={userData.pictureUrl}
              alt={userData.displayName}
              className="me-3"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <span>{userData.displayName}</span>
          </div>
          <div className="mb-3" onClick={deleteAllData}>
            全データ削除
          </div>
          <div className="mb-3" onClick={onLogout}>
            ログアウト
          </div>
          <div className="flex-grow-1 d-flex align-items-end w-100">
            <p className="text-center m-0 w-100">withuto</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
