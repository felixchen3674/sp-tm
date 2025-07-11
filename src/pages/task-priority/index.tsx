import React from "react";

import { Page } from "@/components/Page";
import TaskPriorityManager from "@/components/TaskPriorityManager";

export default function TaskPriorityPage() {
  return (
    <Page title="Task Priority Management">
      <TaskPriorityManager />
    </Page>
  );
}
