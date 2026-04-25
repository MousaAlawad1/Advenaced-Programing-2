import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        done: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.done).length;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>قائمة المهام</h1>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          placeholder="أضف مهمة جديدة"
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px 0 0 6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "0 6px 6px 0",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          إضافة
        </button>
      </div>

      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        المكتملة: {completedCount} / {todos.length}
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              padding: "10px",
              margin: "6px 0",
              background: todo.done ? "#e8f5e9" : "#fff3e0",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.2s",
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                flex: 1,
                marginRight: "10px",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                color: "white",
                backgroundColor: "red",
                border: "none",
                borderRadius: "4px",
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;