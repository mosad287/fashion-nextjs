import { Box, Typography } from "@mui/material";
import React from "react";

function FreeDiv() {
  return (
    <Box
      sx={{
        backgroundImage: "url('/about-us.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        py: 2,
        mb: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "rgb(156, 47, 47)",
        }}
      >
        Free shopping, 30-day return or refund guarantee
      </Typography>
    </Box>
  );
}

export default FreeDiv;
