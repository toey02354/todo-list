import { useState, useEffect, FormEvent } from "react";
import "./App.css";

interface ITodo {
  _id: string;
  title: string;
  content: string;
  created: string;
  updated: string;
}

const defaultTodo: ITodo = {
  _id: "",
  content: "",
  created: "",
  title: "",
  updated: "",
};

const path = "http://localhost:4000/api/todo";

function App() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>(defaultTodo);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTodos = async () => {
    await fetch(path)
      .then((res) => res.json())
      .then((data: ITodo[]) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditTodo = (todo: ITodo) => {
    setCurrentTodo(todo);
  };

  const handleResetTodo = () => {
    console.log("clear");
    setCurrentTodo(defaultTodo);
  };

  const handleInputTitle = (title: string) => {
    setCurrentTodo((currTodo) => ({ ...currTodo, title }));
  };
  const handleInputContent = (content: string) => {
    setCurrentTodo((currTodo) => ({ ...currTodo, content }));
  };

  const handleCallAPI = async (
    method: string,
    _id?: string,
    body?: BodyInit | null | undefined
  ) => {
    let apiEndPoint = _id ? path + "/" + _id : path;

    let options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body != null || undefined) {
      Object.assign(options, { body });
    }

    await fetch(apiEndPoint, options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getTodos();
        setIsLoading(false);
        handleResetTodo();
      });
  };

  const handleSubmitTodo = async () => {
    setIsLoading(true);
    if (
      !currentTodo.title ||
      !currentTodo.content ||
      currentTodo.title.trim().length === 0 ||
      currentTodo.content.trim().length === 0
    )
      return alert("title or content is empty");
    console.log(todos);

    if (currentTodo._id.length > 0) {
      await handleCallAPI(
        "PUT",
        currentTodo._id,
        JSON.stringify({
          ...currentTodo,
          updated: new Date().toString(),
        })
      );
    } else {
      await handleCallAPI(
        "POST",
        JSON.stringify({
          ...currentTodo,
          updated: new Date().toString(),
          created: new Date().toString(),
        })
      );
    }
  };

  const handleDelete = async (_id: string) => {
    await handleCallAPI("DELETE", _id);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const ToDoCard = (todo: ITodo, index: number) => {
    return (
      <span className="todo-card" key={`todo-${index}`}>
        <div className="todo-card-head">
          <div className="card-number">{index + 1}</div>
          <div className="card-manage">
            <div className="card-button" onClick={() => handleEditTodo(todo)}>
              edit
            </div>
            <div className="card-button" onClick={() => handleDelete(todo._id)}>
              delete
            </div>
          </div>
        </div>
        <h1 className="todo-card-title">{todo.title}</h1>
        <p className="todo-card-content">{todo.content}</p>
      </span>
    );
  };

  return (
    <div className="App">
      <h1>To Do! today</h1>
      <div className="todo-form">
        <label htmlFor="title" className="todo-label">
          (To do) Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="todo-input"
          placeholder="today goal"
          value={currentTodo.title}
          onChange={(e) => handleInputTitle(e.target.value)}
        />
        <label htmlFor="content" className="todo-label">
          What to do
        </label>
        <input
          type="text"
          name="content"
          id="content"
          className="todo-input"
          placeholder="I will run 10 km"
          value={currentTodo.content}
          onChange={(e) => handleInputContent(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button
          className="todo-submit"
          disabled={isLoading}
          onClick={handleSubmitTodo}
        >
          {currentTodo._id.length > 0 ? "Edit Todo" : "Create Todo"}
        </button>
        <button
          onClick={handleResetTodo}
          disabled={
            currentTodo._id.length == 0 &&
            currentTodo.title.length == 0 &&
            currentTodo.content.length == 0
          }
        >
          Reset
        </button>
      </div>
      <div className="todo-card-container">
        {todos.length > 0
          ? todos.map((todo, index) => ToDoCard(todo, index))
          : "there is no to do..!!"}
      </div>
    </div>
  );
}

export default App;
