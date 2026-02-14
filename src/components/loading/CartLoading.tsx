import { Box } from "@mui/material";
import React from "react";
import { BounceLoader } from "react-spinners";

function CartLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
      }}
    >
      <BounceLoader />
    </Box>
  );
}

export default CartLoading;
