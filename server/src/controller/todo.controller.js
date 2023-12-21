const {
  addTodos,
  renderTodo,
  updateTodo,
  remove,
} = require("../repository/todo.repository");

async function addTodo(req, res) {
  const { nameTodo } = req.body;
  await addTodos(nameTodo);
  res.status(201).json({
    message: "Bạn đã thêm thành công",
  });
}

async function render(req, res) {
  const result = await renderTodo();
  res.status(200).json(result);
}
async function removeTodo(req, res) {
  const { id } = req.params;
  await remove(id);
  const result = await renderTodo();
  res.status(200).json(result);
}

async function updateTodo1(req, res) {
  const { id } = req.params;
  const { nameTodo } = req.body;
  const result = await updateTodo(nameTodo, id);
  res.status(200).json({
    message: "Đã sửa thành công",
    result,
  });
}

module.exports = {
  addTodo,
  render,
  removeTodo,
  updateTodo1,
};
