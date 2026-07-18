import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";


import { Feather } from "@expo/vector-icons";


import Card from "../ui/Card";

import { colors } from "../../theme/colors";


import {
  getAllCategories,
} from "../../helpers/categories";

export default function HabitForm({
  name,
  setName,

  nameError,
  setNameError,

  validationType,
  setValidationType,

  category,
  setCategory,

  minutes,
  setMinutes,

  mode,
  setMode,

  stage1,
  setStage1,

  stage2,
  setStage2,

  stage3,
  setStage3,
}) {


  return (
    <>
      
    

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

        <Card>
          <Text
            style={{
              color: colors.text,
              marginBottom: 16,
              fontWeight: "600",
            }}
          >
            Categoría
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            {getAllCategories().map(
              (item) => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    setCategory(item.id)
                  }
                  style={{
                    flex: 1,

                    paddingVertical: 16,

                    borderRadius: 16,

                    alignItems: "center",

                    backgroundColor:
                      category === item.id
                        ? "rgba(74,222,128,0.15)"
                        : "#111827",

                    borderWidth: 1,

                    borderColor:
                      category === item.id
                        ? colors.primary
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {item.icon}
                  </Text>

                  <Text
                    style={{
                      marginTop: 8,

                      color:
                        category === item.id
                          ? colors.primary
                          : colors.textSecondary,
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )
            )}
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
 

    </>
  );
}