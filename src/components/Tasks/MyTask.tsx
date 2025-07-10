import TaskCard from "../TaskCard/TaskCard";

import { Paper, Title } from "@mantine/core";

import { TaskType } from "@/lib/entities/tasks";

const exampleTask1: TaskType = {
  id: "1",
  created_at: "2025-07-07T10:15:00.000Z",
  title: "exampleTask1",
  date: "2025-08-08",
  priority: "Extreme",
  description: "exampleTask1 description",
  user_id: "550e8400-e29b-41d4-a716-446655440000",
  status: "Not Started",
};
const exampleTask2: TaskType = {
  id: "2",
  created_at: "2025-07-08T10:15:00.000Z",
  title: "exampleTask2",
  date: "2025-08-09",
  priority: "Moderate",
  description: "exampleTask2 description",
  user_id: "550e8400-e29b-41d4-a716-446655440000",
  status: "In Progress",
};
const exampleTask3: TaskType = {
  id: "3",
  created_at: "2025-07-09T10:15:00.000Z",
  title: "exampleTask3",
  date: "2025-08-10",
  priority: "Low",
  description: "exampleTask3 description",
  user_id: "550e8400-e29b-41d4-a716-446655440000",
  status: "Completed",
};

interface MyTaskProps {
  onTaskSelect: (task: TaskType) => void;
  selectedTaskId?: string;
}

export default function MyTask({ onTaskSelect, selectedTaskId }: MyTaskProps) {
  const tasks = [exampleTask1, exampleTask2, exampleTask3];
  return (
    <Paper shadow="xs" p="xl" flex={1} h="85vh">
      <Title order={4} mb="0.5em">
        My Tasks
      </Title>
      {tasks.map(t => {
        return (
          <TaskCard
            key={t.id}
            task={t}
            onClick={() => onTaskSelect(t)}
            isSelected={t.id === selectedTaskId}
          />
        );
      })}
    </Paper>
  );
}
