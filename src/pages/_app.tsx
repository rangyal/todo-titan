import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import type { NextPageWithLayout } from "@/components/page-layout/types";
import Layout from "@/components/page-layout/Layout";
import { UserProvider } from "@/components/auth/userStore";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutComponent = Component.Layout ?? Layout;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <Head>
        <meta name="description" content="Simple task management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
