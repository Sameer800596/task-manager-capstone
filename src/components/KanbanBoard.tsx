
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { Task, TaskStatus } from "../types";
import { useUpdateTaskMutation } from "../features/api/api";

interface KanbanBoardProps {
  tasks: Task[];
}

const columns: { id: TaskStatus; title: string }[] = [
  { id: "Todo", title: "To do" },
  { id: "inProgress", title: "In progress" },
  { id: "done", title: "Done" },
];

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const [updateTask] = useUpdateTaskMutation();
  const [error, setError] = useState("");

  async function handleDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;

    // Agar task kisi column mein drop nahi hua, to kuch nahi karna.
    if (!destination) return;

    // Agar task usi column mein drop hua, to status change nahi hoga.
    if (destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId as TaskStatus;
    const taskId = Number(draggableId);

    setError("");

    try {
      // Task ka naya status API mein save karo.
      await updateTask({
        id: taskId,
        status: newStatus,
      }).unwrap();
    } catch {
      setError("Task ka status update nahi hua. Dobara try karo.");
    }
  }

  return (
    <div className="w-full">
      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.id
            );

            return (
              <div
                key={column.id}
                className="min-w-0 rounded-xl bg-gray-100 p-3 dark:bg-gray-800"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {column.title}
                  </h3>

                  <span className="rounded-full bg-white px-2 py-1 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                    {columnTasks.length}
                  </span>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-32 space-y-3 rounded-lg p-1 transition-colors ${
                        snapshot.isDraggingOver
                          ? "bg-blue-100 dark:bg-blue-950"
                          : ""
                      }`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={String(task.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`rounded-lg border p-4 shadow-sm ${
               task.dueDate < new Date().toISOString().split("T")[0] &&
                task.status !== "done"
             ? "border-red-500 bg-red-100 dark:bg-red-950"
              : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
               } ${
                 snapshot.isDragging ? "shadow-lg" : ""
              }`}
                            >
                              <p className="break-words font-medium text-gray-900 dark:text-white">
                                {task.title}
                              </p>

                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span
                                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                                    task.priority === "high"
                                      ? "bg-red-100 text-red-700"
                                      : task.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {task.priority}
                                </span>

                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Due: {task.dueDate || "Not set"}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}

                      {columnTasks.length === 0 && (
                        <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                          No tasks here
                        </p>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
