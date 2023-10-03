import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { CryptoProvider } from "./context/CryptoContext.tsx";
import { CompareCryptoProvider } from "./context/CompareCryptoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CryptoProvider>
      <CompareCryptoProvider>
        <App />
      </CompareCryptoProvider>
    </CryptoProvider>
  </React.StrictMode>
);
