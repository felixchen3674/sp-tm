import { ReactElement } from "react";

import { Center } from "@mantine/core";

import SignUpForm from "@/components/auth/SignUpForm";

export default function SignupPage() {
  return (
    <Center h="100vh" w="100%">
      <SignUpForm />
    </Center>
  );
}
SignupPage.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};
