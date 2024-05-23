import { useState } from "react";

export const TodoForm = ({ handleUpdate, handleCloseDialog, prevTodo }) => {
  const [todo, setTodo] = useState(prevTodo);
  return (
    <div className="p-12">
      <form
        onSubmit={() => {
          handleUpdate(todo);
          handleCloseDialog();
        }}
        method="GET"
        className=""
      >
        <div>
          <label htmlFor="">
            title:
            <input
              className="w-full px-4 py-2 mt-2 text-gray-700  bg-gray-100  focus:bg-gray-200 rounded-md focus:outline-none  focus:shadow-inner"
              type="text"
              value={todo.title ? todo.title : ""}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label htmlFor="">description:</label>
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100  focus:bg-gray-200 rounded-md focus:outline-none  focus:shadow-inner"
            type="text"
            value={todo.description ? todo.description : ""}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100  focus:bg-gray-200 rounded-md focus:outline-none  focus:shadow-inner"
            type="datetime-local"
            value={todo.due_date ? todo.due_date : ""}
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
