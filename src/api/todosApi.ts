import axios from "axios";
import type { Todo } from "../types/todo";


const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodosApi = async (signal?: AbortSignal): Promise<Todo[]> => {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await axios.get<Todo[]>(`${API_URL}?_limit=10`, { signal });
    return response.data;

};

export const createTodoApi = async (todo: Omit<Todo, 'id'>, signal?: AbortSignal): Promise<Todo> => {
    const response = await axios.post<Todo>(API_URL, todo, { signal });
    return response.data;
};

export const updateTodoApi = async (id: number, updateFileds: Partial<Todo>, signal?: AbortSignal): Promise<Todo> => {
    const response = await axios.patch<Todo>(`${API_URL}/${id}`, updateFileds, { signal });
    return response.data;
}

export const deleteTodoApi = async (id: number, signal?: AbortSignal): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, { signal });
}