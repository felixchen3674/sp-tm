import { Button, Flex, TextInput } from "@mantine/core";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function TaskStatusForm({ value, onChange, onSubmit, onCancel }: Props) {
  return (
    <>
      <TextInput
        label="Task Status"
        placeholder="Enter status"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <Flex mt="md" gap="sm">
        <Button onClick={onSubmit} color="orange">
          Save
        </Button>
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
      </Flex>
    </>
  );
}
