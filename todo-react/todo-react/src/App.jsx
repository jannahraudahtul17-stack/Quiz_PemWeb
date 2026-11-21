import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList.jsx";
import TodoDetail from "./pages/TodoDetail.jsx";
import { dummyTodos } from "./data/dummyTodos.js";

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState("");

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const addTodo = (data) => {
    setTodos((prev) => [...prev, { ...data, id: Date.now() }]);
    notify("Todo berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    notify("Todo berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    notify("Todo berhasil dihapus");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />} />
        <Route path="/todo/:id" element={<TodoDetail todos={todos} onUpdate={updateTodo} />} />
        <Route path="*" element={<p className="page">Halaman tidak ditemukan.</p>} />
      </Routes>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
