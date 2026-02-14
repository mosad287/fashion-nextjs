"use client";

import { getShopProducts } from "@/reduxSystem/slices/shopSlice";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTabelProduct from "./AdminTabelProduct";
import { useRouter } from "next/navigation";
import { deleteCartProduct } from "@/reduxSystem/slices/cartSlice";

function AdminProducts() {
  const theadNames = ["product", "Price", "View", "Remove"];
  const [change, setChange] = useState(false);

  const router = useRouter();

  const { shopProducts } = useSelector((state: StoreType) => state.shopSlice);
  const { deleteProductCartLoading } = useSelector(
    (state: StoreType) => state.cartSlice,
  );

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(getShopProducts());
  }, [change, dispatch]);

  return (
    <Box sx={{ py: 7, px: 2 }}>
      <Typography
        variant="h4"
        sx={{ color: "rgba(50, 46, 60, 1)", mb: 3, textAlign: "center" }}
      >
        Products
      </Typography>

      <Box>
        <Button
          onClick={() => router.push("/admin/products/addproduct")}
          variant="contained"
          color="success"
          sx={{ textTransform: "none", mb: 2 }}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ background: "rgba(118, 118, 120, 1)" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {theadNames.map((theadName, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "white", textAlign: "center" }}
                >
                  {theadName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {shopProducts?.map(({ product, price }, index) => (
              <AdminTabelProduct
                product={product}
                index={index}
                key={index}
                price={
                  <TableCell
                    sx={{
                      textAlign: "center",
                    }}
                    align="right"
                  >
                    {price}
                  </TableCell>
                }
                rempveButton={
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        dispatch(
                          deleteCartProduct({
                            token: localStorage.getItem("token")!,
                            id: product.id,
                          }),
                        ).then(() => setChange(!change));
                      }}
                    >
                      {deleteProductCartLoading ? (
                        <CircularProgress sx={{ color: "white" }} size={20} />
                      ) : (
                        "remove"
                      )}
                    </Button>
                  </TableCell>
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminProducts;
