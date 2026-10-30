import type { Task } from "../types";

type TaskCardProps = {
  task: Task;
  isOverdue: boolean;
  isUpdating: boolean;
  isDeletingTask: boolean;

  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, status: Task["status"]) => void;
};

export default function TaskCard({
  task,
  isOverdue,
  isUpdating,
  isDeletingTask,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  return (
    <div
         className={`rounded-lg p-5 shadow ${
              isOverdue
      ? "border-2 border-red-500 bg-red-100 dark:bg-red-950 dark:text-white"
      : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
  }`}
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>

      <button
        type="button"
        onClick={() => onEdit(task)}
        className="mr-2 rounded-lg bg-blue-600 px-3 py-2 text-white"
      >
        Edit Task
      </button>

      <button
        type="button"
        disabled={isDeletingTask}
        onClick={() => onDelete(task.id)}
        className="rounded-lg bg-red-600 px-3 py-2 text-white disabled:opacity-50"
      >
        {isDeletingTask ? "Deleting..." : "Delete Task"}
      </button>

      <label className="mt-2 flex items-center gap-2">
        <span>Status:</span>

       
     <select
       value={task.status}
      disabled={isUpdating}
      onChange={(event) =>
         onStatusChange(
          task.id,
          event.target.value as Task["status"]
       )
     }
  className="rounded border border-gray-300 bg-white p-2 text-gray-900
    dark:border-gray-600 dark:bg-gray-700 dark:text-white disabled:opacity-50"
>
  <option value="Todo">Todo</option>
  <option value="inProgress">In Progress</option>
  <option value="done">Done</option>
    </select>

      </label>

      <p className="mt-2">Priority: {task.priority}</p>
      <p>Due date: {task.dueDate}</p>
    </div>
  );
}
