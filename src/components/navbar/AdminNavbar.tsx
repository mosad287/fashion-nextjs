"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function AdminNavbar() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          px: { xs: 0, ms: 5, lg: 10 },
          background: "rgba(102, 99, 109, 1)",
        }}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Image
              src="/logo.png"
              alt="logo"
              width={180}
              height={20}
              priority
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
              }}
              sizes="(max-width: 360px) 120px, 180px"
            />
          </Typography>
          <Button color="inherit" onClick={() => router.push("/")}>
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AdminNavbar;
