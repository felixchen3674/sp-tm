import Alert from "../Alert";

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import {
  Anchor,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { createClient } from "@/lib/supabase/component";
import { paths } from "@/lib/utils/paths";

export default function SignUpForm() {
  const supabase = createClient();
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: value =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const onSubmit = form.onSubmit(async values => {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
        },
      },
    });

    if (error) {
      form.setErrors({
        server: error.message,
      });
    }

    router.push(paths.dashboard);
  });

  return (
    <Paper withBorder w={400} p={30} radius="md" shadow="xs">
      <form onSubmit={onSubmit}>
        {form.errors.server && (
          <Alert type="error" message={form.errors.server as string} />
        )}
        <Stack gap={8}>
          <TextInput
            required
            label="First Name"
            placeholder="your first name"
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            required
            label="Last Name"
            placeholder="your last name"
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            required
            label="Password"
            placeholder="your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <TextInput
            required
            label="Confirm Password"
            placeholder="confirm your password"
            key={form.key("confirmPassword")}
            error={form.errors.confirmPassword}
            {...form.getInputProps("confirmPassword")}
          />

          <Button w="100%" type="submit">
            Sign Up
          </Button>
        </Stack>

        <Group mt="md" gap={4}>
          <Text>Already have an account?</Text>
          <Anchor component={Link} href={paths.auth.login} underline="always">
            Login
          </Anchor>
        </Group>
      </form>
    </Paper>
  );
}
