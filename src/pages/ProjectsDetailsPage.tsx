import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";

import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import EditTaskForm from "../components/EditTaskForm";

import {
  useGetProjectsQuery,
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../features/api/api";

import type { Task } from "../types";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  // API mutations
  const [addTask, { isLoading: isSaving }] = useAddTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeletingTask }] = useDeleteTaskMutation();

  // Add task form state
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");

  // Edit task form state
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState<"low" | "medium" | "high">(
    "medium",
  );
  const [editDueDate, setEditDueDate] = useState("");

  // Search, filter and sorting state
  
        
  // Read and update URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL
  const initialStatus = searchParams.get("status");
  const initialPriority = searchParams.get("priority");
  const initialSort = searchParams.get("sort");

  // Search state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") ?? "",
  );



const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>(
  initialStatus === "Todo" ||
    initialStatus === "inProgress" ||
    initialStatus === "done"
    ? initialStatus
    : "all",
)

  
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | Task["priority"]
  >(
    initialPriority === "low" ||
      initialPriority === "medium" ||
      initialPriority === "high"
      ? initialPriority
      : "all",
  );

  // Sorting state
  const [sortBy, setSortBy] = useState<"dueDate" | "priority">(
    initialSort === "priority" ? "priority" : "dueDate",
  );

  // Update URL whenever filters or sorting change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }

    if (statusFilter !== "all") {
      params.set("status", statusFilter);
    }

    if (priorityFilter !== "all") {
      params.set("priority", priorityFilter);
    }

    if (sortBy !== "dueDate") {
      params.set("sort", sortBy);
    }

    // Update only if the URL parameters are different
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [
    searchQuery,
    statusFilter,
    priorityFilter,
    sortBy,
    searchParams,
    setSearchParams,
  ]);



  async function handleSaveTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!projectId) return;

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (dueDate < new Date().toISOString().split("T")[0]) {
      alert("Due date cannot be in the past.");
      return;
    }

    try {
      await addTask({
        projectId: Number(projectId),
        title: title.trim(),
        status: "Todo",
        priority,
        dueDate,
      }).unwrap();

      setTitle("");
      setPriority("medium");
      setDueDate("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  }

  // Prepare task data for editing
  function handleEditTask(task: Task) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate);
  }

  // Fetch projects and tasks
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetProjectsQuery();

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery();

  if (projectsLoading || tasksLoading) {
    return <p className="p-8">Loading project details...</p>;
  }

  if (projectsError || tasksError) {
    return <p className="p-8">Failed to load project details.</p>;
  }

  // Find the current project
  const project = projects?.find((item) => item.id === Number(projectId));

  // Get tasks belonging to this project
  const projectTasks =
    tasks?.filter((task) => task.projectId === Number(projectId)) ?? [];

  // Filter tasks by search, status and priority
  const filteredTasks = projectTasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort tasks by due date or priority
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return a.dueDate.localeCompare(b.dueDate);
    }

    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Delete a task
  async function handleDeleteTask(taskId: number) {
    const taskToDelete = projectTasks.find((item) => item.id === taskId);

    if (!taskToDelete) return;

    const confirmed = window.confirm(`Delete Task "${taskToDelete.title}"?`);

    if (!confirmed) return;

    try {
      await deleteTask(taskId).unwrap();

      if (editingTaskId === taskId) {
        setEditingTaskId(null);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  
  async function handleStatusChange(taskId: number, status: Task["status"]) {
    try {
      await updateTask({
        id: taskId,
        status,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  }

  if (!project) {
    return <p className="p-8">Project not found.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 text-gray-900 dark:bg-gray-900
     dark:text-white sm:p-6 lg:p-8">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to projects
      </Link>
      <h1 className="mt-6 break-words text-2xl font-bold sm:text-3xl">{project.name}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{project.description}</p>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">Tasks</h2>
      {/* Toggle add task form */}
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="mb-5 rounded bg-blue-600 px-4 py-2 text-white"
      >
        {showForm ? "Cancel" : "Add Task"}
      </button>
      {/* Add task component */}
      
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6
           text-gray-900 shadow-xl dark:bg-gray-800 dark:text-white">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Create New Task</h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100
                 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Close create task popup"
              >
                ✕
              </button>
            </div>

            <TaskForm
              title={title}
              setTitle={setTitle}
              priority={priority}
              setPriority={setPriority}
              dueDate={dueDate}
              setDueDate={setDueDate}
              isSaving={isSaving}
              onSubmit={handleSaveTask}
            />
          </div>
        </div>
      )}
      <div className="mb-4 flex flex-wrap gap-3">
  <button
    type="button"
    onClick={() => setViewMode("list")}
    className={`rounded-lg px-4 py-2 font-medium ${
      viewMode === "list"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
    }`}
  >
    List View
  </button>

  <button
    type="button"
    onClick={() => setViewMode("kanban")}
    className={`rounded-lg px-4 py-2 font-medium ${
      viewMode === "kanban"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
    }`}
  >
    Kanban View
  </button>
</div>
      {/* Search, filters and sorting component */}
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {/* Display filtered and sorted tasks */}
      
      
\      {/* Display tasks in Kanban View */}
      {viewMode === "kanban" ? (
        <KanbanBoard tasks={sortedTasks} />
      ) : (
        /* Display tasks in List View */
        sortedTasks.length === 0 ? (
          <p>No tasks match your search or filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
             
{sortedTasks.map((task) => (
  <div key={task.id}>
    <TaskCard
      task={task}
      isOverdue={
        task.dueDate < new Date().toISOString().split("T")[0] &&
        task.status !== "done"
      }
      isUpdating={isUpdating}
      isDeletingTask={isDeletingTask}
      onEdit={handleEditTask}
      onDelete={handleDeleteTask}
      onStatusChange={handleStatusChange}
    />

    {editingTaskId === task.id && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 text-gray-900 shadow-xl dark:bg-gray-800 dark:text-white">
          <h2 className="mb-5 text-xl font-bold">Edit Task</h2>

          <EditTaskForm
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
            editDueDate={editDueDate}
            setEditDueDate={setEditDueDate}
            isUpdating={isUpdating}
            onSubmit={async (event) => {
              event.preventDefault();

              if (!editTitle.trim()) {
                alert("Please enter a task title.");
                return;
              }

              if (
                editDueDate < new Date().toISOString().split("T")[0]
              ) {
                alert("Due date cannot be in the past.");
                return;
              }

              try {
                await updateTask({
                  id: task.id,
                  title: editTitle.trim(),
                  priority: editPriority,
                  dueDate: editDueDate,
                }).unwrap();

                setEditingTaskId(null);
              } catch (error) {
                console.error("Failed to edit task:", error);
              }
            }}
            onCancel={() => setEditingTaskId(null)}
          />
        </div>
      </div>
    )}
    </div>
  ))}

            
          </div>
        )
      )}

    </main>
  );
}
