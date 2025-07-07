import { ReactElement } from "react";

import { Center } from "@mantine/core";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Center h="100vh" w="100%">
      <LoginForm />
    </Center>
  );
}

LoginPage.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};
