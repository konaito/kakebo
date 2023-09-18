import { useState, useEffect } from "react";
import FloatingActionButton from "./FloatingActionButton";
import List from "./List";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [reloadFlag, setReloadFlag] = useState(true);

  useEffect(() => {
    const storedValue = localStorage.getItem("userData");
    if (!storedValue) {
      window.location.href = "/auth";
      return;
    }
    const parsedData = JSON.parse(storedValue);
    setUserData(parsedData);
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("ログアウトしますか？"); // ログアウトの確認
    if (isConfirmed) {
      localStorage.removeItem("userData"); // userDataをlocalStorageから削除
      window.location.href = "/auth"; // 認証ページにリダイレクト
    }
  };

  const handleSubmitData = async (data) => {
    try {
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userId: userData.userId,
          price: data.price,
          rate: String(data.rate),
          summary: data.summary,
          date: data.date,
        }).toString(),
      };

      const endpoint = process.env.REACT_APP_GAS_ENDPOINT_RECEIPTS;
      const response = await fetch(endpoint, params);
      const result = await response.json();
      if (result.status === "success") {
        setReloadFlag(!reloadFlag);
        return { success: true };
      } else {
        return { success: false, message: result.message || "Unknown error" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("削除してもよろしいですか？");
    const endpoint = `${process.env.REACT_APP_GAS_ENDPOINT_DELETERECIPT}?id=${id}`;
    if (isConfirmed) {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.status === "success") {
          setReloadFlag(!reloadFlag);
        } else {
          alert("削除中にエラーが発生しました。");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("削除中にエラーが発生しました。");
      }
    }
  };

  return (
    <>
      <List
        userData={userData}
        onDeleteData={handleDelete}
        reloadFlag={reloadFlag}
        onLogout={handleLogout}
      />
      <FloatingActionButton
        onSubmitData={handleSubmitData}
        userData={userData}
      />
    </>
  );
};

export default Home;
