import { Paper, Text, Title } from "@mantine/core";

export default function MyTask() {
  return (
    <Paper shadow="xs" p="xl" flex={1} h="85vh">
      <Title order={4}>My Tasks</Title>
      <Text>map task item components here</Text>
      {/* [todo] onclick an task-card will render TaskDeatil comp */}
      {/* [todo] useRouter to push taskId? */}
    </Paper>
  );
}
