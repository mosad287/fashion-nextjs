"use client";

import { Box, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function EmptyCart() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "150%", sm: 350 },
          aspectRatio: 1 / 1,
        }}
      >
        <Image
          src="/empty-shopping.jpg"
          alt="error"
          fill
          sizes="(max-width: 600px) 100vw,(max-width: 767px) 50vw,33vw"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Button
        startIcon={<AddShoppingCartIcon />}
        variant="contained"
        color="success"
        sx={{ px: 3 }}
        onClick={() => router.push("/shop")}
      >
        shop now
      </Button>
    </Box>
  );
}

export default EmptyCart;
