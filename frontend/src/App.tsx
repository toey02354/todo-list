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

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then((data: ITodo[]) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ToDoCard = (todo: ITodo, index: number) => {
    return (
      <div className="todo-card" key={`todo-${index}`}>
        <p className="todo-card-title">
          {index + 1} {todo.title}
        </p>
        <p className="todo-card-content">{todo.content}</p>
      </div>
    );
  };

  const handleInputTitle = (title: string) => {
    setCurrentTodo((currTodo) => ({ ...currTodo, title }));
  };
  const handleInputContent = (content: string) => {
    setCurrentTodo((currTodo) => ({ ...currTodo, content }));
  };

  const handleSubmitTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !currentTodo.title ||
      !currentTodo.content ||
      currentTodo.title.trim().length === 0 ||
      currentTodo.content.trim().length === 0
    )
      return alert("title or content is empty");
    console.log(todos);
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
          onChange={(e) => handleInputContent(e.target.value)}
        />
        <input type="submit" value="Submit Todo" />
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
