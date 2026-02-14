"use client";

import { Button, TableCell, TableRow } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function AdminTabelProduct({ product, price, index, rempveButton }) {
  const router = useRouter();

  return (
    <TableRow
      key={index}
      sx={{
        backgroundColor:
          index % 2 === 0 ? "rgba(240,240,240,1)" : "rgba(220,220,220,1)",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={product.imageCover}
          alt="product"
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
        />
      </TableCell>
      {price}
      <TableCell align="center">
        <Button
          variant="contained"
          onClick={() =>
            router.push(`/admin/products/${product.id}/name/${product.title}`)
          }
        >
          view
        </Button>
      </TableCell>
      {rempveButton}
    </TableRow>
  );
}

export default AdminTabelProduct;
