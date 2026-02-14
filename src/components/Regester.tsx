"use client";

import { IUserRegester } from "@/interfaces/user";
import { userRegester } from "@/reduxSystem/slices/authSlice";
import { setLoginTrue } from "@/reduxSystem/slices/mainStatesSlice";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

function Regester() {
  const [showPassword, setShowPassword] = useState(false);
  const { userLoading, userRegesterError } = useSelector(
    (state: StoreType) => state.authSlice,
  );
  const dispatch = useDispatch<DispatchType>();
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("you must write your name")
      .min(3, "you must write more than 3 char"),
    email: yup
      .string()
      .required("you must write your email")
      .email("invalid email"),
    password: yup
      .string()
      .required("you must write your password")
      .matches(
        /^[a-z].{5,}/,
        "password mast pass 6 char and the first char must {a-z}",
      ),
    rePassword: yup
      .string()
      .required("you must write your repassword")
      .oneOf([yup.ref("password")], "rePassword must matched with password"),
    phone: yup
      .string()
      .required("you must write your phone")
      .matches(/^01[0125][0-9]{8}/, "must be eygiption number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: hundelRegester,
    validationSchema: validationSchema,
  });

  function hundelRegester(values: IUserRegester) {
    dispatch(userRegester(values)).then((res) => {
      if (res.payload.message == "success") {
        dispatch(setLoginTrue());
        router.replace("/");
      }
    });
  }

  return (
    <Box
      sx={{
        py: 7,
        px: { xs: 2, md: 5, lg: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: { xs: "100%", sm: "60%", md: "40%" },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "black" }} htmlFor="nameinput">
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
            id="nameinput"
          />
        </Box>

        {formik.errors.name && formik.touched.name && (
          <Alert severity="error">{formik.errors.name}</Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "black" }} htmlFor="emailinput">
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
            id="emailinput"
          />
        </Box>

        {formik.errors.email && formik.touched.email && (
          <Alert severity="error">{formik.errors.email}</Alert>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <InputLabel sx={{ color: "black" }} htmlFor="passwordinput">
              Password
            </InputLabel>
            <OutlinedInput
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              size="small"
              id="passwordinput"
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <InputLabel sx={{ color: "black" }} htmlFor="repasswordinput">
              Repassword
            </InputLabel>
            <OutlinedInput
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              size="small"
              id="repasswordinput"
              name="rePassword"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </Box>

        {formik.errors.password && formik.touched.password && (
          <Alert severity="error">{formik.errors.password}</Alert>
        )}

        {formik.errors.rePassword && formik.touched.rePassword && (
          <Alert severity="error">{formik.errors.rePassword}</Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InputLabel sx={{ color: "black" }} htmlFor="phoneinput">
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
            id="phoneinput"
          />
        </Box>

        {formik.errors.phone && formik.touched.phone && (
          <Alert severity="error">{formik.errors.phone}</Alert>
        )}

        {userRegesterError ? (
          <Alert severity="error">{userRegesterError}</Alert>
        ) : (
          ""
        )}

        <Box>
          <Button type="submit" variant="contained">
            {userLoading ? (
              <CircularProgress sx={{ color: "white", my: 0.5 }} size={20} />
            ) : (
              "Create Account"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Regester;
