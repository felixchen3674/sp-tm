import { Flex } from "@mantine/core";

import MyTask from "@/components/Tasks/MyTask";
import { Page } from "@/components/Page";
import TaskDetail from "@/components/Tasks/TaskDetail";

export default function TasksPage() {
  return (
    <Page title="Tasks">
      <Flex
        mih={50}
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="nowrap">
        <MyTask />
        <TaskDetail />
      </Flex>
      {/* <div>Tasks Page</div> */}
      {/* <div>10000 lines of code</div> */}
    </Page>
  );
}
