import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";

import { useState } from "react";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import Card from "../components/ui/Card";

import { colors } from "../theme/colors";

import { useSessionStore } from "../store/useSessionStore";

export default function CreateHabits() {
  const navigation = useNavigation();

  const { addHabit } = useSessionStore();

  // =========================
  // 🧠 FORM STATE
  // =========================

  const [name, setName] = useState("");

  const [nameError, setNameError] =
    useState(false);

  const [validationType, setValidationType] =
    useState("time");

  const [minutes, setMinutes] = useState(30);

  const [mode, setMode] = useState("custom");

  const [stage1, setStage1] = useState("30");
  const [stage2, setStage2] = useState("30");
  const [stage3, setStage3] = useState("30");

  // =========================
  // 🚀 CREATE
  // =========================

  const handleCreateHabit = () => {
    // 🚨 VALIDATION

    if (!name.trim()) {
      setNameError(true);
      return;
    }

    setNameError(false);

    const config = {
      validationType,

      targetMinutes:
        validationType === "time"
          ? minutes
          : 0,

      stageConfig:
        mode === "222222"
          ? {
              stage1: 22,
              stage2: 22,
              stage3: 22,
            }
          : {
              stage1: Number(stage1),
              stage2: Number(stage2),
              stage3: Number(stage3),
            },
    };

    addHabit(name.trim(), config);

    navigation.goBack();
  };

  // =========================
  // 🎨 UI
  // =========================

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 140,
        }}
      >
        {/* 🔥 HEADER */}

        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Nuevo hábito
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 8,
              fontSize: 15,
            }}
          >
            Diseñá un nuevo sistema de disciplina.
          </Text>
        </View>

        {/* 🏷️ NAME */}

        <Card>
          <Text
            style={{
              color: colors.text,
              marginBottom: 12,
              fontWeight: "600",
            }}
          >
            Nombre del hábito
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);

              if (text.trim()) {
                setNameError(false);
              }
            }}
            placeholder="Ej: Estudiar inglés"
            placeholderTextColor="#6B7280"
            style={{
              backgroundColor: "#111827",

              color: colors.text,

              borderRadius: 14,

              paddingHorizontal: 16,
              paddingVertical: 14,

              fontSize: 16,

              borderWidth: 1,

              borderColor: nameError
                ? "#EF4444"
                : "transparent",
            }}
          />

          {nameError && (
            <Text
              style={{
                color: "#EF4444",

                marginTop: 10,

                fontSize: 13,
              }}
            >
              El hábito necesita un nombre.
            </Text>
          )}
        </Card>

        {/* ⚡ VALIDATION */}

        <Card>
          <Text
            style={{
              color: colors.text,
              marginBottom: 16,
              fontWeight: "600",
            }}
          >
            Tipo de validación
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            {/* ⏱ TIME */}

            <Pressable
              onPress={() =>
                setValidationType("time")
              }
              style={{
                flex: 1,

                paddingVertical: 16,

                borderRadius: 16,

                alignItems: "center",

                backgroundColor:
                  validationType === "time"
                    ? "rgba(74,222,128,0.15)"
                    : "#111827",

                borderWidth: 1,

                borderColor:
                  validationType === "time"
                    ? colors.primary
                    : "transparent",
              }}
            >
              <Feather
                name="clock"
                size={24}
                color={
                  validationType === "time"
                    ? colors.primary
                    : colors.textSecondary
                }
              />

              <Text
                style={{
                  marginTop: 8,

                  color:
                    validationType === "time"
                      ? colors.primary
                      : colors.textSecondary,
                }}
              >
                Tiempo
              </Text>
            </Pressable>

            {/* ✔ MANUAL */}

            <Pressable
              onPress={() =>
                setValidationType("manual")
              }
              style={{
                flex: 1,

                paddingVertical: 16,

                borderRadius: 16,

                alignItems: "center",

                backgroundColor:
                  validationType === "manual"
                    ? "rgba(74,222,128,0.15)"
                    : "#111827",

                borderWidth: 1,

                borderColor:
                  validationType === "manual"
                    ? colors.primary
                    : "transparent",
              }}
            >
              <Feather
                name="check-circle"
                size={24}
                color={
                  validationType === "manual"
                    ? colors.primary
                    : colors.textSecondary
                }
              />

              <Text
                style={{
                  marginTop: 8,

                  color:
                    validationType === "manual"
                      ? colors.primary
                      : colors.textSecondary,
                }}
              >
                Manual
              </Text>
            </Pressable>
          </View>
        </Card>

        {/* ⏱ TIME CONFIG */}

        {validationType === "time" && (
          <Card>
            <Text
              style={{
                color: colors.text,
                marginBottom: 14,
                fontWeight: "600",
              }}
            >
              Duración objetivo
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                onPress={() =>
                  setMinutes(
                    Math.max(1, minutes - 5)
                  )
                }
              >
                <Feather
                  name="minus-circle"
                  size={32}
                  color={colors.primary}
                />
              </Pressable>

              <Text
                style={{
                  color: colors.text,
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                {minutes} min
              </Text>

              <Pressable
                onPress={() =>
                  setMinutes(minutes + 5)
                }
              >
                <Feather
                  name="plus-circle"
                  size={32}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          </Card>
        )}

        {/* 🧠 DII MODE */}

        <Card>
          <Text
            style={{
              color: colors.text,
              marginBottom: 16,
              fontWeight: "600",
            }}
          >
            Sistema DII
          </Text>

          {/* OPTIONS */}

          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {/* CUSTOM */}

            <Pressable
              onPress={() => setMode("custom")}
              style={{
                flex: 1,

                paddingVertical: 14,

                borderRadius: 14,

                alignItems: "center",

                backgroundColor:
                  mode === "custom"
                    ? "rgba(74,222,128,0.15)"
                    : "#111827",

                borderWidth: 1,

                borderColor:
                  mode === "custom"
                    ? colors.primary
                    : "transparent",
              }}
            >
              <Text
                style={{
                  color:
                    mode === "custom"
                      ? colors.primary
                      : colors.textSecondary,
                }}
              >
                Personalizado
              </Text>
            </Pressable>

            {/* 22/22/22 */}

            <Pressable
              onPress={() =>
                setMode("222222")
              }
              style={{
                flex: 1,

                paddingVertical: 14,

                borderRadius: 14,

                alignItems: "center",

                backgroundColor:
                  mode === "222222"
                    ? "rgba(74,222,128,0.15)"
                    : "#111827",

                borderWidth: 1,

                borderColor:
                  mode === "222222"
                    ? colors.primary
                    : "transparent",
              }}
            >
              <Text
                style={{
                  color:
                    mode === "222222"
                      ? colors.primary
                      : colors.textSecondary,
                }}
              >
                22/22/22
              </Text>
            </Pressable>
          </View>

          {/* CUSTOM CONFIG */}

          {mode === "custom" && (
            <View style={{ gap: 12 }}>
              <TextInput
                value={stage1}
                onChangeText={setStage1}
                keyboardType="numeric"
                placeholder="Destrucción"
                placeholderTextColor="#6B7280"
                style={{
                  backgroundColor: "#111827",

                  color: colors.text,

                  borderRadius: 12,

                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
              />

              <TextInput
                value={stage2}
                onChangeText={setStage2}
                keyboardType="numeric"
                placeholder="Implementación"
                placeholderTextColor="#6B7280"
                style={{
                  backgroundColor: "#111827",

                  color: colors.text,

                  borderRadius: 12,

                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
              />

              <TextInput
                value={stage3}
                onChangeText={setStage3}
                keyboardType="numeric"
                placeholder="Integración"
                placeholderTextColor="#6B7280"
                style={{
                  backgroundColor: "#111827",

                  color: colors.text,

                  borderRadius: 12,

                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
              />
            </View>
          )}
        </Card>

        {/* 👀 PREVIEW */}

        <Card>
          <Text
            style={{
              color: colors.textSecondary,
              marginBottom: 8,
            }}
          >
            🔥 0/{stage1} días
          </Text>

          <Text
            style={{
              color: colors.primary,
              marginBottom: 10,
            }}
          >
            🧱 Destrucción
          </Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {name || "Nuevo hábito"}
          </Text>

          {validationType === "time" ? (
            <Text
              style={{
                color: colors.textSecondary,
                marginTop: 10,
              }}
            >
              ⏱️ 00:00 / {minutes}:00
            </Text>
          ) : (
            <Text
              style={{
                color: colors.textSecondary,
                marginTop: 10,
              }}
            >
              ✔ Validación manual
            </Text>
          )}
        </Card>
      </ScrollView>

      {/* 🚀 CTA */}

      <View
        style={{
          position: "absolute",

          left: 16,
          right: 16,
          bottom: 40,
        }}
      >
        <Pressable
          onPress={() => {
            if (!name.trim()) {
              setNameError(true);
              return;
            }

            handleCreateHabit();
          }}
          style={{
            backgroundColor: colors.primary,

            paddingVertical: 18,

            borderRadius: 18,

            alignItems: "center",

            opacity: name.trim()
              ? 1
              : 0.5,

            shadowColor: colors.primary,
            shadowOpacity: 0.5,
            shadowRadius: 20,
            shadowOffset: {
              width: 0,
              height: 10,
            },

            elevation: 10,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Crear hábito
          </Text>
        </Pressable>
      </View>
    </View>
  );
}