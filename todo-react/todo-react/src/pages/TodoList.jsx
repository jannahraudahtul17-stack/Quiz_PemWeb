import { useState } from "react";
import { Link } from "react-router-dom";
import TodoFormModal from "../components/TodoFormModal.jsx";

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />
  </svg>
);

export default function TodoList({ todos, onAdd, onDelete }) {
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = (todo) => {
    if (window.confirm(`Hapus todo "${todo.title}"?`)) onDelete(todo.id);
  };

  return (
    <main className="page">
      <header className="page-head">
        <h1>Todo List</h1>
        <button className="btn btn-pink" onClick={() => setShowAdd(true)}>Tambah Todo</button>
      </header>

      <div className="table-box">
      <table className="table">
        <thead>
          <tr>
            <th>Judul</th><th>Status</th><th>Prioritas</th><th>Deadline</th><th className="center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t) => (
            <tr key={t.id}>
              <td className="truncate" title={t.title}>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td>{t.deadline}</td>
              <td className="center">
                <Link to={`/todo/${t.id}`} className="icon-btn btn-blue" aria-label={`Lihat detail ${t.title}`}><EyeIcon /></Link>
                <button className="icon-btn btn-red" onClick={() => handleDelete(t)} aria-label={`Hapus ${t.title}`}><TrashIcon /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {todos.length === 0 && <p className="empty">Belum ada todo. Klik “Tambah Todo” untuk membuat yang pertama.</p>}

      {showAdd && (
        <TodoFormModal
          mode="add"
          onCancel={() => setShowAdd(false)}
          onSubmit={(data) => { onAdd(data); setShowAdd(false); }}
        />
      )}
    </main>
  );
}
