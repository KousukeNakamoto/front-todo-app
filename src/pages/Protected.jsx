import { useState } from "react";
import { useAuthGuard, useGetToDos } from "../hooks/customHooks";
import { useParams } from "react-router-dom";
import { calculateTimeDifference } from "../lib/lib";
import { deleteToDo, getToDos, updateTodo } from "../lib/todo";
import LogoutComponent from "../components/LogoutComponent";
import { CreateTodo } from "../components/CreateTodo";
import { Dialog } from "../components/Dialog";
import { Todo } from "../components/Todo";

export const Protected = () => {
  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [mode, setMode] = useState(false);

  const user = useAuthGuard();
  const { id } = useParams();

  useGetToDos(id, setTodos);

  const handleDelete = async (todo) => {
    await deleteToDo(todo);
    getToDos(id, setTodos);
  };

  const handleUpdate = async (todo) => {
    await updateTodo(todo, id);
    getToDos(id, setTodos);
  };

  if (!user) return <h1>Error</h1>;
  return (
    <div className="p-6 min-h-screen w-full flex flex-col items-center">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          TODO LIST
        </h1>
        <LogoutComponent />
      </div>

      <div className="space-y-4 flex flex-col items-center w-[60%] ">
        <div className="flex justify-between w-full">
          <div className="space-x-1">
            <button
              className="border-2 rounded-md px-2 py-1"
              onClick={() => setMode(false)}
            >
              All
            </button>
            <button
              className="border-2 rounded-md px-2 py-1"
              onClick={() => {
                setDisplayTodos(
                  todos.filter((todo) => todo.completed === true)
                );
                setMode(true);
              }}
            >
              Completed
            </button>
            <button
              className="border-2 rounded-md px-2 py-1"
              onClick={() => {
                setDisplayTodos(
                  todos.filter((todo) => todo.completed === false)
                );
                setMode(true);
              }}
            >
              Uncompleted
            </button>
          </div>
          <Dialog Text="新規追加">
            <CreateTodo setTodos={setTodos} />
          </Dialog>
        </div>

        {mode ? (
          <>
            {displayTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </>
        ) : (
          <>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
