import classes from "./UserIcons.module.css";

import { useSelector } from "react-redux";

import { Avatar, Group, Text } from "@mantine/core";

import { RootState } from "@/lib/redux";

export function UserIcons() {
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (!user) {
    return (
      <Text size="sm" c="dimmed">
        Not logged in
      </Text>
    ); // handle undefined state safely
  }
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={94}
          radius="md"
        />
        <div>
          <Text fz="lg" fw={500} className={classes.name}>
            {user.firstName} {user.lastName}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
