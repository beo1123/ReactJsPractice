import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { Todo } from "../types/todo"
import { createTodoApi, deleteTodoApi, fetchTodosApi, updateTodoApi } from "../api/todosApi";
import axios from "axios";
type FilterType = 'all' | 'active' | 'completed'

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>("all")
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const isFetchingRef = useRef(false);

    const getTodos = useCallback(async (page: number, controller?: AbortController) => {

        try {
            setLoadingMore(true)
            isFetchingRef.current = true;
            const data = await fetchTodosApi(page, controller?.signal);
            setTodos(prev => [...prev, ...data]);
            const hasMoreData = data.length > 0;
            setHasMore(hasMoreData);
        }
        catch (e) {
            if (!axios.isCancel(e))
                setError('Fail to fecth data.');
        } finally {
            setLoading(false);
            setLoadingMore(false)

            isFetchingRef.current = false;

        }
    }, []);


    //fetch todo
    useEffect(() => {
        const controller = new AbortController();
        getTodos(page, controller);
        return () => controller.abort();
    }, [page, getTodos]);


    //add todo
    const addTodo = useCallback(async (title: string) => {
        const controller = new AbortController();
        try {
            const newTodoPayload = { userId: 1, title, completed: false };
            setLoading(true)
            const newTodo = await createTodoApi(newTodoPayload, controller.signal);
            setTodos(prevTodo => [...prevTodo, newTodo]);

        } catch (e) {
            if (!axios.isCancel(e))
                setError('fail to add.')
        } finally {
            setLoading(false)
        }
    }, [])
    //toggleComplete
    const toggleComplete = useCallback(async (id: number, currentCompleted: boolean) => {
        const controller = new AbortController();
        try {
            setLoading(true)
            await updateTodoApi(id, { completed: !currentCompleted }, controller.signal);
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === id ? { ...todo, completed: !currentCompleted } : todo
                )
            );
        } catch (e) {
            if (!axios.isCancel(e)) {
                setError('Failed to update todo status.');
            }
        } finally {
            setLoading(false)

        }
    }, [])

    //delete todo
    const deleteTodo = useCallback(async (id: number) => {
        const controller = new AbortController();
        try {
            setLoading(true)

            await deleteTodoApi(id, controller.signal);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)
            );
        } catch (e) {
            if (!axios.isCancel(e))
                setError('fail to delete.')
        } finally {
            setLoading(false)

        }
    }, [])

    // todo by filter 
    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed)
            case 'completed':
                return todos.filter(todo => todo.completed)
            case 'all':
            default:
                return todos;
        }
    }, [todos, filter]);


    return { filteredTodos, loading, error, filter, hasMore, loadingMore, setPage, getTodos, addTodo, toggleComplete, deleteTodo, setFilter }
};
