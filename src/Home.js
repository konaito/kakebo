import { useState, useEffect } from "react";
import FloatingActionButton from "./FloatingActionButton";
import List from "./List";

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
  const handleSubmitData = async (data) => {
    try {
      // POSTメソッドのパラメーターを設定
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userId: userData.userId,
          price: data.price,
          rate: String(data.rate), // 数値を文字列に変換
          summary: data.summary,
          date: data.date,
        }).toString(),
      };

      const endpoint = process.env.REACT_APP_GAS_ENDPOINT_RECEIPTS;
      // APIを叩く
      const response = await fetch(endpoint, params);

      // レスポンスをチェックして結果を取得
      const result = await response.json();
      if (result.status === "success") {
        return { success: true };
      } else {
        return { success: false, message: result.message || "Unknown error" };
      }
    } catch (error) {
      // エラーハンドリング
      return { success: false, message: error.message };
    }
  };

  return (
    <>
      <Header userData={userData} />
      <List userData={userData} />
      <FloatingActionButton
        onSubmitData={handleSubmitData}
        userData={userData}
      />
      ;
    </>
  );
};

export default Home;
