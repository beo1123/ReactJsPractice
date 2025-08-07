
import { useRef } from "react";
import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

interface TodoListProps {
    todos: Todo[]
    onToggleComplete: (id: number, complete: boolean) => void
    handleDelete: (id: number) => void
    setPage: React.Dispatch<React.SetStateAction<number>>
    hasMore: boolean
    loadingMore: boolean

}


const TodoList: React.FC<TodoListProps> = ({ todos, hasMore, loadingMore, setPage, onToggleComplete, handleDelete }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useInfiniteScroll(containerRef, () => setPage(prev => prev + 1), loadingMore, hasMore);



    if (todos.length === 0) {
        return <p className="text-gray-500 text-center">No todos found.</p>;
    }
    return (
        <div ref={containerRef} className="max-h-96 overflow-y-auto space-y-2">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={onToggleComplete}
                    handleDelete={handleDelete}

                />
            ))}
            {loadingMore && <p className="text-center text-gray-400">Loading more...</p>}
            {!hasMore && <p className="text-center text-gray-400">No more todos.</p>}
        </div>
    );
}

export default TodoList