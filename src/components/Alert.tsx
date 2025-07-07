import { Alert as MantineAlert } from "@mantine/core";

export type AlertType = "success" | "error";

export interface AlertProps extends React.ComponentProps<typeof MantineAlert> {
  type: AlertType;
  message: string;
}

export default function Alert({ type, message, ...rest }: AlertProps) {
  if (type === "success") {
    return (
      <MantineAlert
        variant="light"
        color="green"
        title={message}
        mb="md"
        {...rest}
      />
    );
  }

  return (
    <MantineAlert
      variant="light"
      color="red"
      title={message}
      mb="md"
      {...rest}
    />
  );
}
