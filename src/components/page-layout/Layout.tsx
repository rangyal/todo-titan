import { ReactNode } from "react";
import Container from "@mui/material/Container";

import LayoutBase from "./LayoutBase";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutBase>
      <Container maxWidth="sm">
        <main>{children}</main>
      </Container>
    </LayoutBase>
  );
}
