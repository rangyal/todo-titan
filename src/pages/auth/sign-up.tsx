import Head from "next/head";

import type { NextPageWithLayout } from "@/components/page-layout/types";
import AuthLayout from "@/components/page-layout/AuthLayout";
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
