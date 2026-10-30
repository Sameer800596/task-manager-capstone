type TaskFormProps = {
  title: string;
  setTitle: (value: string) => void;

  priority: "low" | "medium" | "high";
  setPriority: (value: "low" | "medium" | "high") => void;

  dueDate: string;
  setDueDate: (value: string) => void;

  isSaving: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
export default function TaskForm({
  title,
  setTitle,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  isSaving,
  onSubmit,
}: TaskFormProps) {
  return (
    <form
      onSubmit={onSubmit}
       className="mb-6 grid gap-3 rounded-lg bg-white p-5 text-gray-900 shadow
        dark:bg-gray-800 dark:text-white"
    >
      <label>
        Task title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 text-gray-900
           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Enter task title"
        />
      </label>

      <label>
        Priority
        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as "low" | "medium" | "high")
          }
          className="mt-1 block w-full rounded border p-2"
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
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(event) => setDueDate(event.target.value)}
          required
          className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 text-gray-900
           dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </label>

      <button
        type="submit"
        disabled={isSaving}
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700
         dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
}
