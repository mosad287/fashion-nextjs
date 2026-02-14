"use client";

import { clearCartProduct, getUserCart } from "@/reduxSystem/slices/cartSlice";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import CartProducts from "./CartProducts";
import CartLoading from "./loading/CartLoading";

function Cart() {
  const { userCartLoading, userCart, totalCartPrice, clearProductCartLoading } =
    useSelector((state: StoreType) => state.cartSlice);
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(getUserCart(localStorage.getItem("token")!));
  }, []);

  const card = (
    <Fragment>
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{ fontWeight: "bolder" }}>
          Cart Total
        </Typography>

        <Typography variant="h6">{totalCartPrice} EGP</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          check out
        </Button>
        <Button
          onClick={() =>
            dispatch(clearCartProduct(localStorage.getItem("token")!))
          }
          variant="contained"
          color="error"
          size="small"
        >
          {clearProductCartLoading ? (
            <CircularProgress sx={{ color: "white" }} size={20} />
          ) : (
            "clear cart"
          )}
        </Button>
      </CardActions>
    </Fragment>
  );

  return (
    <Box sx={{ position: "relative" }}>
      {userCartLoading ? (
        <Box sx={{ zIndex: 10 }}>
          <CartLoading />
        </Box>
      ) : (
        <Box
          sx={{
            py: 7,
            px: { xs: 2, md: 5, lg: 10 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9,
          }}
        >
          {userCart.length ? (
            <Box sx={{ width: "100%" }}>
              <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, sm: 4 }} sx={{ position: "relative" }}>
                  <Card
                    variant="outlined"
                    sx={{
                      border: "none",
                      background: "rgba(140, 159, 167, 1)",
                      width: "100%",
                      p: 1,
                      position: { xs: "none", sm: "sticky" },
                      top: { xs: 0, sm: "100px" },
                    }}
                  >
                    {card}
                  </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 8 }}>
                  {userCart.map((product, index) => (
                    <CartProducts key={index} product={product} />
                  ))}
                </Grid2>
              </Grid2>
            </Box>
          ) : (
            <EmptyCart />
          )}
        </Box>
      )}
    </Box>
  );
}

export default Cart;
