import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import "./styles/Call.css";

const Call = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const gasendpointline = process.env.REACT_APP_GAS_ENDPOINT_LINE;
  const LOCAL_STORAGE_KEY = "userData";

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");
      if (!code) {
        setError("コードが提供されていません。");
        return;
      }
      try {
        const response = await fetch(`${gasendpointline}?code=${code}`);
        const result = await response.json();
        if (result.state && result.state < 0) {
          setError(result.message);
        } else {
          // データ取得が成功したらLocalStorageに保存
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
          // ルートパスにリダイレクト
          navigate("/");
        }
      } catch (fetchError) {
        setError("データの取得中にエラーが発生しました。");
      }
    };
    fetchData();
  }, [location, navigate]);

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      {error ? (
        <p>{error}</p>
      ) : (
        <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Call;
