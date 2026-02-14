"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import mainStore from "./reduxSystem/store";

function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={mainStore}>{children}</Provider>;
}

export default ReduxProvider;
