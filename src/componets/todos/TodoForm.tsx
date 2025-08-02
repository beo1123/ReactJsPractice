import { useState } from "react";

interface TodoFromProps {
    addTodo: (title: string) => void
}

const TodoFrom: React.FC<TodoFromProps> = ({ addTodo }) => {
    const [title, setTitle] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTodo(title.trim());
            setTitle('');
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="what needs to be done?"
                className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus: ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Todo
            </button>

        </form>
    );
}

export default TodoFrom