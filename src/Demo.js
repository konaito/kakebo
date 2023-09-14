import React, { useState, useEffect } from "react";

const Demo = () => {
  const [value, setValue] = useState("");
  const LOCAL_STORAGE_KEY = "testvalue";

  useEffect(() => {
    handleSubmit();
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      setValue(storedValue);
    }
    console.log(localStorage.getItem("userData"));
  }, []);

  const handleSubmit = () => {
    // localStorage.setItem("userData",  JSON.stringify({"userId":"U21d4764586fec7bf3e075a445c1fd589","displayName":"内藤剛汰","statusMessage":"工学部数学科","pictureUrl":"https://profile.line-scdn.net/0h_OmrukCNAGBACxVMnz9-HzBbAwpjellyPDpGBnMMWFF1b0Jka28YD3BfVlV-bBBhOT9PViINXgNMGHcGXl38VEc7XVF8OkE2bmRPhQ","isNewUser":false}));
  };

  const handleRemove = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setValue("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <button onClick={handleSubmit} style={{ marginBottom: "10px" }}>
        Submit
      </button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default Demo;
