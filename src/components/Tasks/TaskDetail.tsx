import Image from "next/image";
import { MdDelete, MdEditSquare } from "react-icons/md";

import {
  Box,
  Button,
  Flex,
  List,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

// [todo] TaskDetail should recieve a task-card comp prop
// [todo] task-card prop is optional, without prop, hide the content in 2nd Flex
export default function TaskDetail() {
  const theme = useMantineTheme();
  const flag = true;

  const handleDelete = () => {
    console.log("Delete function called");
  };

  const handleEdit = () => {
    console.log("Edit function called");
  };

  return (
    <Paper shadow="xs" p="xl" flex={1.5} h="85vh" mr="1em">
      {flag && (
        <Flex direction="column" h="100%">
          <Flex gap="1em">
            <Image
              src="/favicon.ico"
              alt="Task detail"
              width={180}
              height={180}
            />
            <Flex direction="column" justify="flex-end" gap="0.5em" ml="0.5em">
              <Title order={4}>Task Title</Title>
              <Text>
                Priority:{" "}
                <span style={{ color: theme.colors.red[6] }}>Extreme</span>
              </Text>
              <Text>
                Status:{" "}
                <span style={{ color: theme.colors.red[6] }}>Not Started</span>
              </Text>
              <Text c="gray" fz="sm">
                Created on: 09/07/2025
              </Text>
            </Flex>
          </Flex>

          <Box mt="1em" c="gray.7" style={{ lineHeight: "20px" }}>
            <Text lh={2}>
              <strong>Task Title: </strong>
              Document Submisstion
            </Text>
            <Text lh={2}>
              <strong>Objective: </strong>
              To submit required documents for something important
            </Text>
            <Text lh={2}>
              <strong>Task Description: </strong>
              Review the list of documents required for submission and ensure
              all necessary documents are ready. Organize the documents
              accordingly and scan them if physical copies need to be submitted
              digitally. Rename the scanned files appropriately for easy
              identification and verify the accepted file formats. Upload the
              documents securely to the designated platform, double-check for
              accuracy, and obtain confirmation of successful submission. Follow
              up if necessary to ensure proper processing.
            </Text>
            <Text lh={2}>
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
            </List>
            <Text lh={2}>
              <strong>Deadline for Submission: </strong>
              End of Day
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
    </Paper>
  );
}
