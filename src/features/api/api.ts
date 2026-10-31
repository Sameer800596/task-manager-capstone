  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
   import type { Project, Task } from "../../types";

   const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3001/";

  export const api = createApi({
     reducerPath: "api",

    baseQuery: fetchBaseQuery({
         baseUrl: API_BASE_URL,
    }),

    tagTypes: ["Project", "Task"],

    endpoints: (builder)=> ({
        getProjects:builder.query<Project[],void>({
            query: ()=> "projects",
            providesTags: ["Project"],
        }),
        getTasks: builder.query<Task[],void>({
            query: ()=> "tasks",
            providesTags:["Task"],
        }),
        addTask:builder.mutation<Task,Omit<Task,"id">>({
             query:(newTask)=>({
                url: "tasks",
                method:"POST",
                body: newTask,
             }),
             invalidatesTags:["Task"]
        }),
        updateTask: builder.mutation<
        Task,
        {id:number; status?: Task["status"]; priority?: Task["priority"]
            dueDate?: string; title?: string
        }
        >({
            query: ({id,...changes})=>({
                url:`tasks/${id}`,
                method:"PATCH",
                body: changes,
            }),
            invalidatesTags: ["Task"],
        }),
        addProject: builder.mutation<Project,Omit<Project,"id">>({
             query: (newProject) => ({
                url: "projects",
                method: "POST",
                body: newProject,

             }),
             invalidatesTags: ["Project"],
        }),
         updateProject: builder.mutation<Project,{ id: number; name:string; description:string; }>({
            query: ({id, ...changes})=>({
                url: `projects/${id}`,
                method: "PATCH",
                body: changes,
            }),
            invalidatesTags: ["Project"],
         }),
         deleteProject: builder.mutation<void,number>({
            query: (id)=>({
                url: `projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project","Task"],
         }),
         deleteTask: builder.mutation<void, number>({
            query: (id)=>({
                url: `tasks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Task"],
         }),

        
    


    })

});

export const { useGetProjectsQuery, useGetTasksQuery, useAddTaskMutation,
     useUpdateTaskMutation, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation, useDeleteTaskMutation } = api;