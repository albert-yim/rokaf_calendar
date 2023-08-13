import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import VConsole from "vconsole";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const vConsole = new VConsole();
window.onclose = () => {
  vConsole.destroy();
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
