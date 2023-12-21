import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import privateAxios from "../../config/privateAxios";
import publicAxios from "../../config/publicAxios";
import { errors, success } from "../../until/nofication";
import "./style.scss";

function TodoList(props) {
  const [todo, setTodo] = useState({
    nameTodo: "",
  });
  const [allTodo, setAllTodo] = useState([]);

  const getTodo = async () => {
    try {
      const res = await publicAxios.get("/todo");
      setAllTodo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleAdd = async () => {
    if (!todo.id) {
      try {
        if (todo.nameTodo === "") {
          errors("Không để trống ô nhập");
        } else {
          const response = await privateAxios.post("/todo", todo);
          success(response.data.message);
          setTimeout(() => {
            getTodo();
          }, 3000);

          setTodo({
            nameTodo: "",
          });
        }
      } catch (error) {
        errors(error.response.data.message);
      }
    } else {
      try {
        const response = await privateAxios.put(`/todo/${todo.id}`, todo);
        success(response.data.message);
        getTodo();
        setTodo({
          nameTodo: "",
        });
      } catch (error) {
        errors(error.response.data.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("Bạn có muốn xóa không")) {
        const res = await privateAxios.delete(`/todo/${id}`);
        setAllTodo(res.data);
        success("Xóa thành công");
      }
    } catch (error) {
      errors(error.response.data.message);
    }
  };
  const handleEdit = async (item) => {
    setTodo(item);
  };

  return (
    <div className="home">
      <h1>Todolist</h1>
      <div className="form">
        <Input
          value={todo.nameTodo}
          type="text"
          placeholder="Nhập Todo"
          onChange={(e) => setTodo({ ...todo, nameTodo: e.target.value })}
        />
        <button onClick={handleAdd}>{todo.id ? "Lưu" : "Thêm"}</button>
      </div>
      <div className="table">
        {allTodo.map((item, index) => (
          <div key={index} className="item">
            <div className="name">{item.nameTodo}</div>
            <div className="edit">
              <span onClick={() => handleEdit(item)}>
                <EditOutlined className="icon-edit" />
              </span>
            </div>
            <div className="delete">
              <span onClick={() => handleDelete(item.id)}>
                <DeleteOutlined className="icon-delete" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
