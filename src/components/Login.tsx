"use client";

import { IUserLogin } from "@/interfaces/user";
import { userLogin } from "@/reduxSystem/slices/authSlice";
import {
  setAdminTrue,
  setLoginTrue,
} from "@/reduxSystem/slices/mainStatesSlice";
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
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { userLoading, userLoginError } = useSelector(
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
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: hundelLogin,
    validationSchema: validationSchema,
  });

  function hundelLogin(values: IUserLogin) {
    dispatch(userLogin(values)).then((res) => {
      if (res.payload.message == "success") {
        dispatch(setLoginTrue());

        if (values.email === "mosadalbarbary832@gmail.com") {
          localStorage.setItem("role", "admin");
          dispatch(setAdminTrue());
        }

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
                    showPassword ? "hide the password" : "display the password"
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

        {formik.errors.password && formik.touched.password && (
          <Alert severity="error">{formik.errors.password}</Alert>
        )}

        {userLoginError ? <Alert severity="error">{userLoginError}</Alert> : ""}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={userLoading}
            sx={{ minWidth: 100 }}
          >
            {userLoading && (
              <CircularProgress sx={{ color: "white" }} size={20} />
            )}
            {!userLoading && "Login"}
          </Button>

          <Button
            onClick={() => router.push("/regester")}
            type="button"
            variant="contained"
          >
            create new account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
