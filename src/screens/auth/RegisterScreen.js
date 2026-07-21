import React, {
  useState,
} from "react";

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

export default function RegisterScreen() {
  const navigation =
    useNavigation();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
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

  const signUp =
    useAuthStore(
      (state) =>
        state.signUp
    );

  const clearError =
    useAuthStore(
      (state) =>
        state.clearError
    );

  const handleRegister =
    async () => {
      if (
        !email.trim() ||
        !password
      ) {
        Alert.alert(
          "Missing information",
          "Please complete all fields."
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        Alert.alert(
          "Password mismatch",
          "Passwords do not match."
        );

        return;
      }

      const result =
        await signUp(
          email.trim(),
          password
        );

      if (
        result.success &&
        !result.data.session
      ) {
        Alert.alert(
          "Check your email",
          "We sent you a confirmation link to activate your account.",
          [
            {
              text: "OK",

              onPress: () =>
                navigation.navigate(
                  "Login"
                ),
            },
          ]
        );
      }
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

          fontSize: 34,

          fontWeight: "bold",
        }}
      >
        Create Account
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,

          marginTop: 8,

          marginBottom: 36,
        }}
      >
        Start building your
        discipline system.
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

          padding: 16,

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

          padding: 16,

          borderRadius: 16,

          marginBottom: 14,
        }}
      />

      <TextInput
        value={
          confirmPassword
        }
        onChangeText={
          setConfirmPassword
        }
        placeholder="Confirm Password"
        placeholderTextColor={
          colors.textSecondary
        }
        secureTextEntry
        autoCapitalize="none"
        style={{
          backgroundColor:
            "#111827",

          color: colors.text,

          padding: 16,

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
          handleRegister
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

              fontWeight:
                "bold",

              fontSize: 16,
            }}
          >
            Create Account
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => {
          clearError();

          navigation.goBack();
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
          Already have an
          account?{" "}

          <Text
            style={{
              color:
                colors.primary,

              fontWeight:
                "bold",
            }}
          >
            Sign In
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}