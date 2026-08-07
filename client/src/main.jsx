import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/global.css";
import { Toaster } from "react-hot-toast";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>

        <TaskProvider>
          <App />
        </TaskProvider>

        <Toaster
          position="top-right"
        />

      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);