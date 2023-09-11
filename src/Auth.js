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
    <div className="Auth">
      <div className="d-flex flex-column vh-100 justify-content-between">
        <div className="text-center py-4">
          <h1>WalletHub</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="/src/wallet-solid.svg"
            alt="App Icon"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <div className="py-4">
            <button
              className="btn btn-block"
              style={{ backgroundColor: "#00C300", color: "#fff" }}
              onClick={handleLoginWithLine}
            >
              LINEでログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
