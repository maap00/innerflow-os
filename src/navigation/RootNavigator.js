import React, {
  useEffect,
} from "react";

import {
  ActivityIndicator,
  View,
} from "react-native";

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

import {
  useAuthStore,
} from "../store/useAuthStore";

import {
  supabase,
} from "../lib/supabase";

import {
  colors,
} from "../theme/colors";

export default function RootNavigator() {
  const session =
    useAuthStore(
      (state) =>
        state.session
    );

  const initialized =
    useAuthStore(
      (state) =>
        state.initialized
    );

  const initializeAuth =
    useAuthStore(
      (state) =>
        state.initializeAuth
    );

  const setSession =
    useAuthStore(
      (state) =>
        state.setSession
    );

  // =========================
  // INITIALIZE AUTH
  // =========================

  useEffect(() => {
    initializeAuth();

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth
        .onAuthStateChange(
          (
            _event,
            session
          ) => {
            setSession(
              session
            );
          }
        );

    return () => {
      subscription.unsubscribe();
    };
  }, [
    initializeAuth,
    setSession,
  ]);

  // =========================
  // LOADING
  // =========================

  if (!initialized) {
    return (
      <View
        style={{
          flex: 1,

          backgroundColor:
            colors.background,

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color={
            colors.primary
          }
        />
      </View>
    );
  }

  // =========================
  // NAVIGATION
  // =========================

  return session ? (
    <AppNavigator />
  ) : (
    <AuthNavigator />
  );
}