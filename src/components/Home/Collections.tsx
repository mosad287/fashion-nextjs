import { Box, Button, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function Collections() {
  const collictions = [
    { img: "/banner/banner-1.jpg", name: "Clothing" },
    { img: "/banner/banner-2.jpg", name: "Accessories" },
    { img: "/banner/banner-3.jpg", name: "Shoes Spring" },
  ];

  return (
    <Box sx={{ py: 5, px: { xs: 3, md: 7, lg: 13 } }}>
      <Grid2
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {collictions.map(({ img, name }, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                }}
              >
                <Image
                  src={img}
                  alt="error"
                  fill
                  sizes="(max-width: 600px) 100vw,(max-width: 900px) 50vw,33vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{ py: 0.5, textAlign: "center", color: "rgba(38,50,56,1)" }}
              >
                {name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{
                    color: "black",
                    borderBottom: 0.1,
                    borderBottomColor: "black",
                  }}
                >
                  S H O P N O W
                </Button>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default Collections;
