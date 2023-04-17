import Head from "next/head";
import Router from "next/router";

import Todos from "@/components/Todos";
import { useUserContext } from "@/components/auth/userStore";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      Router.push("/auth/sign-in");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>TodoTitan</title>
      </Head>
      <Todos />
    </>
  );
}
