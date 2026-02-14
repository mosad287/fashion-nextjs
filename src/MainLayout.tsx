"use client";

import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StoreType } from "./reduxSystem/store";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { ReactNode, useEffect } from "react";
import {
  setAdminTrue,
  setLoginTrue,
} from "./reduxSystem/slices/mainStatesSlice";
import ReduxProvider from "./ReduxProvider";

function LayoutContent({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<DispatchType>();
  const { isLogin, isAdmin } = useSelector(
    (state: StoreType) => state.mainStatesSlice,
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setLoginTrue());
    }
  }, [isLogin, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("role")) {
      dispatch(setAdminTrue());
    }
  }, [isAdmin, dispatch]);

  return <>{children}</>;
}

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider>
          <LayoutContent>{children}</LayoutContent>
        </ReduxProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default MainLayout;
