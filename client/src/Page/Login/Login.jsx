import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Form } from "antd";
import publicAxios from "../../config/publicAxios";
import { errors, success } from "../../until/nofication";
import "./Login.scss";

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //login
  const handleLogin = async () => {
    try {
      const res = await publicAxios.post("/login", user);
      localStorage.setItem("token", res.data.token);
      success(res.data.message);
      setTimeout(() => {
        navigate("/todo");
      }, 3000);
    } catch (error) {
      errors(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="form-login">
        <div className="title">Đăng nhập</div>
        <Form
          name="basic"
          className="form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="useremail"
            rules={[{ required: true, message: "vui lòng nhập email" }]}
          >
            <Input
              placeholder="Nhập email"
              name="email"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              name="password"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <button className="btn-add" onClick={handleLogin}>
              Đăng Nhập
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
