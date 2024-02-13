import axios from "axios"
import { Todo } from "../types/todo";
import Todo from "../components/Todos";
import { Project } from "../types/project";

const BASE_URL = "http://localhost:3000"
const axiosInstance = axios.create({baseURL:BASE_URL});

export const getTodoIds = async()=>{
    return (await axiosInstance.get<Todo[]>('todos')).data.map((todo)=>{
        return todo.id
    })
}

export const getTodo = async(id:number)=>{
    return  (await axiosInstance.get<Todo>(`todos/${id}`)).data
}
export const createTodo = async(data:Todo)=>{
    await axiosInstance.post('todos',data)
}
export const updateTodo = async(data:Todo)=>{
    await axiosInstance.put(`todos/${data.id}`,data)
}
export const deleteTodo = async(id:number)=>{
    await axiosInstance.delete(`todos/${id}`)
}
export const getProjects = async(page=3)=>{
    return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`)).data;
}
