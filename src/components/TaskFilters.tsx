
import type { Task } from "../types";

type TaskFiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  statusFilter: "all" | Task["status"];
  setStatusFilter: (value: "all" | Task["status"]) => void;

  priorityFilter: "all" | Task["priority"];
  setPriorityFilter: (value: "all" | Task["priority"]) => void;

  sortBy: "dueDate" | "priority";
  setSortBy: (value: "dueDate" | "priority") => void;
};

export default function TaskFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
}: TaskFiltersProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full min-w-0 rounded-lg border border-gray-300
         bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />
<select
  aria-label="Filter by status"
  value={statusFilter}
  onChange={(event) =>
    setStatusFilter(event.target.value as "all" | Task["status"])
  }
>
        <option value="all">All Statuses</option>
<option value="Todo">Todo</option>
<option value="inProgress">In Progress</option>
<option value="done">Done</option>
      </select>

      <select
      aria-label="Filter by priority"
        value={priorityFilter}
        onChange={(event) =>
          setPriorityFilter(event.target.value as "all" | Task["priority"])
        }
        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2
         text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
      aria-label="Sort tasks"
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value as "dueDate" | "priority")
        }
        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2
         text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
  );
}
