import { CreateTask, UpdateTask } from "../interface";
import Task from "../models/Task";
import { fnResponse } from "../helpers/utility";

export class TaskServices {
  public async create({ title, description, userId }: CreateTask) {
    try {
      const task = await Task.create({ title, description, userId });
      return fnResponse({
        status: true,
        message: `Task Posted successfully!`,
        data: task,
      });
    } catch (error) {
      // console.log(error);
      return fnResponse({
        status: false,
        message: `An error occured - ${error}`,
      });
    }
  }

  public async all({ userId }) {
    try {
      const tasks = await Task.findAll({ where: { userId: userId } });

      return fnResponse({ status: true, message: `All Tasks!`, data: tasks });
    } catch (error) {
      // console.log(error);
      return fnResponse({
        status: false,
        message: `An error occured - ${error}`,
      });
    }
  }

  public async findById({ id }) {
    try {
      const task = await Task.findOne({ where: { id: id } });

      if (!task)
        return fnResponse({ status: false, message: "Task not found" });

      return fnResponse({ status: true, message: `successful`, data: task });
    } catch (error) {
      // console.log(error);
      return fnResponse({
        status: false,
        message: `An error occured - ${error}`,
      });
    }
  }

  public async updateById(id: string, data: UpdateTask) {
    try {
      const task = await Task.findByPk(id);

      if (!task)
        return fnResponse({ status: false, message: "Task not found" });

      if (data) {
        task.title = data.title || task.title;
        task.description = data.description || task.description;
        task.status = data.status || task.status;

        await task.save();
      }

      return fnResponse({ status: true, message: `successful`, data: task });
    } catch (error) {
      // console.log(error);
      return fnResponse({
        status: false,
        message: `An error occured - ${error}`,
      });
    }
  }

  public async delete({ id, userId }) {
    try {
      const checkTask = await Task.findByPk(id);

      if (checkTask!.userId != userId)
        return fnResponse({
          status: false,
          message: `Cannot delete another user task`,
        });

      const task = await Task.destroy({ where: { id: id } });

      return fnResponse({
        status: true,
        message: `Task Deleted successfully!`,
        data: task,
      });
    } catch (error) {
      // console.log(error);
      return fnResponse({
        status: false,
        message: `An error occured - ${error}`,
      });
    }
  }
}
