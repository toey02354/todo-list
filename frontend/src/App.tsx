import { useState } from "react";
import "./App.css";

interface ITodo {
  id: string;
  title: string;
  content: string;
  created: string;
  updated: string;
}

function App() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>();
  const [todos, setTodos] = useState<ITodo[]>([]);

  const ToDoCard = (todo: ITodo, index: number) => {
    return (
      <div className="todo-card">
        <p className="todo-card-title">
          {index + 1} {todo.title}
        </p>
        <p className="todo-card-content">{todo.content}</p>
      </div>
    );
  };

  const handleSubmitTodo = () => {};

  return (
    <div className="App">
      <h1>To Do! today</h1>
      <form className="todo-form" onSubmit={handleSubmitTodo}>
        <label htmlFor="title" className="todo-label">
          (To do) Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="todo-input"
          placeholder="today goal"
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
        />
        <button type="submit" onClick={handleSubmitTodo}>
          submit todo
        </button>
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
