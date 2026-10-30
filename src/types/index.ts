export type TaskStatus = "Todo"|"inProgress"|"done";
export type TaskPriority = "low"|"medium"|"high";

export interface Project {
    id: number;
    name: string;
    description: string;
}
 export interface Task {
    id: number;
    projectId: number;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
 }

 export interface TaskFormData {
  title : string;
  status : TaskStatus;
  priority : TaskPriority;
  dueDate: string
 }

 export interface ProjectFormData {
    name: string;
    description : string
 }