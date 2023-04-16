import { ReactNode } from "react";
import Container from "@mui/material/Container";

import LayoutBase from "./layout-base";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutBase>
      <Container maxWidth="sm">
        <main>{children}</main>
      </Container>
    </LayoutBase>
  );
}
