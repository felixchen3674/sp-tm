import { Button, Notification } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";
import '@mantine/notifications/styles.css';

interface ToastButtonProps {
  label?: string;
  title?: string;
  message: string;
  color?: "green" | "red" | "blue";
  autoClose?: number;
}

export function ToastButton({
  label = "Show notification",
  title = "Notification",
  message,
  color = "blue",
  autoClose = 5000,
}: ToastButtonProps) {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title,
          message,
          color,
          autoClose,
          withCloseButton: true,
        })
      }
      mt="md"
    >
      {label}
    </Button>
  );
}