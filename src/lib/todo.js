import { apiClient } from "./axios";

export const deleteToDo = async (todo) => {
  const jwt = localStorage.getItem("JWT");
  try {
    const response = await apiClient.post(
      "/delete_todo",
      {
        todo_id: todo.id,
        user_id: todo.user_id,
        title: todo.title,
        description: todo.description,
        due_date: todo.due_date,
      },
      {
        headers: {
          "X-AUTH-TOKEN": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Delete todo failed", error);
    throw error;
  }
};

export const createTodo = async (todo, id) => {
  console.log(todo.duo_date);
  const jwt = localStorage.getItem("JWT");
  try {
    const response = await apiClient.post(
      "/create_todo",
      {
        user_id: id,
        title: todo.title,
        description: todo.description,
        due_date: todo.due_date,
      },
      {
        headers: {
          "X-AUTH-TOKEN": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create todo failed", error);
    throw error;
  }
};

export const updateTodo = async (todo, id) => {
  const jwt = localStorage.getItem("JWT");
  console.log(todo);
  if (!jwt) return;
  try {
    const response = await apiClient.patch(
      "/update_todo",
      {
        todo_id: todo.id,
        user_id: todo.user_id,
        title: todo.title,
        description: todo.description,
        due_date: todo.due_date,
        completed: todo.completed,
      },
      {
        headers: {
          "X-AUTH-TOKEN": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update todo failed", error);
    throw error;
  }
};

export const getToDos = async (id, setTodos) => {
  const jwt = localStorage.getItem("JWT");
  if (!jwt) return;
  const res = await fetch(`http://localhost:8080/todos/${id}`, {
    headers: {
      "X-AUTH-TOKEN": `Bearer ${jwt}`,
    },
  });
  const data = await res.json();
  setTodos(data);
};
