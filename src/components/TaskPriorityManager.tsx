import axios from "axios";
import React, { useEffect, useState } from "react";

interface TaskPriority {
  id: number;
  priority_name: string;
}

const TaskPriorityManager = () => {
  const [priorities, setPriorities] = useState<TaskPriority[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newPriority, setNewPriority] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPriorities();
  }, []);

  const fetchPriorities = async () => {
    try {
      const res = await axios.get("/api/priorities");
      if (res.data.success) setPriorities(res.data.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleAddOrUpdate = async () => {
    setError("");
    if (!newPriority.trim()) return setError("Priority name is required");
    if (
      priorities.some(
        p =>
          p.priority_name.toLowerCase() === newPriority.trim().toLowerCase() &&
          p.id !== editId,
      )
    ) {
      return setError("Priority name must be unique");
    }

    try {
      if (editId !== null) {
        await axios.put(`/api/priorities/${editId}`, {
          priority_name: newPriority,
        });
        setSuccess("Priority updated successfully");
      } else {
        await axios.post("/api/priorities", { priority_name: newPriority });
        setSuccess("Priority added successfully");
      }
      setNewPriority("");
      setEditId(null);
      setShowForm(false);
      fetchPriorities();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (priority: TaskPriority) => {
    setNewPriority(priority.priority_name);
    setEditId(priority.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this priority?")) return;
    try {
      await axios.delete(`/api/priorities/${id}`);
      setSuccess("Priority deleted");
      fetchPriorities();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <h2>Task Priority Management</h2>
      <button
        onClick={() => {
          setShowForm(true);
          setNewPriority("");
          setEditId(null);
        }}>
        Add New Priority
      </button>

      {showForm && (
        <div style={{ marginTop: 10 }}>
          <input
            type="text"
            placeholder="Enter priority name"
            value={newPriority}
            onChange={e => setNewPriority(e.target.value)}
          />
          <button onClick={handleAddOrUpdate}>
            {editId !== null ? "Update" : "Add"}
          </button>
          <button
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              setNewPriority("");
            }}>
            Cancel
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}
        </div>
      )}

      <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Task Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {priorities.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.priority_name}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {priorities.length === 0 && (
            <tr>
              <td colSpan={3}>No priorities found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskPriorityManager;
