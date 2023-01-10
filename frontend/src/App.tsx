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

  useEffect(() => {
    getTodos();
  }, []);

  const handleEditTodo = (todo: ITodo) => {
    console.log(todo);
    setCurrentTodo(todo);
  };

  const handleDelete = () => {};

  const ToDoCard = (todo: ITodo, index: number) => {
    return (
      <span className="todo-card" key={`todo-${index}`}>
        <div className="todo-card-head">
          <div className="card-number">{index}</div>
          <div className="card-manage">
            <div onClick={() => handleEditTodo(todo)}>edit</div>
            <div onClick={handleDelete}>delete</div>
          </div>
        </div>
        <h1 className="todo-card-title">{todo.title}</h1>
        <p className="todo-card-content">{todo.content}</p>
      </span>
    );
  };

  const handleInputTitle = (title: string) => {
    setCurrentTodo((currTodo) => ({ ...currTodo, title }));
  };
  const handleInputContent = (content: string) => {
    setCurrentTodo((currTodo) => ({ ...currTodo, content }));
  };

  const handleSubmitTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      await fetch(path + "/" + currentTodo._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentTodo),
      })
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          getTodos();
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>To Do! today</h1>
      <form className="todo-form" onSubmit={(e) => handleSubmitTodo(e)}>
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
        <input
          type="submit"
          value="Submit Todo"
          className="todo-submit"
          disabled={isLoading}
        />
      </form>
      <div className="todo-card-container">
        {todos.length > 0
          ? todos.map((todo, index) => ToDoCard(todo, index))
          : "there is no to do..!!"}
      </div>
    </div>
  );
}

export default App;
