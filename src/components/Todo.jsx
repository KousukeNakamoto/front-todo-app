import { calculateTimeDifference } from "../lib/lib";
import { Dialog } from "./Dialog";
import { TodoForm } from "./TodoForm";

export const Todo = ({ todo, handleDelete, handleUpdate }) => {
  return (
    <div
      key={todo.id}
      className={`p-4 rounded-lg shadow-md min-w-full ${
        todo.completed ? "bg-blue-100" : "bg-red-100"
      }`}
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
      </div>
      <div className="flex justify-between items-end">
        <div>
          {todo.due_date ? (
            <div className="mt-2 text-sm text-gray-600">
              期限まで残り {calculateTimeDifference(new Date(todo.due_date))}
            </div>
          ) : (
            <div>期限なし</div>
          )}
          <div className="mt-1 text-xs text-gray-500">{todo.due_date}</div>
        </div>
        <div className="flex space-x-4">
          <button
            className="border-2 rounded-md px-2 py-1 bg-red-500 text-white  hover:bg-red-600"
            onClick={() => handleDelete(todo)}
          >
            delete
          </button>
          <Dialog Text="edit" css="bg-blue-500 hover:bg-blue-600 text-white">
            <TodoForm handleUpdate={handleUpdate} prevTodo={todo} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};
