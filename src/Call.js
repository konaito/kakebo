import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RingLoader } from 'react-spinners';

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

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f5f5f5'
    }
  };

  return <div>{error ? (<p>{error}</p>):(
    <div style={styles.container}>
      <RingLoader color="#4A90E2" size={150} />
    </div>)}</div>;
};

export default Call;
