import React, { useState, useEffect } from "react";

const Demo = () => {
  const [value, setValue] = useState("");
  const LOCAL_STORAGE_KEY = "testvalue";

  useEffect(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      setValue(storedValue);
    }
    console.log(localStorage.getItem("userData"));
  }, []);

  const handleSubmit = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
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
