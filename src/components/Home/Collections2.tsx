import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function Collections2() {
  const collictions = [
    {
      img: "/product/product-3.jpg",
      price: 100,
    },
    {
      img: "/product/product-5.jpg",
      price: 150,
    },
    {
      img: "/product/product-11.jpg",
      price: 300,
    },
    {
      img: "/product/product-14.jpg",
      price: 450,
    },
  ];

  return (
    <Box sx={{ mb: 5 }}>
      <Grid2
        sx={{
          px: { xs: 2, md: 5, lg: 10 },
          display: "flex",
          justifyContent: "center",
        }}
        container
        spacing={3}
      >
        {collictions.map(({ img, price }) => (
          <Grid2
            key={price}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: " .9 / .9 ",
              }}
            >
              <Image
                src={img}
                alt="error"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 600px) 100vw,(max-width: 900px) 50vw,33vw"
              />
            </Box>

            <Typography sx={{ mt: 2 }}>$ {price}</Typography>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default Collections2;
