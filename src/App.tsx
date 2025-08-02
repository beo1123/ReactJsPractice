import './App.css';
import FilterDropdown from './componets/todos/FilterDropdown';
import TodoFrom from './componets/todos/TodoForm';
import TodoList from './componets/todos/TodoList';
import LoadingScreen from './componets/ui/LoadingScreen';
import { useTodos } from './hooks/useTodos';

function App() {
  const { loading, error, filteredTodos, filter, toggleComplete, deleteTodo, addTodo, setFilter } = useTodos();

  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-300 to-cyan-500 p-4">
      <div className="container mx-auto p-4 max-w-2xl bg-gray-50 rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Todo List App</h1>
        <TodoFrom addTodo={addTodo} />
        <div className='flex justify-end mb-4'>
          <FilterDropdown currentFilter={filter} onFilterChange={setFilter} />
        </div>
        <TodoList
          todos={filteredTodos}
          onToggleComplete={toggleComplete}
          handleDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
