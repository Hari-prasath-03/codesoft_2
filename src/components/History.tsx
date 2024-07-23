import { Todo } from "../types/todo";

interface todoHistoryProps {
    todos: Todo[];
    deleteAllCompleted: () => void;
}

export default function TodoHistory({todos, deleteAllCompleted}: todoHistoryProps) {
    const completedTodos = todos.filter(todo => todo.completed);

    return(
        <div className="text-center space-y-2">
            <p className="text-sm font-medium">
                {completedTodos.length}/{todos.length} Todos completed.
            </p>
            {completedTodos.length > 0 && (
                <button
                    onClick={deleteAllCompleted}
                    className="text-sm bg-red-500 text-white px-2.5 py-1 rounded-md"
                >Delete all Completed</button>
            )}
        </div>
    );
}