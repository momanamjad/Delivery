import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StoreContextProvider from "./context/Storecontext.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.warn("VITE_GOOGLE_CLIENT_ID is not defined. Google Login will not work.");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
