"use client";

import { getShopProducts } from "@/reduxSystem/slices/shopSlice";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Admin() {
  const router = useRouter();

  const { shopProducts, shopProductsLoading } = useSelector(
    (state: StoreType) => state.shopSlice,
  );
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(getShopProducts());
  }, [dispatch]);

  return (
    <Box>
      <Box
        sx={{
          py: 5,
          px: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          background: "rgba(26, 25, 45, 1)",
          width: { xs: "80%", md: "50%" },
          mx: "auto",
          mt: "5em",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {shopProductsLoading ? (
          <CircularProgress sx={{ color: "white" }} />
        ) : (
          <>
            <Typography sx={{ fontWeight: "bold" }} variant="h5" color="white">
              Products
            </Typography>
            <Typography variant="h6" color="white">
              Number Of Products :{""}
              <span style={{ color: "green" }}> {shopProducts?.length}</span>
            </Typography>
            <Typography variant="h6" color="white">
              Last Product Added Is :{""}
              <span style={{ color: "green" }}>
                {" "}
                {shopProducts[shopProducts.length - 1]?.product.title}
              </span>
            </Typography>
            <Button
              variant="contained"
              sx={{ textTransform: "none", color: "white" }}
              onClick={() => router.push("/admin/products")}
            >
              Show Products
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Admin;
