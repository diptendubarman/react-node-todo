const path = require("path");
const router = require("express").Router();
require("express-group-routes");
// middlewares for protected routes
const verifyToken = require(path.join(process.cwd(), "middlewares/auth.js"));
// controllers
const AuthController = require(path.join(
  process.cwd(),
  "controllers/auth.controller.js"
));
const TodoController = require(path.join(
  process.cwd(),
  "controllers/todo.controller.js"
));

// Geust routes (no need to verify token)
router.group((r) => {
  r.post("/login", AuthController.login);
  r.post("/registration", AuthController.registration);
});

// Protected routes (need to verify token)
router.group("/todos", (r) => {
  r.use(verifyToken);
  r.get("/", TodoController.all);
  r.post("/delete/:id", TodoController.delete);
  r.post("/create", TodoController.create);
});

module.exports = router;
