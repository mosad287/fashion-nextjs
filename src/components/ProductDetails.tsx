"use client";

import { getProductDetails } from "@/reduxSystem/slices/shopSlice";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsLoading from "./loading/DetailsLoading";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addCartProduct } from "@/reduxSystem/slices/cartSlice";

type Props = {
  id: string;
  name: string;
};

function ProductDetails({ id }: Props) {
  const { ProductDetailsLoading, productDetails } = useSelector(
    (state: StoreType) => state.shopSlice,
  );

  const { addProductCartLoading } = useSelector(
    (state: StoreType) => state.cartSlice,
  );

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);

  return (
    <Box>
      {ProductDetailsLoading ? (
        <DetailsLoading />
      ) : (
        <Box sx={{ px: { xs: 2, md: 5, lg: 10 }, py: 7 }}>
          <Grid2 container spacing={3}>
            <Grid2
              size={{ xs: 12, sm: 4 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "80%",
                  aspectRatio: "1 / 1",
                }}
              >
                {productDetails?.imageCover && (
                  <Image
                    src={productDetails.imageCover}
                    alt={productDetails.title || "product"}
                    fill
                    sizes="(max-width: 600px) 100vw,(max-width: 767px) 50vw,33vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 8 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  {productDetails?.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                >
                  {productDetails?.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {productDetails?.ratingsAverage}
                  </Typography>

                  <Rating
                    name="text-feedback"
                    value={productDetails?.ratingsAverage}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      addProductCartLoading ? (
                        <CircularProgress sx={{ color: "white" }} size={20} />
                      ) : (
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      )
                    }
                  />
                </Box>

                <Button
                  sx={{ width: "100%" }}
                  color="success"
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      addCartProduct({
                        token: localStorage.getItem("token")!,
                        id: productDetails.id,
                      }),
                    )
                  }
                  startIcon={<AddShoppingCartIcon />}
                >
                  Add To Cart
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      )}
    </Box>
  );
}

export default ProductDetails;
