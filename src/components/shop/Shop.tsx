"use client";

import { getShopProducts } from "@/reduxSystem/slices/shopSlice";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid2,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopLoading from "./ShopLoading";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { addCartProduct } from "@/reduxSystem/slices/cartSlice";

function Shop() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { shopProducts, shopProductsLoading } = useSelector(
    (state: StoreType) => state.shopSlice,
  );
  const { addProductCartLoading } = useSelector(
    (state: StoreType) => state.cartSlice,
  );
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(getShopProducts());
  }, [dispatch]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function hundleAddToCart(id: string) {
    dispatch(
      addCartProduct({ token: localStorage.getItem("token")!, id }),
    ).then((res) => {
      if (res.payload.status == "success") {
        setOpen(true);
      }
    });
  }

  return (
    <Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product added successfully to your cart
        </Alert>
      </Snackbar>

      {shopProductsLoading ? (
        <ShopLoading />
      ) : (
        <Grid2
          container
          spacing={3}
          sx={{
            py: 7,
            px: { xs: 2, md: 5, lg: 10 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {shopProducts.map((product, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card sx={{ width: "100%", borderRadius: 3 }} elevation={12}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.product.imageCover}
                    alt="green iguana"
                    onClick={() =>
                      router.push(
                        `/product/${product.product.id}/name/${product.product.title}`,
                      )
                    }
                  />
                </CardActionArea>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>$ {product?.product.quantity}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <IconButton
                        sx={{ color: "rgb(46,125,50)" }}
                        aria-label="delete"
                        size="large"
                        onClick={() => hundleAddToCart(product.product._id)}
                      >
                        {addProductCartLoading ? (
                          <CircularProgress sx={{ color: "green" }} size={20} />
                        ) : (
                          <AddIcon />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product?.product.title.split(" ").slice(0, 3).join(" ")}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
}

export default Shop;
