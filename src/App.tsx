import { useEffect, useState } from "react";
import { data } from "./data/todos.js";
import AddTodoForm from "./components/AddTodoForm.js";
import TodoList from "./components/TodoList.js";
import TodoHistory from "./components/History.js";
import { Todo } from "./types/todo.js";

function App() {
  const [todos, setTodoes] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    return savedTodos.length > 0 ? savedTodos : data;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodoes((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function addTodo(title: string) {
    setTodoes((prevTodos) => [
      {
        id: Date.now(),
        title: title,
        completed: false,
      },
      ...prevTodos,
    ]);
  }

  function deleteTodo(id: number) {
    setTodoes((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function deleteAllCompletedTodos() {
    setTodoes((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return (
    <>
      <div className="py-10 h-screen space-y-6 overflow-y-auto">
        <div className="font-bold text-3xl text-center">Add Todos</div>
        <div className="max-w-lg mx-auto bg-slate-200 rounded-md p-5 space-y-8">
          <AddTodoForm onSubmit={addTodo} />
          <TodoList
            todos={todos}
            onCompletedChange={setTodoCompleted}
            onDelete={deleteTodo}
          />
        </div>
        <TodoHistory
          todos={todos}
          deleteAllCompleted={deleteAllCompletedTodos}
        />
      </div>
    </>
  );
}

export default App;
