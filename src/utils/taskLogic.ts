
import type { Task, TaskPriority } from "../types";

const priorityOrder: Record<TaskPriority, number> = {
  high: 1,
  medium: 2,
  low: 3,
};

export function filterTasks(
  tasks: Task[],
  searchQuery: string,
  statusFilter: "all" | Task["status"],
  priorityFilter: "all" | Task["priority"],
): Task[] {
  return tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

export function sortTasks(
  tasks: Task[],
  sortBy: "dueDate" | "priority",
): Task[] {
  return [...tasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return a.dueDate.localeCompare(b.dueDate);
    }

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export function isTaskOverdue(task: Task, today: string): boolean {
  return task.dueDate < today && task.status !== "done";
}
