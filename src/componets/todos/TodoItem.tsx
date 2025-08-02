import type { Todo } from "../../types/todo";

interface TodoItemProps {
    todo: Todo
    onToggleComplete: (id: number, complete: boolean) => void
    handleDelete: (id: number) => void

}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, handleDelete }) => {
    return (
        <div className="flex items-center justify-between bg-white p-4 shadow rounded-md mb-2">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    onChange={() => onToggleComplete(todo.id, todo.completed)}
                    checked={todo.completed}
                    className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer" />
                <span className={`${todo.completed ? 'line-through text-green' : ''}`}>
                    {todo.title}
                </span>
            </div>
            <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
            >
                Delete
            </button>
        </div>
    );
}

export default TodoItem;