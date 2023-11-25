import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
