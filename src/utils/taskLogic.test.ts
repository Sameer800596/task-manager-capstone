
import { describe, it, expect } from "vitest";
import type { Task } from "../types";
import { filterTasks, sortTasks, isTaskOverdue } from "./taskLogic";

const tasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: "Build API",
    status: "Todo",
    priority: "high",
    dueDate: "2026-11-10",
  },
  {
    id: 2,
    projectId: 1,
    title: "Write tests",
    status: "inProgress",
    priority: "medium",
    dueDate: "2026-11-05",
  },
  {
    id: 3,
    projectId: 1,
    title: "Fix UI",
    status: "done",
    priority: "low",
    dueDate: "2026-10-20",
  },
];

describe("Task filtering and sorting", () => {
  it("searches task titles without case sensitivity", () => {
    expect(filterTasks(tasks, "BUILD", "all", "all").map(t => t.id))
      .toEqual([1]);
  });

  it("filters tasks by status", () => {
    expect(filterTasks(tasks, "", "inProgress", "all").map(t => t.id))
      .toEqual([2]);
  });

  it("filters tasks by priority", () => {
    expect(filterTasks(tasks, "", "all", "high").map(t => t.id))
      .toEqual([1]);
  });

  it("combines search and priority filters", () => {
    expect(filterTasks(tasks, "api", "all", "high").map(t => t.id))
      .toEqual([1]);
  });

  it("returns all tasks when no filters are selected", () => {
    expect(filterTasks(tasks, "", "all", "all")).toHaveLength(3);
  });

  it("sorts tasks by due date ascending", () => {
    expect(sortTasks(tasks, "dueDate").map(t => t.id))
      .toEqual([3, 2, 1]);
  });

  it("sorts tasks by priority: high, medium, low", () => {
    expect(sortTasks(tasks, "priority").map(t => t.priority))
      .toEqual(["high", "medium", "low"]);
  });

  it("does not mutate the original task array when sorting", () => {
    const originalIds = tasks.map(t => t.id);
    sortTasks(tasks, "dueDate");
    expect(tasks.map(t => t.id)).toEqual(originalIds);
  });
});

describe("Overdue task logic", () => {
  it("marks a past-due unfinished task as overdue", () => {
    expect(isTaskOverdue(tasks[0], "2026-11-11")).toBe(true);
  });

  it("does not mark a completed task as overdue", () => {
    expect(isTaskOverdue(tasks[2], "2026-11-11")).toBe(false);
  });
});
