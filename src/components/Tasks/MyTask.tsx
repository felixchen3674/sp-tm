import { Paper, Text, Title } from "@mantine/core";

export default function MyTask() {
  return (
    <Paper shadow="xs" p="xl" flex={1} h="85vh">
      <Title order={4}>My Tasks</Title>
      <Text>map task item components here</Text>
    </Paper>
  );
}
