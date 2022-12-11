import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Todos from "../models/Todos";

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { author, title, description, isDone } = req.body;

  try {
    const todos = await Todos.create({
      author,
      title,
      description,
      isDone,
    });
    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  // return Todos.find()
  //   .then((todos) => res.status(200).json({ todos }))
  //   .catch((error) => res.status(500).json({ error }));
  const todos = await Todos.find({}).sort({ createdAt: -1 });
  try {
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const todo = await Todos.findById(id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id) || !todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }

  // return Todos.findById(id)
  //   .then((todo) =>
  //     todo
  //       ? res.status(200).json({ todo })
  //       : res.status(404).json({ message: "Not Found" })
  //   )
  //   .catch((error) => res.status(500).json({ error }));
};
const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const todo = await Todos.findOneAndUpdate({ _id: id }, { ...req.body });

  try {
    if (!mongoose.Types.ObjectId.isValid(id) || !todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }

  // return Todos.findById(todoId)
  //   .then((todo) => {
  //     if (todo) {
  //       todo.set(req.body);

  //       return todo
  //         .save()
  //         .then((todo) => res.status(201).json({ todo }))
  //         .catch((error) => res.status(500).json({ error }));
  //     } else {
  //       res.status(404).json({ message: "Not Found" });
  //     }
  //   })
  //   .catch((error) => res.status(500).json({ error }));
};
const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const todo = await Todos.findOneAndDelete({ _id: id });

  try {
    if (!mongoose.Types.ObjectId.isValid(id) || !todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    res.status(201).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }

  // return Todos.findByIdAndDelete(todoId)
  //   .then((todo) =>
  //     todo
  //       ? res.status(201).json({ message: "deleted" })
  //       : res.status(404).json({ message: "Not Found" })
  //   )
  //   .catch((error) => res.status(500).json({ error }));
};

export default {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
