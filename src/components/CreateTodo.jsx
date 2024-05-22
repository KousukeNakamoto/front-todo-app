import { useState } from "react";
import { createTodo, getToDos } from "../lib/todo";
import { useParams } from "react-router-dom";

export const CreateTodo = ({ setTodos, handleCloseDialog }) => {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTodo(todo, id);
    getToDos(id, setTodos);
    handleCloseDialog();
  };

  return (
    <div className="p-12">
      <form onSubmit={handleCreate} method="GET" className="">
        <div>
          <label htmlFor="">title:</label>
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 rounded-md focus:outline-none bg-gray-100  focus:bg-gray-200 focus:shadow-inner"
            type="text"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="">description:</label>
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 rounded-md focus:outline-none bg-gray-100 focus:bg-gray-200 focus:shadow-inner"
            type="text"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 rounded-md focus:outline-none bg-gray-100 focus:bg-gray-200 focus:shadow-inner"
            type="datetime-local"
            value={todo.due_date}
            onChange={(e) => setTodo({ ...todo, due_date: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-gray-100 hover:bg-gray-200 mt-4 rounded-md p-2"
        >
          submit
        </button>
      </form>
    </div>
  );
};
