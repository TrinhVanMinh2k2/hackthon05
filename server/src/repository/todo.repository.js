const db = require("../config/db.config");
// select ten_cot from ten_bang
async function addTodos(nameTodo) {
  const [result] = await db.execute("insert into todo (nameTodo) values (?)", [
    nameTodo,
  ]);
  return result;
}
async function renderTodo(nameTodo) {
  const [result] = await db.execute("select * from todo");
  console.log(result);
  return result;
}
async function deleteTodo(id) {
  const [result] = await db.execute("delete from todo where id = ?", [id]);
  return result;
}
async function updateTodo(nameTodo, id) {
  const [result] = await db.execute(
    "update todo set nameTodo = ? where id = ?",
    [nameTodo, id]
  );
  return result;
}

module.exports = {
  addTodos,
  renderTodo,
  deleteTodo,
  updateTodo,
};
