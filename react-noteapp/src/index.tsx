import React from "react";
import ReactDOM from "react-dom"; // <-- 변경된 부분
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 기존 createRoot 방식 대신 ReactDOM.render를 사용
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
