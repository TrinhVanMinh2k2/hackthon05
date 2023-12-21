const { login } = require("../controller/users.controller");

const usersRouter = (app) => {
  app.post("/login", login);
};

module.exports = { usersRouter };
