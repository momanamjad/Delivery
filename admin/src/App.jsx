import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Orders from "./pages/orders/Orders";
  import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from "react";
import Login from "./pages/login/Login";

function App() {
  const url = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  if (!token) {
    return (
      <>
        <ToastContainer />
        <Login url={url} setToken={setToken} />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navbar setToken={setToken} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
