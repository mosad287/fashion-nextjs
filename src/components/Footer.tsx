import React from "react";
import { Box, Grid2, Input, Typography } from "@mui/material";
import Image from "next/image";

function Footer() {
  return (
    <Box sx={{ px: { xs: 2, md: 5, lg: 10 }, py: 7, background: "#212121" }}>
      <Grid2
        container
        spacing={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2
          maxWidth="320px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 2,
          }}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <Image src="/footer-logo.png" alt="error" width={180} height={20} />
          <Typography sx={{ color: "white" }}>
            The customer is at the heart of our unique business model, which
            includes design.
          </Typography>
          <Image src="/payment.png" alt="error" width={180} height={27} />
        </Grid2>

        <Grid2
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            gap: 2,
          }}
          maxWidth="320px"
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            SHOPPING
          </Typography>
          <Typography sx={{ color: "white" }}>Home</Typography>
          <Typography sx={{ color: "white" }}>Shop</Typography>
          <Typography sx={{ color: "white" }}> About Us</Typography>
        </Grid2>

        <Grid2 maxWidth="320px" size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "white", mb: 2 }}
          >
            PARTNER
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mb: 2 }}>
            <Image
              src="/clients/client-1.png"
              alt="error"
              width={70}
              height={70}
            />
            <Image
              src="/clients/client-3.png"
              alt="error"
              width={70}
              height={70}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Image
              src="/clients/client-4.png"
              alt="error"
              width={70}
              height={70}
            />
            <Image
              src="/clients/client-5.png"
              alt="error"
              width={70}
              height={70}
            />
          </Box>
        </Grid2>

        <Grid2 maxWidth="320px" size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            NEWLITTER
          </Typography>

          <Typography sx={{ color: "white", my: 1 }}>
            The customer is at the heart of our unique business model, which
            includes design.
          </Typography>
          <Input type="text" placeholder="Your Email" sx={{ color: "white" }} />
        </Grid2>
      </Grid2>
      <Box
        sx={{ width: "100%", height: "1px", background: "white", mt: 4 }}
      ></Box>
      <Box sx={{ pt: 4, textAlign: "center" }}>
        <Typography sx={{ color: "white" }}>copyright @ 2025 & 2020</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
