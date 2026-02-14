import { Box, Grid2, Skeleton } from "@mui/material";
import React from "react";

function ShopLoading() {
  return (
    <Box>
      <Grid2
        container
        spacing={3}
        sx={{
          py: 7,
          px: { xs: 2, md: 5, lg: 10 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid2
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default ShopLoading;
