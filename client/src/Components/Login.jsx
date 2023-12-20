import React, { useState } from "react";
import publicAxios from "../config/publicAxios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleGetValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const response = await publicAxios.post("/auth/login", user);
    localStorage.setItem("token", response.data.token);
    alert(response.data.message);
    navigate("/todo");
  };
  return (
    <>
      <h1>Login</h1>
      <input type="text" name="email" onChange={handleGetValue} />
      <br />
      <input type="text" name="password" onChange={handleGetValue} />
      <button onClick={handleLogin}>Dang nhap</button>
    </>
  );
}

export default Login;
