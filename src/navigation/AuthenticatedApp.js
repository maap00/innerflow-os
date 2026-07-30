import React, {
  useEffect,
} from "react";

import AppNavigator from "./AppNavigator";

import {
  useSessionStore,
} from "../store/useSessionStore";

export default function AuthenticatedApp() {
  const loadInitialData =
    useSessionStore(
      (state) =>
        state.loadInitialData
    );

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return <AppNavigator />;
}