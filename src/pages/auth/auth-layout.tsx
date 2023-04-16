import { ReactNode } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import LayoutBase from "@/pages/layout-base";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutBase>
      <Container maxWidth="xs">
        <main>
          <Box margin={3}>{children}</Box>
        </main>
      </Container>
    </LayoutBase>
  );
}
