import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { ICartItem } from "@/interfaces/cartItem";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import {
  deleteCartProduct,
  updateCartProduct,
} from "@/reduxSystem/slices/cartSlice";

type Props = {
  product: ICartItem;
};

function CartProducts({ product }: Props) {
  const { updateProductCartLoading, deleteProductCartLoading } = useSelector(
    (state: StoreType) => state.cartSlice,
  );
  const dispatch = useDispatch<DispatchType>();

  return (
    <Box sx={{ p: 3, mb: 2, background: "rgb(243,244,246 )", borderRadius: 2 }}>
      <Grid2 container spacing={3}>
        <Grid2
          size={{ xs: 12, sm: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "70%", sm: "100%" },
              aspectRatio: "1 / 1",
            }}
          >
            {product?.product.imageCover && (
              <Image
                src={product?.product.imageCover}
                alt={product?.product.title || "product"}
                fill
                sizes="(max-width: 600px) 100vw,(max-width: 767px) 50vw,33vw"
                style={{ objectFit: "cover", borderRadius: 5 }}
              />
            )}
          </Box>
        </Grid2>

        <Grid2
          size={{ xs: 12, sm: 8 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{ color: "gray", fontWeight: "bold" }}
              variant="body1"
            >
              {product?.product?.title?.split(" ")?.slice(0, 3)?.join(" ")}...
            </Typography>
            <Typography sx={{ color: "gray" }} variant="body2">
              price : {product?.price}
            </Typography>
            <Typography variant="body1">
              {product?.price * product.count} EGP
            </Typography>
            <Button
              sx={{ border: "none", mb: 1 }}
              variant="outlined"
              color="error"
              onClick={() =>
                dispatch(
                  deleteCartProduct({
                    token: localStorage.getItem("token")!,
                    id: product.product._id,
                  }),
                )
              }
              startIcon={
                deleteProductCartLoading ? (
                  <CircularProgress
                    sx={{ color: "rgb(132, 24, 36)" }}
                    size={20}
                  />
                ) : (
                  <DeleteIcon />
                )
              }
            >
              remove
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton
              sx={{ color: "rgb(46,125,50)" }}
              aria-label="delete"
              size="large"
              onClick={() =>
                dispatch(
                  updateCartProduct({
                    count: product.count + 1,
                    id: product.product._id,
                  }),
                )
              }
            >
              {updateProductCartLoading ? (
                <CircularProgress sx={{ color: "rgb(46,125,50)" }} size={20} />
              ) : (
                <AddIcon />
              )}
            </IconButton>
            <Typography>{product?.count}</Typography>
            <IconButton
              sx={{ color: "rgb(46,125,50)", textAlign: "center" }}
              aria-label="delete"
              size="large"
              disabled={product?.count > 1 ? false : true}
              onClick={() =>
                product?.count > 1 &&
                dispatch(
                  updateCartProduct({
                    count: product.count - 1,
                    id: product.product._id,
                  }),
                )
              }
            >
              {updateProductCartLoading ? (
                <CircularProgress sx={{ color: "rgb(46,125,50)" }} size={20} />
              ) : (
                <RemoveIcon />
              )}
            </IconButton>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default CartProducts;
