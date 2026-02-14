"use client";

import { getProfileInfo } from "@/reduxSystem/slices/profile";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { profile } = useSelector((state: StoreType) => state.profileSlice);
  const dispatch = useDispatch<DispatchType>();

  const router = useRouter();

  useEffect(() => {
    dispatch(getProfileInfo());
  }, [dispatch]);

  return (
    <Box sx={{ px: { xs: 2, lg: 5, xl: 10 }, py: 7 }}>
      <Typography variant="h5" sx={{ color: "gray", fontWeight: "bolder" }}>
        My Profile
      </Typography>
      <Typography variant="h6" sx={{ color: "rgb(67,160,71)", py: 1 }}>
        {profile ? profile.name : ""}
      </Typography>
      <Box
        sx={{ width: "100%", height: "1px", background: "gray", mb: 2 }}
      ></Box>
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <InputLabel sx={{ color: "gray" }} htmlFor="nameinput">
            Name
          </InputLabel>
          <TextField
            value={profile?.name || ""}
            disabled
            type="text"
            size="small"
            fullWidth
            id="nameinput"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "gray" }} htmlFor="emailinput">
            Email
          </InputLabel>
          <TextField
            value={profile?.email || ""}
            disabled
            type="text"
            size="small"
            fullWidth
            id="emailinput"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "gray" }} htmlFor="roleinput">
            Role
          </InputLabel>
          <TextField
            value={
              profile?.email === "mosadalbarbary832@gmail.com"
                ? "admin"
                : profile
                  ? "user"
                  : ""
            }
            disabled
            type="text"
            size="small"
            fullWidth
            id="roleinput"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "gray" }} htmlFor="phoneinput">
            Phone
          </InputLabel>
          <TextField
            value={profile?.phone || ""}
            disabled
            type="text"
            size="small"
            fullWidth
            id="phoneinput"
          />
        </Box>
        <Box>
          <Button
            variant="outlined"
            color="success"
            onClick={() => router.push("/profile/edite")}
          >
            edit profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
