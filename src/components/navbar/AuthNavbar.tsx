"use client";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AuthNavbar() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          px: { xs: 0, md: 2, lg: 6 },
          background: "rgba(217, 215, 236, 1)",
          color: "black",
        }}
        position="fixed"
      >
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Image
              src="/logo.png"
              alt="loge"
              width={180}
              height={20}
              priority
            />
          </Typography>
          <IconButton
            sx={{ backgroundColor: "none", color: "black" }}
            size="large"
            onClick={() => router.push("/login")}
          >
            <LoginIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AuthNavbar;
