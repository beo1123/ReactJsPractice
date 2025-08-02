
import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[]
    onToggleComplete: (id: number, complete: boolean) => void
    handleDelete: (id: number) => void
}


const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, handleDelete }) => {
    if (todos.length === 0) {
        return <p className="text-gray-500 text-center">No todos found.</p>;
    }
    return (
        <div>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={onToggleComplete}
                    handleDelete={handleDelete}

                />
            ))}
        </div>
    );
}

export default TodoList