import Head from "next/head";

import type { NextPageWithLayout } from "@/pages/types";
import AuthLayout from "./auth-layout";
import SignUp from "@/components/auth/SignUp";

const SignUpPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>TodoTitan - Sign up</title>
      </Head>
      <main>
        <SignUp />
      </main>
    </>
  );
};

SignUpPage.Layout = AuthLayout;

export default SignUpPage;
