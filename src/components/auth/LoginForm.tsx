import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Anchor, Button, Group, Paper, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { createClient } from "@/lib/supabase/component";
import { paths } from "@/lib/utils/paths";

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = form.onSubmit(async values => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
      options: {},
    });
    // console.log("Login response data:", data);
    if (error) {
      console.error("Error during login:", error.message, error.code);
      return;
    }

    console.log("Login successful:");
    console.log("Redirecting to dashboard...", paths.dashboard);

    router.push(paths.dashboard);
  });

  return (
    <Paper withBorder w={400} p={30} radius="md" shadow="xs">
      <form onSubmit={onSubmit}>
        <TextInput
          mb={16}
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <TextInput
          mb={16}
          withAsterisk
          label="Password"
          placeholder="your password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Button w="100%" type="submit">
          Login
        </Button>

        <Group mt="md" gap={4}>
          <Text>Don&apos;t have an account?</Text>
          <Anchor component={Link} href={paths.auth.signup} underline="always">
            Sign up
          </Anchor>
        </Group>
      </form>
    </Paper>
  );
}
