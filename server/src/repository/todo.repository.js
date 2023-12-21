const db = require("../config/db.config");


async function addTodos(nameTodo) {
  const [result] = await db.execute("INSERT INTO todos (nameTodo) VALUES (?)", [
    nameTodo,
  ]);
  return result;
}
async function renderTodo(nameTodo) {
  const [result] = await db.execute("SELECT * FROM todos");
  return result;
}

async function remove(id) {
  const [result] = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
  return result;
}
async function updateTodo(nameTodo, id) {
  const [result] = await db.execute(
    "UPDATE todos SET nameTodo = ? WHERE id = ?",
    [nameTodo, id]
  );
  return result;
}

module.exports = {
  addTodos,
  renderTodo,
  remove,
  updateTodo,
};
