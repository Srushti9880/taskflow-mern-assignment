import Joi from "joi";
import { TASK_STATUSES } from "../models/taskModel.js";

const status = Joi.string().valid(...TASK_STATUSES);

export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ "string.pattern.base": "Invalid task id" }),
});

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().max(500).allow("").optional(),
  status: status.optional(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().max(100),
  description: Joi.string().trim().max(500).allow(""),
  status,
}).min(1);

export const updateStatusSchema = Joi.object({
  status: status.required(),
});
