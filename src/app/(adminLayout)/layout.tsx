import AdminSlider from "@/components/admin/AdminSlider";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import AdminBrotect from "@/protects/AdminBrotect";
import { Box, Grid2 } from "@mui/material";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <AdminBrotect>
      <AdminNavbar />
      <Box>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <AdminSlider />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 9 }}>{children}</Grid2>
        </Grid2>
      </Box>
    </AdminBrotect>
  );
}

export default layout;
