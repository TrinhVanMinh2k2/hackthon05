import { Route, Routes } from "react-router-dom";
import Login from "./Page/Login/Login";
import TodoList from "./Components/Home/TodoList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
