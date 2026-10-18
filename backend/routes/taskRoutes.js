import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import {
  idParamSchema,
  createTaskSchema,
  updateTaskSchema,
  updateStatusSchema,
} from "../validators/taskValidator.js";

const router = Router();

router.use(protect); // all task routes are private

router.route("/").get(getTasks).post(validate(createTaskSchema), createTask);

router
  .route("/:id")
  .all(validate(idParamSchema, "params"))
  .get(getTaskById)
  .put(validate(updateTaskSchema), updateTask)
  .delete(deleteTask);

router.patch(
  "/:id/status",
  validate(idParamSchema, "params"),
  validate(updateStatusSchema),
  updateTaskStatus
);

export default router;
