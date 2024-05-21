import { useEffect, useState } from "react";
import { getToDos, useAuthGuard, useGetToDos } from "../auth/customHooks";
import { useParams } from "react-router-dom";
import { calculateTimeDifference } from "../lib/lib";

export const Protected = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    duo_date: "",
  });
  const user = useAuthGuard();
  const { id } = useParams();

  useGetToDos(id, setTodos);

  const createTodo = async (e) => {
    e.preventDefault();
    console.log(todo.duo_date);
    const jwt = localStorage.getItem("JWT");
    try {
      await fetch("http://localhost:8080/create_todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          user_id: id,
          title: todo.title,
          description: todo.description,
          due_date: todo.duo_date,
        }),
      });
      getToDos(id, setTodos);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <h1>Error</h1>;
  return (
    <div>
      <h1>Protected Page{user.id}</h1>
      <form onSubmit={createTodo} method="GET">
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
      <button onClick={createTodo}>test</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.title}</div>
          {todo.due_date ? (
            <div>
              <div>{calculateTimeDifference(new Date(todo.due_date))}</div>
            </div>
          ) : null}
          <div>{todo.due_date}</div>
        </div>
      ))}
    </div>
  );
};
