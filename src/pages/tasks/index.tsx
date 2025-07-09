import { useState } from "react";

import { Flex } from "@mantine/core";

import { Page } from "@/components/Page";
import MyTask from "@/components/Tasks/MyTask";
import TaskDetail from "@/components/Tasks/TaskDetail";
import { TaskType } from "@/lib/entities/tasks";

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  console.log(selectedTask);

  return (
    <Page title="Tasks">
      <Flex
        mih={50}
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="nowrap">
        <MyTask onTaskSelect={setSelectedTask} />
        <TaskDetail task={selectedTask} />
      </Flex>
    </Page>
  );
}
