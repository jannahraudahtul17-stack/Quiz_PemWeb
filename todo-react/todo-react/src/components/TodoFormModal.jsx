import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos.js";

const EMPTY = { title: "", description: "", status: "to-do", priority: "low", deadline: "" };

export default function TodoFormModal({ mode = "add", initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ?? EMPTY);
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      setError("Judul dan deadline wajib diisi.");
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  const label = mode === "add" ? "Tambah" : "Update";

  return (
    <div className="overlay" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>{label} Todo</h2>

        <label htmlFor="title">Judul</label>
        <input id="title" name="title" value={form.title} onChange={change} autoFocus />

        <label htmlFor="description">Deskripsi</label>
        <textarea id="description" name="description" rows={3} value={form.description} onChange={change} />

        <div className="row">
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={change}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="priority">Prioritas</label>
            <select id="priority" name="priority" value={form.priority} onChange={change}>
              {PRIORITY_OPTIONS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <label htmlFor="deadline">Deadline</label>
        <input id="deadline" type="date" name="deadline" value={form.deadline} onChange={change} />

        {error && <p className="error">{error}</p>}

        <div className="row actions">
          <button type="button" className="btn btn-red" onClick={onCancel}>Batal</button>
          <button type="submit" className="btn btn-blue">{label}</button>
        </div>
      </form>
    </div>
  );
}
