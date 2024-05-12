const {join} = require("path");
const { Router } = require("express");
require("express-group-routes");

// Set up base path for controllers and middleware
const basePath = process.cwd();

// Import middleware for protected routes
const verifyToken = require(join(basePath, "middlewares/auth.js"));

// Import controllers
const AuthController = require(join(basePath, "controllers/auth.controller.js"));
const TodoController = require(join(basePath, "controllers/todo.controller.js"));

// Create an Express router
const router = Router();

// Guest routes (no need to verify token)
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
