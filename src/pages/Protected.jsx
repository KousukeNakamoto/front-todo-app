import { useState } from "react";
import { useAuthGuard, useGetToDos } from "../hooks/customHooks";
import { useParams } from "react-router-dom";
import { calculateTimeDifference } from "../lib/lib";
import { deleteToDo, getToDos, updateTodo } from "../lib/todo";
import LogoutComponent from "../components/LogoutComponent";
import { CreateTodo } from "../components/CreateTodo";
import { Dialog } from "../components/Dialog";

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

  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   await createTodo(todo, id);
  //   getToDos(id, setTodos);
  // };

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <Dialog Text="Create New TODO">
        <CreateTodo setTodos={setTodos} />
      </Dialog>
      {/* <LogoutComponent /> */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Protected Page {user.id}
      </h1>

      <div className="space-y-4 flex flex-col items-center">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`p-4 rounded-lg shadow-md w-[50%] ${
              todo.completed ? "bg-blue-100" : "bg-red-100"
            }`}
            //   onClick={() => console.log(todo.completed)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  type="checkbox"
                  checked={todo.completed ? true : false}
                  onChange={() => {
                    todo.completed = !todo.completed;
                    handleUpdate(todo);
                  }}
                />
                <div className="text-lg">{todo.title}</div>
              </div>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(todo)}
              >
                Delete
              </button>
            </div>
            {todo.due_date ? (
              <div className="mt-2 text-sm text-gray-600">
                期限まで残り {calculateTimeDifference(new Date(todo.due_date))}
              </div>
            ) : null}
            <div className="mt-1 text-xs text-gray-500">{todo.due_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
