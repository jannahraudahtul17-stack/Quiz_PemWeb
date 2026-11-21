import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoFormModal from "../components/TodoFormModal.jsx";

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const todo = todos.find((t) => String(t.id) === id);

  if (!todo) {
    return (
      <main className="page center-page">
        <div className="card">
          <p>Todo tidak ditemukan.</p>
          <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
        </div>
      </main>
    );
  }

  return (
    <div className="detail-bg">
    <main className="page center-page">
      <div className="card detail">
        <div>
          <h3>Judul</h3>
          <p>{todo.title}</p>
          <h3>Deskripsi</h3>
          <div className="desc">{todo.description || "-"}</div>
        </div>
        <div>
          <h3>Status</h3><p>{todo.status}</p>
          <h3>Prioritas</h3><p>{todo.priority}</p>
          <h3>Deadline</h3><p>{todo.deadline}</p>
          <div className="row actions">
            <button className="btn btn-green" onClick={() => navigate("/")}>Kembali</button>
            <button className="btn btn-peach" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoFormModal
          mode="update"
          initial={todo}
          onCancel={() => setShowEdit(false)}
          onSubmit={(data) => { onUpdate(todo.id, data); setShowEdit(false); }}
        />
      )}
    </main>
    </div>
  );
}
