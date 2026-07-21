import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useAuthStore,
} from "../../store/useAuthStore";

import {
  colors,
} from "../../theme/colors";

export default function LoginScreen() {
  const navigation =
    useNavigation();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const loading =
    useAuthStore(
      (state) =>
        state.loading
    );

  const error =
    useAuthStore(
      (state) =>
        state.error
    );

  const signIn =
    useAuthStore(
      (state) =>
        state.signIn
    );

  const clearError =
    useAuthStore(
      (state) =>
        state.clearError
    );

  const handleLogin =
    async () => {
      if (
        !email.trim() ||
        !password
      ) {
        return;
      }

      await signIn(
        email.trim(),
        password
      );
    };

  return (
    <View
      style={{
        flex: 1,

        backgroundColor:
          colors.background,

        justifyContent:
          "center",

        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: colors.text,

          fontSize: 36,

          fontWeight: "bold",
        }}
      >
        InnerFlow
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,

          fontSize: 16,

          marginTop: 8,

          marginBottom: 40,
        }}
      >
        Welcome back.
      </Text>

      <TextInput
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          clearError();
        }}
        placeholder="Email"
        placeholderTextColor={
          colors.textSecondary
        }
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        style={{
          backgroundColor:
            "#111827",

          color: colors.text,

          paddingHorizontal: 18,

          paddingVertical: 16,

          borderRadius: 16,

          marginBottom: 14,
        }}
      />

      <TextInput
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          clearError();
        }}
        placeholder="Password"
        placeholderTextColor={
          colors.textSecondary
        }
        secureTextEntry
        autoCapitalize="none"
        style={{
          backgroundColor:
            "#111827",

          color: colors.text,

          paddingHorizontal: 18,

          paddingVertical: 16,

          borderRadius: 16,

          marginBottom: 14,
        }}
      />

      <Pressable
        onPress={() => {
            clearError();

            navigation.navigate(
            "ForgotPassword"
            );
        }}
        style={{
            alignSelf: "flex-end",

            marginBottom: 20,
        }}
        >
        <Text
            style={{
            color: colors.primary,

            fontWeight: "600",
            }}
        >
            Forgot Password?
        </Text>
    </Pressable>

      {error && (
        <Text
          style={{
            color: "#EF4444",

            marginBottom: 14,
          }}
        >
          {error}
        </Text>
      )}

      <Pressable
        onPress={
          handleLogin
        }
        disabled={loading}
        style={{
          backgroundColor:
            colors.primary,

          paddingVertical: 18,

          borderRadius: 18,

          alignItems:
            "center",

          opacity:
            loading
              ? 0.6
              : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color="#000"
          />
        ) : (
          <Text
            style={{
              color: "#000",

              fontSize: 16,

              fontWeight:
                "bold",
            }}
          >
            Sign In
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => {
          clearError();

          navigation.navigate(
            "Register"
          );
        }}
        style={{
          marginTop: 24,

          alignItems:
            "center",
        }}
      >
        <Text
          style={{
            color:
              colors.textSecondary,
          }}
        >
          Don't have an
          account?{" "}

          <Text
            style={{
              color:
                colors.primary,

              fontWeight:
                "bold",
            }}
          >
            Sign Up
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}