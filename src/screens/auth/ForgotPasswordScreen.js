import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
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

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const [email, setEmail] =
    useState("");

  const loading =
    useAuthStore(
      (state) => state.loading
    );

  const error =
    useAuthStore(
      (state) => state.error
    );

  const resetPassword =
    useAuthStore(
      (state) =>
        state.resetPassword
    );

  const clearError =
    useAuthStore(
      (state) =>
        state.clearError
    );

  // =========================
  // RESET PASSWORD
  // =========================

  const handleResetPassword =
    async () => {
      if (!email.trim()) {
        Alert.alert(
          "Email required",
          "Please enter your email address."
        );

        return;
      }

      const result =
        await resetPassword(
          email.trim()
        );

      if (!result.success) {
        return;
      }

      Alert.alert(
        "Check your email",
        "We sent you instructions to reset your password.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    };

  // =========================
  // UI
  // =========================

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

          fontSize: 34,

          fontWeight: "bold",
        }}
      >
        Reset Password
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,

          fontSize: 16,

          marginTop: 8,

          marginBottom: 36,
        }}
      >
        Enter your email and
        we'll send you recovery
        instructions.
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
        keyboardType="email-address"
        autoCapitalize="none"
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
          handleResetPassword
        }
        disabled={loading}
        style={{
          backgroundColor:
            colors.primary,

          paddingVertical: 18,

          borderRadius: 18,

          alignItems: "center",

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

              fontWeight: "bold",
            }}
          >
            Send Reset Email
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={() =>
          navigation.goBack()
        }
        style={{
          marginTop: 24,

          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.primary,

            fontWeight: "600",
          }}
        >
          Back to Sign In
        </Text>
      </Pressable>
    </View>
  );
}