import { useEffect, useState } from "react";
import { useAuthGuard, useGetToDos } from "../hooks/customHooks";
import { useParams } from "react-router-dom";
import { calculateTimeDifference } from "../lib/lib";
import { createTodo, deleteToDo, getToDos, updateTodo } from "../lib/todo";
import LogoutComponent from "../components/LogoutComponent";
import { CreateTodo } from "../components/CreateTodo";

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

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTodo(todo, id);
    getToDos(id, setTodos);
  };
  const handleDelete = async (todo) => {
    await deleteToDo(todo);
    getToDos(id, setTodos);
  };

  const handleUpdate = async (todo) => {
    // console.log(todo.completed);
    await updateTodo(todo, id);
    getToDos(id, setTodos);
  };

  if (!user) return <h1>Error</h1>;
  return (
    <div>
      <LogoutComponent />
      <h1>Protected Page{user.id}</h1>
      <CreateTodo setTodos={setTodos} />

      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`w-max flex space-x-5 border-2 rounded-md m-4 p-4 ${
            todo.completed ? "bg-blue-50" : "bg-red-50"
          }`}
          //   onClick={() => console.log(todo.completed)}
        >
          <div>
            <input
              type="checkbox"
              checked={todo.completed ? true : false}
              onChange={() => {
                todo.completed = !todo.completed;
                handleUpdate(todo);
              }}
            />
          </div>
          <div className="w-[30%]">{todo.title}</div>
          {todo.due_date ? (
            <div>
              <div>
                期限まで残り {calculateTimeDifference(new Date(todo.due_date))}
              </div>
            </div>
          ) : null}
          <div>{todo.due_date}</div>
          <button onClick={() => handleDelete(todo)}>delete</button>
        </div>
      ))}
    </div>
  );
};
