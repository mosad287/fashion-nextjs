import { Box, Typography } from "@mui/material";
import React from "react";
import HomeShopButton from "./HomeShopButton";

function HomeBackground() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: "url('/hero/hero-1.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        px: { xs: 2, md: 5, lg: 10 },
        py: 15,
      }}
    >
      <Box
        maxWidth={"500px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: 3,
        }}
      >
        <Typography variant="body1" color="red" sx={{ fontWeight: "bold" }}>
          SUMMER COIIECTION
        </Typography>
        <Box>
          <Typography variant="h3" color="rgba(38,50,56,1)">
            Fall - Winter
          </Typography>
          <Typography variant="h3" color="rgba(38,50,56,1)">
            Collections 2025
          </Typography>
        </Box>
        <Typography variant="body1" color="rgba(38,50,56,1)">
          A specialist label creating luxury essentials. Ethically crafted with
          an unwavering commitment to exceptional quality
        </Typography>
        <HomeShopButton />
      </Box>
    </Box>
  );
}

export default HomeBackground;
