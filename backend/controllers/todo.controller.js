const Todo = require("../models/todo.model");

class TodoController {
  static async all(req, res, next) {
    try {
      const todos = await Todo.all();
      res.json(todos);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const data = {
        ...req.body,
        ...{ user_id: Number(req.userId) },
      };

      const todo = await Todo.create(data);

      res.json(todo);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const todo = await Todo.delete({ id: Number(req.params.id) });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      return res.status(200).json({ message: "delete success." });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodoController;
