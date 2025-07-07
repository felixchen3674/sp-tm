import Header from "./Header";
import Sidebar from "./Sidebar";

import React from "react";

import { AppShell, Group } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
