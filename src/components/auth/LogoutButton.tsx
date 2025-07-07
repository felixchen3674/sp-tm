import { useRouter } from "next/navigation";
import { RiLogoutBoxRLine } from "react-icons/ri";

import { NavLink } from "@mantine/core";

import classes from "@/components/Layout/dashboard/sidebar.module.css";
import { createClient } from "@/lib/supabase/component";

export function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };
  return (
    <NavLink
      onClick={logout}
      component="button"
      label="Logout"
      className={classes.navLink}
      leftSection={<RiLogoutBoxRLine />}
    />
  );
}
