import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UserProvider } from "@/components/auth/userStore";

import Layout from "./layout";
import { NextPageWithLayout } from "./types";

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
      <meta name="description" content="Simple task management" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
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
