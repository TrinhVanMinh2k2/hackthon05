import React, { useEffect, useState } from "react";
import privateAxios from "../config/privateAxios";
import publicAxios from "../config/publicAxios";

function TodoList(props) {
  const [todo, setTodo] = useState({
    nameTodo: "",
  });
  const [allTodo, setAllTodo] = useState([]);
  const handleAddTodo = async () => {
    if (!todo.id) {
      try {
        const response = await privateAxios.post("/todo", todo);
        alert(response.data.message);
        listTodo();
        setTodo({
          nameTodo: "",
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      try {
        const response = await privateAxios.put(`/todo/${todo.id}`, todo);
        // alert(response.data.message);
        listTodo();
        setTodo({
          nameTodo: "",
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    listTodo();
  }, []);

  const listTodo = async () => {
    try {
      const res = await publicAxios.get("/todo");
      setAllTodo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await publicAxios.delete(`/todo/${id}`);
      console.log(res);
      setAllTodo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (item) => {
    console.log(item);
    setTodo(item);
  };

  return (
    <>
      <h1>Todolist</h1>
      <div>
        <input
          value={todo.nameTodo}
          type="text"
          onChange={(e) => setTodo({ ...todo, nameTodo: e.target.value })}
        />
        <button onClick={handleAddTodo}>{todo.id ? "Sua" : "Them"}</button>
      </div>
      <div>
        {allTodo.map((item, index) => (
          <div key={index}>
            {item.nameTodo}
            <button onClick={() => handleEdit(item)}>sua</button>
            <button onClick={() => handleDelete(item.id)}>xoa</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoList;
