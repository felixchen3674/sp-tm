import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { User } from "@/lib/entities/users";
import { AppDispatch, RootState } from "@/lib/redux";
import { setUser, updateUser } from "@/lib/redux/userSlice";
import { createClient } from "@/lib/supabase/component";

export default function AccountInfoForm() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const supabase = createClient();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      position: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: value =>
        value.trim().length > 0 ? null : "First name is required",
      lastName: value =>
        value.trim().length > 0 ? null : "Last name is required",
    },
  });

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
          router.push("/auth/login");
          return;
        }

        const user: User = {
          id: data.user.id,
          email: data.user.email || "",
          firstName: data.user.user_metadata?.firstName || "",
          lastName: data.user.user_metadata?.lastName || "",
          username: data.user.user_metadata?.username || "",
          avatarUrl: data.user.user_metadata?.avatar_url || null,
          contactNumber: data.user.user_metadata?.contactNumber || "",
          position: data.user.user_metadata?.position || "",
        };

        dispatch(setUser(user));
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/auth/login");
      }
    }

    fetchUser();
  }, [dispatch, router, supabase]);

  // Update form when user data is available
  useEffect(() => {
    if (currentUser) {
      form.setValues({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        contactNumber: currentUser.contactNumber || "",
        position: currentUser.position || "",
      });
    }
  }, [currentUser]);

  const handleSave = async (values: typeof form.values) => {
    try {
      // Update Redux state
      dispatch(updateUser(values));

      const { error } = await supabase.auth.updateUser({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          contactNumber: values.contactNumber,
          position: values.position,
        },
      });

      if (error) {
        console.error("Error updating user:", error);
        return;
      }

      console.log("User updated successfully");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };


  return (
    <Box maw={700} mx="auto" my="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Account Information</Title>
        <Link href="/dashboard" style={{ fontWeight: 600 }}>
          Go Back
        </Link>
      </Group>

      <Group mb="xl">
        <Avatar
          src={
            currentUser?.avatarUrl ||
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          }
          size={94}
          radius="md"
        />
        <div>
          <Text fz="lg" fw={500}>
            {currentUser?.firstName || "First Name"}{" "}
          </Text>
          <Text fz="sm" c="dimmed">
            {currentUser?.email}
          </Text>
        </div>
      </Group>

      <Paper p="md" radius="md" shadow="sm" withBorder bg="gray.0">
        <form onSubmit={form.onSubmit(handleSave)}>
          <Stack>
            <TextInput
              label="First Name"
              {...form.getInputProps("firstName")}
            />
            <TextInput label="Last Name" {...form.getInputProps("lastName")} />
            <TextInput
              label="Email Address"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Contact Number"
              {...form.getInputProps("contactNumber")}
            />
            <TextInput label="Position" {...form.getInputProps("position")} />

            <Group justify="flex-start" mt="md">
              <Button type="submit" color="orange">
                Save Changes
              </Button>
              <Button color="orange" onClick={handleCancel} type="button">
                Cancel
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
