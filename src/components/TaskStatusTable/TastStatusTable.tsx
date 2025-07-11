import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Modal,
  Flex,
} from "@mantine/core";
import TaskStatusRow from "./TaskStatusRow";
import TaskStatusForm from "./TaskStatusForm";

interface TaskStatus {
  id: number;
  name: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TaskStatusTable() {
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [editStatusId, setEditStatusId] = useState<number | null>(null);

  useEffect(() => {
    fetchTaskStatuses();
  }, []);

  const fetchTaskStatuses = async () => {
    try {
      const res = await axios.get(`${API_URL}/task-statuses`);
      setTaskStatuses(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${API_URL}/task-statuses`, { name: newStatus });
      resetForm();
      fetchTaskStatuses();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleEdit = (status: TaskStatus) => {
    setEditStatusId(status.id);
    setNewStatus(status.name);
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/task-statuses/${editStatusId}`, { name: newStatus });
      resetForm();
      fetchTaskStatuses();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/task-statuses/${id}`);
      fetchTaskStatuses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const resetForm = () => {
    setNewStatus("");
    setEditStatusId(null);
    setModalOpen(false);
  };

  return (
    <Box>
      <Flex justify="space-between" mb="md">
        <h2>Task Status</h2>
        <Button onClick={() => setModalOpen(true)} color="orange" variant="light">
          + Add Task Status
        </Button>
      </Flex>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>SN</th>
            <th>Task Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskStatuses.map((status, index) => (
            <TaskStatusRow
              key={status.id}
              status={status}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>

      <Modal
        opened={modalOpen}
        onClose={resetForm}
        title={editStatusId ? "Edit Task Status" : "Add Task Status"}
      >
        <TaskStatusForm
          value={newStatus}
          onChange={setNewStatus}
          onSubmit={editStatusId ? handleUpdate : handleAdd}
          onCancel={resetForm}
        />
      </Modal>
    </Box>
  );
}
