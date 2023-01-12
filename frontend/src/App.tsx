import { useState, useEffect, useRef } from "react";
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

// const path = "http://localhost:4000/api/todo";
const path = "https://fine-plum-colt-robe.cyclic.app/api/todo";

function App() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>(defaultTodo);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

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

  const handleEdit = (todo: ITodo) => {
    setCurrentTodo(todo);
  };

  const handleReset = () => {
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
    _id?: string | undefined,
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

    await fetch(apiEndPoint, options).finally(() => {
      getTodos();
      setIsLoading(false);
      handleReset();
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (
      !currentTodo.title ||
      !currentTodo.content ||
      currentTodo.title.trim().length === 0 ||
      currentTodo.content.trim().length === 0
    )
      return alert("title or content is empty");

    if (currentTodo._id.length > 0) {
      await handleCallAPI(
        "PUT",
        currentTodo._id,
        JSON.stringify({
          ...currentTodo,
          updated: Date.now().toString(),
        })
      );
    } else {
      await handleCallAPI(
        "POST",
        undefined,
        JSON.stringify({
          title: currentTodo.title,
          content: currentTodo.content,
          updated: Date.now().toString(),
          created: Date.now().toString(),
        })
      );
    }
  };

  const handleDelete = async (_id: string) => {
    await handleCallAPI("DELETE", _id);
  };

  const handleSearch = async () => {
    if (searchRef.current) {
      setIsLoading(true);
      const url = path + `?searchTerm=${searchRef.current.value}`;
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setTodos(res))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  interface IToDoCard {
    todo: ITodo
    index: number
  }

  const ToDoCard = ({todo, index}: IToDoCard) => {
    return (
      <span className="todo-card" key={`todo-${index}`}>
        <div className="todo-card-head">
          <div className="card-number">{index + 1}</div>
          <div className="card-manage">
            <div className="card-button" onClick={() => handleEdit(todo)}>
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
      <h1>To Do!</h1>
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
          onClick={handleSubmit}
        >
          {currentTodo._id.length > 0 ? "Edit Todo" : "Create Todo"}
        </button>
        <button
          onClick={handleReset}
          disabled={
            currentTodo._id.length == 0 &&
            currentTodo.title.length == 0 &&
            currentTodo.content.length == 0
          }
        >
          Reset
        </button>
      </div>
      <hr />
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="search to do by (exact) title"
          ref={searchRef}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="todo-card-container">
        {todos.length > 0
          // ? todos.map((todo, index) => ToDoCard(todo, index))
          ? todos.map((todo, index) => <ToDoCard todo={todo} index={index} ></ToDoCard>)
          : "there is no to do..!!"}
      </div>
    </div>
  );
}

export default App;
