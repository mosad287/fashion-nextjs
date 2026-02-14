"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function AdminSlider() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        alignItems: "center",
        justifyContent: { xs: "space-around", sm: "start" },
        flexWrap: "wrap",
        color: "white",
        height: { sm: "100%" },
        minHeight: { xs: "0vh", sm: "100vh" },
        py: { xs: 2, sm: 12 },
        gap: { xs: 0, sm: 22 },
        background: "rgba(97, 133, 117, 1)",
      }}
    >
      <Button
        onClick={() => router.push("/admin")}
        sx={{
          fontSize: { xs: 20, sm: 25 },
          color: "white",
          textTransform: "none",
        }}
      >
        DashBord
      </Button>
      <Button
        onClick={() => router.push("/admin/products")}
        sx={{
          fontSize: { xs: 20, sm: 25 },
          color: "white",
          textTransform: "none",
        }}
      >
        Products
      </Button>
    </Box>
  );
}

export default AdminSlider;
