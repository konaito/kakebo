import { useState } from "react";

const Auth = () => {
  const [state, setState] = useState(Math.random().toString(36).substring(7));

  const handleLoginWithLine = () => {
    const channelId = process.env.REACT_APP_LINE_CHANNEL_ID;
    const redirectUri = process.env.REACT_APP_LINE_REDIRECT_URI;
    const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=${state}&scope=profile`;
    window.location.href = url;
  };

  return (
    <div className="Auth d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">WalletHub</h1>
      <img
        src="/src/wallet-solid.svg"
        alt="App Icon"
        className="img-fluid mb-4"
        style={{ maxWidth: "100px" }}
      />
      <button
        className="btn btn-block"
        style={{ backgroundColor: "#00C300", color: "#fff" }}
        onClick={handleLoginWithLine}
      >
        LINEでログイン
      </button>
    </div>
  );
};

export default Auth;
