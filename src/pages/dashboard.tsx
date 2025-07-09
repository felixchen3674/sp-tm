import { GetServerSidePropsContext } from "next";
import Head from "next/head";

import { User as SupabaseUser } from "@supabase/supabase-js";

import { Page } from "@/components/Page";
import { User } from "@/lib/entities/users";
import { createClient } from "@/lib/supabase/server-props";
import { paths } from "@/lib/utils/paths";
import TaskCard from "@/components/TaskCard";
import { TaskType } from "@/lib/entities/tasks";

export default function Dashboard({ user }: { user: User }) {
  console.log("User data:", user);

  // Developing only, delete later
  const demo_task: TaskType = {
    id: "1",
    title: "Attend Nischal's Birthday Party",
    description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements) Attend the party and have fun.",
    created_at: new Date().toISOString(),
    date: new Date().toISOString(),
    status: "Not Started",
    priority: "Moderate",
    user_id: user.id,
  };

  return (
    <Page title="Dashboard">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Home page of task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h2>
          Welcome back, {user.firstName} {user.lastName}
        </h2>
        {/* Developing only, delete later */}
        <TaskCard task={demo_task}/>
      </div>
    </Page>
  );
}

// Dashboard page for authenticated users
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return {
      redirect: {
        destination: paths.auth.login,
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: parseUser(data.user),
    },
  };
}

function parseUser(user: SupabaseUser): User {
  // can't find anywhere in the docs how to define type for user_metadata
  return {
    id: user.id,
    email: user.email!,
    firstName: user.user_metadata.firstName || "",
    lastName: user.user_metadata.lastName || "",
    username: user.user_metadata.username || "",
    avatarUrl: user.user_metadata.avatar_url || null,
  };
}
