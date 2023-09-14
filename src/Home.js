import { useState, useEffect } from "react";
import FloatingActionButton from "./FloatingActionButton";

const Header = ({ userData }) => {
  const pictureUrl = userData?.pictureUrl;
  const displayName = userData?.displayName;

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={pictureUrl}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          {displayName}
        </a>
      </div>
    </nav>
  );
};

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedValue = localStorage.getItem("userData");
    if (!storedValue) {
      window.location.href = "/auth";
      return;
    }
    const parsedData = JSON.parse(storedValue);
    setUserData(parsedData);
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <>
      <Header userData={userData} />
      <FloatingActionButton />
    </>
  );
};

export default Home;
