import { useState } from "react";
import { createTodo, getToDos } from "../lib/todo";
import { useParams } from "react-router-dom";

export const CreateTodo = ({ setTodos }) => {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    duo_date: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTodo(todo, id);
    getToDos(id, setTodos);
  };

  return (
    <form onSubmit={handleCreate} method="GET">
      <label htmlFor="">
        title:
        <input
          type="text"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </label>
      <label htmlFor="">
        description:
        <input
          type="text"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
      </label>
      <div>
        <label>Due Date:</label>
        <input
          type="datetime-local"
          value={todo.duo_date}
          onChange={(e) => setTodo({ ...todo, duo_date: e.target.value })}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};
