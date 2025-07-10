import EditModal from "./EditModal";
import styles from "./taskcard.module.css";

import React from "react";

import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheckbox, IconEdit, IconTrash } from "@tabler/icons-react";

import { TaskType } from "@/lib/entities/tasks";

const CardMenu = ({ task }: { task: TaskType }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        onClick={e => e.stopPropagation()}
        title="Edit Task"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        <EditModal task={task} />
      </Modal>

      <Menu
        trigger="hover"
        position="right-start"
        transitionProps={{ transition: "fade-up" }}>
        <Menu.Target>
          <Button onClick={e => e.stopPropagation()} className={styles.menu}>
            ...
          </Button>
        </Menu.Target>

        <Menu.Dropdown onClick={e => e.stopPropagation()}>
          <Menu.Item leftSection={<IconCheckbox size={16} />} color="green">
            Finish
          </Menu.Item>
          <Menu.Item onClick={open} leftSection={<IconEdit size={16} />}>
            Edit
          </Menu.Item>
          <Menu.Item leftSection={<IconTrash size={16} />} color="red">
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default CardMenu;
