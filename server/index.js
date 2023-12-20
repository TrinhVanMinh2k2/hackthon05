const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { usersRouter } = require("./src/routers/users.routes");
const { todoRouter } = require("./src/routers/todo.routes");
const app = express();
require("dotenv").config();
//Set up
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Su dung router
usersRouter(app);
todoRouter(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
