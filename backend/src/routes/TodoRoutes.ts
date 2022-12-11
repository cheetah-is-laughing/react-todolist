import express from "express";
import controller from "../controllers/TodosController";

const router = express.Router();

router.post("/create", controller.createTodo);
router.get("/get/:id", controller.getTodo);
router.get("/get", controller.getTodos);
router.patch("/update/:id", controller.updateTodo);
router.delete("/delete/:id", controller.deleteTodo);

export = router;
