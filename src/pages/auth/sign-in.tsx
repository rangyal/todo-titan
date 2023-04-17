import Head from "next/head";

import type { NextPageWithLayout } from "@/components/page-layout/types";
import AuthLayout from "@/components/page-layout/AuthLayout";
import SignIn from "@/components/auth/SignIn";

const SignInPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>TodoTitan - Sign in</title>
      </Head>
      <main>
        <SignIn />
      </main>
    </>
  );
};

SignInPage.Layout = AuthLayout;

export default SignInPage;
