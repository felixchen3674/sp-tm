import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Modal,
  Flex,
} from "@mantine/core";

interface TaskStatus {
  id: number;
  name: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TaskStatusTable() {
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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
      
        </tbody>
      </Table>
    </Box>
  );
}
