import {Button, Flex} from "@mantine/core";

interface Props{
  index: number;
  status:{id: number; name: string};
  onEdit: (status: {id: number; name: string}) => void;
  onDelete: (id: number) => void;
}

export default function TaskStatusRow({index, status, onEdit, onDelete}: Props) {
  return(
    <tr>
      <td>{index + 1}</td>
      <td>{status.name}</td>
      <td>
        <Flex gap="xs">
          <Button color= "orange" onClick={() => onEdit(status)}>
            Edit
          </Button>
           <Button color= "red" onClick={() => onDelete(status.id)}>
            Delete
          </Button>
        </Flex>
      </td>
    </tr>
  );
}