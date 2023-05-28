import { useState } from "react";
export default function TodoForm({ onSubmitTodo }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      return;
    }
    onSubmitTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h1 className="text-grey-darkest">Todo List</h1>
        <div className="flex mt-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal-950"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
