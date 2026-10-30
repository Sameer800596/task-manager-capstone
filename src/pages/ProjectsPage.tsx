import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import type { RootState } from "../app/store"


import {
  useGetProjectsQuery,
  useGetTasksQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../features/api/api";
import type { Project } from "../types";



export default function ProjectsPage() {

  const formRef = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);

  const navigate = useNavigate()
  function handleEditProject(project:Project){
  setEditingProjectId(project.id);
  setName(project.name);
  setDescription(project.description);
  setShowForm(true);

  setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);

  }
  function handleLogout(){
  localStorage.removeItem("isLoggedIn");
  navigate("/login",{replace: true})

  }

  async function handleSaveProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if ( editingProjectId !== null){
      await updateProject({
        id: editingProjectId,
        name: name.trim(),
        description: description.trim(),
      }).unwrap();
      }else {
        await addProject({
          name: name.trim(),
          description: description.trim(),
        }).unwrap();
      }
      
      setName("");
      setDescription("");
      setShowForm(false);
      setEditingProjectId(null);
    } catch (error) {
      console.error("Failed to create project", error);
    }
  }
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetProjectsQuery();
  const [addProject, { isLoading: isSaving }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, {isLoading: isDeleting}] = useDeleteProjectMutation();

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery();

  if (projectsLoading || tasksLoading) {
    return <h1 className="p-8">Loading projects and tasks...</h1>;
  }

  if (projectsError || tasksError) {
    return <h1 className="p-8">Failed to load projects or tasks.</h1>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900 dark:bg-gray-900 dark:text-white sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
       <h2 className="text-xl font-semibold">
         {editingProjectId!==null?"Edit Project":"Create Project"}
       </h2>
        
         <button
            type="button"
           onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
        Logout
        </button>
        <button
             type="button"
             onClick={() => dispatch(toggleTheme())}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 dark:border-gray-600 dark:text-white">
           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
           </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
       {isSaving || isUpdating
             ? "Saving..."
              : editingProjectId !== null
             ? "Update Project"
               : "Create Project"}
        </button>
      </div>
      {showForm && (
        <form
        ref={formRef}
          onSubmit={handleSaveProject}
          className="rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600
           dark:bg-gray-700 dark:text-white"
        >
          <label className="grid gap-1">
            Project
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter project name"
              required
              className="rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600
               dark:bg-gray-700 dark:text-white"
            />
          </label>
          <label className="grid gap-1">
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter project description"
              required
              className="rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600
               dark:bg-gray-700 dark:text-white"
            />
          </label>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-gray-800 px-4 py-2 text-white disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Project"}
          </button>
        </form>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects?.map((project) => {
          const projectTasks =
            tasks?.filter((task) => task.projectId === project.id) ?? [];

          const completedTasks = projectTasks.filter(
            (task) => task.status.toLowerCase() === "done",
          ).length;

          const progress =
            projectTasks.length === 0
              ? 0
              : (completedTasks / projectTasks.length) * 100;

          return (
            <div key={project.id}
           className="rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600
            dark:bg-gray-700 dark:text-white">
              <h2 className="mb-2 text-xl font-semibold">{project.name}</h2>

              <p className="mb-3 text-gray-600 dark:text-gray-300">{project.description}</p>

              <p className="mb-2 font-medium">
                {completedTasks} of {projectTasks.length} done
              </p>

              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button type="button"
              onClick={()=>handleEditProject(project)}
              className="mt-3 rounded-lg bg-yellow-500 px-4 py-2 text-white">
                Edit Project
              </button>
              <button type="button"
              disabled={isDeleting}
              onClick={async ()=>{
                const confirmed = window.confirm(`Are you sure you want to delete"${project.name}"`);
                if (confirmed){
                  try{
                    await deleteProject(project.id).unwrap();
                  } catch (error){
                    console.error("Failed to load projects",error)
                  }
                }
              }}
              className="mt-3 ml-2 rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50">
              {isDeleting ? "Deleting..." : "Delete Project"}
              </button>

              <Link
                to={`/projects/${project.id}`}
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                View Project →
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
