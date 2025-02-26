import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { errorResponse, successResponse } from "../helpers/utility";
import { TaskServices } from "../services/task.services";

export const createTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return errorResponse(res, "Validation Error", errors.array());

  let data = req.body;
  let userId = req.user.id;

  try {
    const taskService = new TaskServices();

    const task = await taskService.create({
      title: data.title,
      description: data.description,
      userId: userId,
    });

    return successResponse(res, "Tasks", task.data);
  } catch (err) {
    console.log(err);
    return errorResponse(res);
  }
};

export const allTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return errorResponse(res, "Validation Error", errors.array());

  let userId = req.user.id;

  try {
    const taskService = new TaskServices();
    const task = await taskService.all({ userId });
    return successResponse(res, "All Task", task.data);
  } catch (error) {
    console.log(error);
    return errorResponse(res);
  }
};

export const taskById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return errorResponse(res, "Validation Error", errors.array());

  let id = req.params.id;

  try {
    const taskService = new TaskServices();
    const task = await taskService.findById({ id });
    return successResponse(res, "Task Retrieved", task.data);
  } catch (error) {
    console.log(error);
    return errorResponse(res);
  }
};

export const updateTaskById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return errorResponse(res, "Validation Error", errors.array());

  let data = req.body;
  let userId = req.user.id;

  try {
    const taskService = new TaskServices();
    const task = await taskService.updateById(userId, data);
    return successResponse(res, "Task Updated", task.data);
  } catch (error) {
    console.log(error);
    return errorResponse(res);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return errorResponse(res, "Validation Error", errors.array());

  let taskId = req.params.taskId;
  let userId = req.user.id;

  try {
    const taskService = new TaskServices();
    const task = await taskService.delete({ id: taskId, userId: userId });

    return successResponse(res, "Delete successful", null);
  } catch (err) {
    return errorResponse(res);
  }
};
