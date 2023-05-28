import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "./../utils/index";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);

  const config = {
    "Content-Type": "application/json",
    authorization: getCookie("todo-authenticated"),
  };

  const addToto = (todo) => {
    axios
      .post(
        "http://localhost:3000/api/v1/todos/create",
        {
          title: todo,
        },
        { headers: config }
      )
      .then((response) => {
        console.log(response);
        setTodos([
          { id: response.data.id, title: response.data.title },
          ...todos,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteTodoItem = (id) => {
    axios
      .post(
        `http://localhost:3000/api/v1/todos/delete/${id}`,
        {},
        { headers: config }
      )
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTodos = () => {
    axios
      .get("http://localhost:3000/api/v1/todos", { headers: config })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <TodoForm onSubmitTodo={addToto} />
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={onDeleteTodoItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 

<div className="flex mb-4 items-center">
            <p className="w-full text-grey-darkest">
              Add another component to Tailwind Components
            </p>
            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
              Done
            </button>
            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
              Remove
            </button>
          </div>
          <div className="flex mb-4 items-center">
            <p className="w-full line-through text-green">
              Submit Todo App Component to Tailwind Components
            </p>
            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">
              Not Done
            </button>
            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
              Remove
            </button>
          </div>
 */
