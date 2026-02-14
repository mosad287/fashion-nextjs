import Collections from "@/components/Home/Collections";
import Collections2 from "@/components/Home/Collections2";
import FreeDiv from "@/components/Home/FreeDiv";
import HomeBackground from "@/components/Home/HomeBackground";
import { Box } from "@mui/material";
import React from "react";

function HomePage() {
  return (
    <Box>
      <HomeBackground />
      <Collections />
      <FreeDiv />
      <Collections2 />
    </Box>
  );
}

export default HomePage;
