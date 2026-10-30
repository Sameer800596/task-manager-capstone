import type { FormEvent } from "react";
import type { Task } from "../types";

type EditTaskFormProps = {
  editTitle: string;
  setEditTitle: (value: string) => void;

  editPriority: Task["priority"];
  setEditPriority: (value: Task["priority"]) => void;

  editDueDate: string;
  setEditDueDate: (value: string) => void;

  isUpdating: boolean;

  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function EditTaskForm({
  editTitle,
  setEditTitle,
  editPriority,
  setEditPriority,
  editDueDate,
  setEditDueDate,
  isUpdating,
  onSubmit,
  onCancel,
}: EditTaskFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 grid gap-3 rounded-lg border border-gray-200 bg-white p-4 text-gray-900
       dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <label>
        Task title
        <input
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          required
          className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 text-gray-900
           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </label>

      <label>
        Priority
        <select
          value={editPriority}
          onChange={(event) =>
            setEditPriority(event.target.value as Task["priority"])
          }
          className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 text-gray-900
           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Due date
        <input
          type="date"
          value={editDueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(event) => setEditDueDate(event.target.value)}
          required
          className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 text-gray-900
           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isUpdating}
          className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-200 px-3 py-2 text-gray-900 hover:bg-gray-300
           dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}