import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Context } from "./contexts/Context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
);
