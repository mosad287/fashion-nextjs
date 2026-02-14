"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function HomeShopButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/shop")}
      variant="contained"
      sx={{ background: "rgb(244,67,54)", px: 4, py: 1.5 }}
    >
      {"S H O P"} {"  "} {"N O W"}
    </Button>
  );
}

export default HomeShopButton;
