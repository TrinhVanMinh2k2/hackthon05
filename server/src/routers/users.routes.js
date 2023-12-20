const { login } = require("../controller/users.controller");

const usersRouter = (app) => {
  app.post("/auth/login", login);
};

module.exports = { usersRouter };
