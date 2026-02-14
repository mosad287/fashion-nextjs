"use client";

import { getAllProducts } from "@/reduxSystem/slices/adminAddProductSlice";
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
import { getShopProducts } from "@/reduxSystem/slices/shopSlice";
import { addCartProduct } from "@/reduxSystem/slices/cartSlice";

function AdminAddProduct() {
  const theadNames = ["product", "Price", "View", "Add"];
  const [change, setChange] = useState(false);

  const { allProducts } = useSelector(
    (state: StoreType) => state.adminAddProductSlice,
  );
  const { shopProducts, shopProductsLoading } = useSelector(
    (state: StoreType) => state.shopSlice,
  );
  const { addProductCartLoading } = useSelector(
    (state: StoreType) => state.cartSlice,
  );

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    dispatch(getShopProducts());
    dispatch(getAllProducts());
  }, [dispatch, change]);

  const newArrayProductNoAdded = allProducts.filter((product1) => {
    return !shopProducts.some((product2) => {
      return product1.id == product2.product.id;
    });
  });

  return (
    <Box sx={{ py: 7, px: 2 }}>
      <Typography
        variant="h4"
        sx={{ color: "rgba(50, 46, 60, 1)", mb: 3, textAlign: "center" }}
      >
        Add Products
      </Typography>

      {shopProductsLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "gray" }} />
        </Box>
      ) : (
        <>
          {newArrayProductNoAdded.length ? (
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
                  {newArrayProductNoAdded.map((product, index) => (
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
                          {product.price}
                        </TableCell>
                      }
                      rempveButton={
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              dispatch(
                                addCartProduct({
                                  token: localStorage.getItem("token")!,
                                  id: product.id,
                                }),
                              ).then(() => setChange(!change));
                            }}
                          >
                            {addProductCartLoading ? (
                              <CircularProgress
                                sx={{ color: "white" }}
                                size={20}
                              />
                            ) : (
                              "Add"
                            )}
                          </Button>
                        </TableCell>
                      }
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              variant="h4"
              sx={{ color: "gray", mb: 3, textAlign: "center" }}
            >
              No Product :: All Product Added
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default AdminAddProduct;
