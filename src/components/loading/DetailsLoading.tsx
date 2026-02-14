import { Box, Skeleton } from "@mui/material";
import React from "react";

function DetailsLoading() {
  return (
    <Box
      sx={{
        bgcolor: "#767575",
        p: 8,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey.500" }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
  );
}

export default DetailsLoading;
