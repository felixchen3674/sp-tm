import EditModal from "../TaskCard/EditModal";

import Image from "next/image";
import { MdDelete, MdEditSquare } from "react-icons/md";

import {
  Box,
  Button,
  Flex,
  Modal,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { TaskType } from "@/lib/entities/tasks";

interface TaskDeatilProps {
  task: TaskType | null;
}

export default function TaskDetail({ task }: TaskDeatilProps) {
  const theme = useMantineTheme();
  const [isEditing, { open, close }] = useDisclosure(false);

  const handleDelete = () => {
    console.log("Delete function called");
  };

  const handleEdit = () => {
    console.log("Edit function called");
    open()
  };

  return (
    <Paper shadow="xs" p="xl" flex={1.5} h="85vh" mr="1em">
      {task && (
        <Flex direction="column" h="100%">
          <Flex gap="1em">
            <Image
              src="/favicon.ico"
              alt="Task detail"
              width={180}
              height={180}
            />
            <Flex direction="column" justify="flex-end" gap="0.5em" ml="0.5em">
              <Title order={4}>{task.title}</Title>
              <Text>
                Priority:{" "}
                <span style={{ color: theme.colors.red[6] }}>
                  {task.priority}
                </span>
              </Text>
              <Text>
                Status:{" "}
                <span style={{ color: theme.colors.red[6] }}>
                  {task.status}
                </span>
              </Text>
              <Text c="gray" fz="sm">
                Created on: {new Date(task.created_at).toLocaleDateString()}
              </Text>
            </Flex>
          </Flex>

          <Box mt="1em" c="gray.7" style={{ lineHeight: "20px" }}>
            <Text lh={2}>
              <strong>Task Title: </strong>
              {task.title}
            </Text>
            {/* <Text lh={2}>
              <strong>Objective: </strong>
              To submit required documents for something important
            </Text> */}
            <Text lh={2}>
              <strong>Task Description: </strong>
              {task.description}
            </Text>
            {/* <Text lh={2}>
              <strong>Additional Notes: </strong>
            </Text>
            <List>
              <List.Item ml="1em" lh={2}>
                Ensure that the documents are authentic and up-to-date.
              </List.Item>
              <List.Item ml="1em" lh={2}>
                Maintain confidentiality and security of sensitive information
                during the submission process.
              </List.Item>
              <List.Item ml="1em" lh={2}>
                If there are specific guidelines or deadlines for submission,
                adhere to them diligently.
              </List.Item>
            </List> */}
            <Text lh={2}>
              <strong>Deadline for Submission: </strong>
              {task.date}
            </Text>
          </Box>

          <Flex
            gap="0.6em"
            justify="flex-end"
            w="100%"
            mt="auto"
            display={"inline-flex"}>
            <Button onClick={handleDelete} p="0 8px" bg="red.6">
              <MdDelete size="1.8em" />
            </Button>
            <Button onClick={handleEdit} p="0 8px" bg="red.6">
              <MdEditSquare size="1.8em" />
            </Button>
          </Flex>
        </Flex>
      )}
      <Modal opened={isEditing} onClose={close} title="Edit Task">
        {task && <EditModal task={task} />}
      </Modal>
    </Paper>
  );
}
