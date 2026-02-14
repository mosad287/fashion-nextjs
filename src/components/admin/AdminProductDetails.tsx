"use client";

import { getProductDetails } from "@/reduxSystem/slices/shopSlice";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminProductDetails({ id }: { id: string }) {
  const router = useRouter();

  const { ProductDetailsLoading, productDetails } = useSelector(
    (state: StoreType) => state.shopSlice,
  );

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch]);

  return (
    <Box
      sx={{
        py: 7,
        px: { xs: 2, md: 5, lg: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "80%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          px: { xs: 2, md: 5, lg: 10 },
          py: 2,
          color: "white",
          background: "rgba(26, 25, 45, 1)",
          borderRadius: 2,
        }}
      >
        {ProductDetailsLoading ? (
          <CircularProgress sx={{ color: "white" }} />
        ) : (
          <>
            <Box
              sx={{
                position: "relative",
                width: "50%",
                aspectRatio: " 1 / 1 ",
              }}
            >
              {productDetails?.imageCover && (
                <Image
                  src={productDetails?.imageCover}
                  alt="error"
                  fill
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                  sizes="(max-width: 600px) 100vw,(max-width: 900px) 50vw,33vw"
                />
              )}
            </Box>

            <Typography sx={{ textAlign: "center" }}>
              {productDetails?.description}
            </Typography>
            <Typography>
              Rate :{" "}
              <span style={{ color: "green" }}>
                {productDetails?.ratingsAverage}
              </span>
            </Typography>
            <Box>
              <Button variant="contained" onClick={() => router.back()}>
                back
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default AdminProductDetails;
