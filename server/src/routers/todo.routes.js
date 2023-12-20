const {
  addTodo,
  render,
  removeTodo,
  updateTodo1,
} = require("../controller/todo.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const todoRouter = (app) => {
  app.post("/todo", verifyToken, addTodo);
  app.get("/todo", render);
  app.delete("/todo/:id", verifyToken, removeTodo);
  app.put("/todo/:id", verifyToken, updateTodo1);
};

module.exports = {
  todoRouter,
};
