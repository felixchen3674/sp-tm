import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { notifications } from "@mantine/notifications";

export default function AddNewTaskForm({ onClose }: { onClose?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type TaskFormData = {
    title: string;
    date: Date | null;
    priority: string;
    description: string;
  };

  const form = useForm({
    initialValues: {
      title: "",
      date: null,
      priority: "",
      description: "",
    },
    validate: {
      title: v => (v.trim() === "" ? "Title is required" : null),
      date: value => {
        if (!value) return "Date is required";
      },
      priority: v => (v === "" ? "Select a priority" : null),
      description: v => (v.length > 500 ? "Max 500 characters allowed" : null),
    },
  });


  const handleSubmit = async (values: TaskFormData) => {
    try {
      setIsSubmitting(true)

      const response = await fetch("/api/users/me/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to create task")
      }

      notifications.show({
        title: "Success",
        message: "Task created successfully!",
        color: "green",
      })

      if (onClose) {
        onClose()
      }
    } catch (error) {
      console.error("Error creating task:", error)
      notifications.show({
        title: "Error",
        message: "Failed to create task. Please try again.",
        color: "red",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box px="md" pt="xl" style={{ maxWidth: 960, margin: "0 auto" }}>
      <Paper p="xl" radius="md" shadow="sm" withBorder>
        <Flex justify="space-between" align="center" mb="md">
          <Text
            size="xl"
            fw={700}
            style={{ borderBottom: "2px solid #d2691e", paddingBottom: "4px" }}>
            Add New Task
          </Text>
          <Button variant="outline" color="gray" size="xs" onClick={onClose}>
            Go Back
          </Button>
        </Flex>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Title"
              placeholder="Enter task title"
              size="md"
              withAsterisk
              {...form.getInputProps("title")}
            />

            <DatePickerInput
              label="Date"
              placeholder="Pick a date"
              size="md"
              required
              leftSection={<IconCalendar size={18} />}
              styles={{
                day: {
                  height: "36px",
                  width: "36px",
                  fontWeight: 500,
                  margin: "1px",
                  borderRadius: "6px",
                },
              }}
              nextIcon={<IconChevronRight size={16} />}
              previousIcon={<IconChevronLeft size={16} />}
              {...form.getInputProps("date")}
              getDayProps={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const d = new Date(date);
                d.setHours(0, 0, 0, 0);
                const isDisabled = d < today;
                return {
                  disabled: isDisabled,
                  style: isDisabled ? { color: "#ccc" } : undefined,
                };
              }}  
            />

            <Box>
              <Text size="md" fw={500} c="dark.9" mb="sm">
                Priority <span style={{ color: "red" }}>*</span>
              </Text>
              <Group gap="lg">
                <label
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#fa5252",
                    }}
                  />
                  <Text size="sm" c="dimmed">
                    Extreme
                  </Text>
                  <input
                    type="checkbox"
                    checked={form.values.priority === "extreme"}
                    onChange={() => form.setFieldValue("priority", "extreme")}
                    style={{ marginLeft: "4px" }}
                  />
                </label>

                <label
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#228be6",
                    }}
                  />
                  <Text size="sm" c="dimmed">
                    Moderate
                  </Text>
                  <input
                    type="checkbox"
                    checked={form.values.priority === "moderate"}
                    onChange={() => form.setFieldValue("priority", "moderate")}
                    style={{ marginLeft: "4px" }}
                  />
                </label>

                <label
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#40c057",
                    }}
                  />
                  <Text size="sm" c="dimmed">
                    Low
                  </Text>
                  <input
                    type="checkbox"
                    checked={form.values.priority === "low"}
                    onChange={() => form.setFieldValue("priority", "low")}
                    style={{ marginLeft: "4px" }}
                  />
                </label>
              </Group>

              {form.errors.priority && (
                <Text size="sm" c="red" mt="xs">
                  {form.errors.priority}
                </Text>
              )}
            </Box>

            <Box>
              <Textarea
                label="Task Description"
                placeholder="Start writing here..."
                autosize
                minRows={5}
                maxLength={500}
                {...form.getInputProps("description")}
              />
              <Flex justify="space-between" mt={4}>
                <Box>
                  {form.errors.description && (
                    <Text size="xs" c="red">
                      {form.errors.description}
                    </Text>
                  )}
                </Box>
                <Text size="xs" c="dimmed">
                  {form.values.description.length}/500 characters
                </Text>
              </Flex>
            </Box>

            <Box pt="md">
              <Button
                type="submit"
                loading={isSubmitting}
                color="orange"
                size="md"
                style={{ paddingInline: "32px" }}>
                {isSubmitting ? "Creating..." : "Done"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
