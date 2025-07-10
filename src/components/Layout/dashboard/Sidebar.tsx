import classes from "./sidebar.module.css";

import Link from "next/link";
import { ElementType } from "react";
import { BiTask } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

import { NavLink, Stack } from "@mantine/core";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { paths } from "@/lib/utils/paths";
import { UserIcons } from "@/components/AccountInfo/UserIcons";

interface MenuItem {
  name: string;
  href: string;
  icon: ElementType;
}

export const menu: MenuItem[] = [
  {
    name: "Dashboard",
    href: paths.dashboard,
    icon: MdDashboard,
  },
  {
    name: "Vital Task",
    href: paths.vitalTasks,
    icon: FaExclamation,
  },
  {
    name: "My Tasks",
    href: paths.tasks,
    icon: BiTask,
  },
  {
    name: "Setting",
    href: paths.settings,
    icon: IoMdSettings,
  },
];

export default function Sidebar() {
  return (
    <Stack gap="xs">
      <UserIcons/>
      {menu.map(item => (
        <NavLink
          key={item.name}
          component={Link}
          href={item.href}
          label={item.name}
          className={classes.navLink}
          leftSection={item.icon && <item.icon />}
        />
      ))}
      <LogoutButton />
    </Stack>
  );
}
