"use client";

import { IProfileEdite } from "@/interfaces/profile";
import { getProfileInfo } from "@/reduxSystem/slices/profile";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import {
  Alert,
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

function ProfileEdit() {
  const { profile } = useSelector((state: StoreType) => state.profileSlice);
  const dispatch = useDispatch<DispatchType>();

  const router = useRouter();

  useEffect(() => {
    dispatch(getProfileInfo());
  }, [dispatch]);

  const [userError, setUserError] = useState("");

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("you must write your name")
      .min(3, "you must write more than 3 char"),
    email: yup
      .string()
      .required("you must write your email")
      .email("invalid email"),
    phone: yup
      .string()
      .required("you must write your phone")
      .matches(/^01[0125][0-9]{8}/, "must be eygiption number"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profile ? profile.name : "",
      email: profile ? profile.email : "",
      phone: profile ? profile.phone : "",
    },

    onSubmit: handelUpdate,
    validationSchema: validationSchema,
  });

  async function handelUpdate(values: IProfileEdite) {
    try {
      await axios
        .put("https://ecommerce.routemisr.com/api/v1/users/updateMe", values, {
          headers: { token: localStorage.getItem("token") },
        })
        .then(() => {
          router.push("/profile");
        });
    } catch (error) {
      setUserError(error.message);
    }
  }

  return (
    <Box sx={{ px: { xs: 2, lg: 5, xl: 10 }, py: 7 }}>
      <Typography variant="h5" sx={{ color: "gray", fontWeight: "bolder" }}>
        My Profile
      </Typography>
      <Typography variant="h6" sx={{ color: "rgb(67,160,71)", py: 1 }}>
        {profile?.name}
      </Typography>
      <Box
        sx={{ width: "100%", height: "1px", background: "gray", mb: 2 }}
      ></Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
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
          <InputLabel sx={{ color: "gray" }} htmlFor="nameInput">
            Name
          </InputLabel>
          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            type="text"
            size="small"
            fullWidth
            id="nameInput"
          />
        </Box>

        {formik.errors.name && formik.touched.name && (
          <Alert severity="error">{formik.errors.name}</Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "gray" }} htmlFor="emailInput">
            Email
          </InputLabel>
          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="text"
            size="small"
            fullWidth
            id="emailInput"
          />
        </Box>

        {formik.errors.email && formik.touched.email && (
          <Alert severity="error">{formik.errors.email}</Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "gray" }} htmlFor="phoneInput">
            Phone
          </InputLabel>
          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            type="text"
            size="small"
            fullWidth
            id="phoneInput"
          />
        </Box>

        {formik.errors.phone && formik.touched.phone && (
          <Alert severity="error">{formik.errors.phone}</Alert>
        )}

        {userError ? <Alert severity="error">{userError}</Alert> : ""}

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Button type="submit" variant="outlined" color="success">
            edit
          </Button>
          <Button
            onClick={() => router.back()}
            type="button"
            variant="outlined"
            color="info"
          >
            back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileEdit;
