import Footer from "@/components/Footer";
import AuthNavbar from "@/components/navbar/AuthNavbar";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <Box>
        <AuthNavbar />
        <Box sx={{ mt: { xs: "54px", sm: "64px" } }}>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default layout;
