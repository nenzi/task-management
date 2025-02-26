import { Router } from "express";
import {
  resetPassword,
  login,
  register,
  sendOneTimePassword,
  verifyOtp,
  updatePassword,
  changePassword,
  activateUser,
} from "../controller/auth.controller";
import userRouteValidation from "../validate/users";
import {
  allTask,
  createTask,
  deleteTask,
  taskById,
  updateTaskById,
} from "../controller/task.controller";

export const api = Router();

api.post("/register", userRouteValidation("/register"), register);
api.post("/login", userRouteValidation("/login"), login);
api.post("/send-otp", userRouteValidation("/send-otp"), sendOneTimePassword);
api.post("/verify-otp", userRouteValidation("/verify-otp"), verifyOtp);
api.post("/activate", userRouteValidation("/activate"), activateUser);
api.post(
  "/forgot-password",
  userRouteValidation("/forgot-password"),
  resetPassword,
);
api.post(
  "/update-password",
  userRouteValidation("/update-password"),
  updatePassword,
);
api.post(
  "/change-password",
  userRouteValidation("/change-password"),
  changePassword,
);
api.post("/tasks", userRouteValidation("/tasks/create"), createTask);
api.get("/tasks", userRouteValidation("/tasks/all"), allTask);
api.get("/tasks/:id", userRouteValidation("/task/id"), taskById);
api.delete("/tasks/:id", userRouteValidation("/task/delete"), deleteTask);
api.patch("/tasks/:id", userRouteValidation("/task/update"), updateTaskById);
