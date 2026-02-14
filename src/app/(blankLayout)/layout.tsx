import Footer from "@/components/Footer";
import BlankNavbar from "@/components/navbar/BlankNavbar";
import BlankBrotect from "@/protects/BlankBrotect";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

function BlankLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <BlankBrotect>
        <Box>
          <BlankNavbar />
          <Box sx={{ mt: { xs: "54px", sm: "64px" } }}>{children}</Box>
        </Box>
      </BlankBrotect>

      <Footer />
    </Box>
  );
}

export default BlankLayout;
