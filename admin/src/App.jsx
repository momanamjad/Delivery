import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Orders from "./pages/orders/Orders";
  import { ToastContainer } from 'react-toastify';

function App() {

  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";


  return <>
  <ToastContainer/>
  <Navbar/>
  <hr />
  <div className="app-content">
 <Sidebar/>
 <Routes>
  <Route path="/add" element={<Add  url={url}/>} />
  <Route path="/list" element={<List  url={url}/>} />
  <Route path="/orders" element={<Orders url={url} />} />
 </Routes>
  </div>
  
  </>;
}

export default App;
