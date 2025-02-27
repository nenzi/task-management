import request from "supertest";
import app from "../main";
import { TaskServices } from "../services/task.services";
import { client } from "../services/redis";
import { initDB } from "../database";

jest.setTimeout(30000);

jest.mock("../services/task.services");

describe("Task Controller", () => {
  let authToken: string;
  let id = Math.floor(Math.random() * 1000);
  beforeAll(async () => {
    await initDB();
    const loginRes = await request(app)
      .post("/login")
      .send({ email: "nonenzy01+test@gmail.com", password: "@Nonenzy01" });

    authToken = loginRes.body.data;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await client.disconnect(); // ✅ Disconnect Redis after tests
  });

  test("should create a task", async () => {
    const mockTask = {
      id: id,
      title: "Test Task",
      description: "Test Desc",
    };
    TaskServices.prototype.create = jest
      .fn()
      .mockResolvedValue({ data: mockTask });

    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: "Test Task", description: "Test Desc" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Tasks");
    expect(res.body.data).toEqual(mockTask);
  });

  test("should fetch all tasks", async () => {
    const mockTasks = [{ id: id, title: "Task 1" }];
    TaskServices.prototype.all = jest
      .fn()
      .mockResolvedValue({ data: mockTasks });

    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("All Task");
    expect(res.body.data).toEqual(mockTasks);
  });

  test("should fetch a task by ID", async () => {
    const mockTask = { id: id, title: "Task 1" };
    TaskServices.prototype.findById = jest
      .fn()
      .mockResolvedValue({ data: mockTask });

    const res = await request(app)
      .get(`/tasks/${id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task Retrieved");
    expect(res.body.data).toEqual(mockTask);
  });

  test("should update a task", async () => {
    const mockUpdatedTask = { id: id, title: "Updated Task" };
    TaskServices.prototype.updateById = jest
      .fn()
      .mockResolvedValue({ data: mockUpdatedTask });

    const res = await request(app)
      .patch(`/tasks/${id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: "Updated Task" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task Updated");
    expect(res.body.data).toEqual(mockUpdatedTask);
  });

  test("should delete a task", async () => {
    TaskServices.prototype.delete = jest.fn().mockResolvedValue({});

    const res = await request(app)
      .delete(`/tasks/${id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Delete successful");
  });
});
