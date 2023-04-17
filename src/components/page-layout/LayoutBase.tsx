import { ReactNode } from "react";
import Box from "@mui/material/Box";
import TopBar from "@/components/TopBar";

export default function LayoutBase({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBar />
      <Box marginTop={4}>{children}</Box>
    </>
  );
}
