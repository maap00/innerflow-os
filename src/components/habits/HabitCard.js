import { View, Text, Pressable } from "react-native";

import { ProgressBar } from "react-native-paper";

import { Feather } from "@expo/vector-icons";

import Card from "../ui/Card";

import { colors } from "../../theme/colors";

import { formatTime } from "../../helpers/time";

import { getLastResetTime } from "../../helpers/timeWindow";

import HabitBadgeRow
from "./HabitBadgeRow";

export default function HabitCard({
  habit,
  progress,
  onStartFocus,
  onComplete,
}) {
  // =========================
  // 🧠 DII
  // =========================

  const total =
    habit.totalDays || 30;

  const progressPercent =
  habit.validationType === "time"
    ? progress
    : habit.currentDay / total;

  // =========================
  // 🔒 LOCK
  // =========================

  const lastReset =
    getLastResetTime();

  const isLocked =
    habit.lastCompletedAt &&
    habit.lastCompletedAt > lastReset;

  // =========================
  // 🎨 STAGE UI
  // =========================

  const getStageData = () => {
    if (habit.stage === 1) {
      return {
        label: "🧱 Destrucción",
        accent: "#CD7F32",
      };
    }

    if (habit.stage === 2) {
      return {
        label: "⚙️ Implementación",
        accent: "#C0C0C0",
      };
    }

    return {
      label: "🏆 Integración",
      accent: "#FFD700",
    };
  };

  const stage =
    getStageData();

  // =========================
  // 🔥 STREAK
  // =========================

  const isHighStreak =
    habit.currentDay >= 7;

  // =========================
  // 🎨 UI
  // =========================



  return (
    <Card
      style={{
        opacity: isLocked ? 0.75 : 1,

        borderColor: isHighStreak
          ? colors.primary
          : colors.border,

        shadowColor: isHighStreak
          ? colors.primary
          : "#000",

        shadowOpacity: isHighStreak
          ? 0.35
          : 0.2,
      }}
    >
      {/* 🔥 TOP */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          // alignItems: "center",

          marginBottom: 14,
        }}
      >
        {/* LEFT */}

         
          <Text
            style={{
              color:
                colors.textSecondary,

              fontSize: 22,
            }}
          >
            {habit.currentDay}/
            {total} días
          </Text>

        <View>

          
        

           <Text
            style={{
              color:
                stage.accent,

          

              fontSize: 13,

              fontWeight: "600",
               marginBottom: 14,
            }}
          >
            {stage.label}
          </Text>



          <HabitBadgeRow
            milestones={habit.milestones}
          />

          

        
        </View>

     
      </View>

      {/* 🏷️ NAME */}

      <Text
        style={{
          color: colors.text,

          fontSize: 22,

          fontWeight: "bold",

         
        }}
      >
        {habit.name}
      </Text>

       

      {/* ⏱️ TIME HABIT */}

      {habit.validationType ===
        "time" && (
        <>
          <Text
            style={{
              color:
                colors.textSecondary,

              marginBottom: 10,
            }}
          >
            ⏱️ {formatTime(progress)} /{" "}
            {formatTime(
              habit.targetSeconds
            )}
          </Text>

          <ProgressBar
            progress={
              progressPercent
            }
            color={colors.primary}
            style={{
              height: 10,

              borderRadius: 12,

              backgroundColor:
                "#1F2937",
            }}
          />
        </>
      )}

      {/* ✔ MANUAL */}

      {habit.validationType ===
        "manual" && (
        <>
          <Text
            style={{
              color:
                colors.textSecondary,

              marginBottom: 10,
            }}
          >
            ✔ Validación manual
          </Text>

          <ProgressBar
            progress={
              progressPercent
            }
            color={colors.primary}
            style={{
              height: 10,

              borderRadius: 12,

              backgroundColor:
                "#1F2937",
            }}
          />
        </>
      )}

      {/* 🔒 LOCK STATE */}

      {isLocked && (
        <View
          style={{
            marginTop: 18,

            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Feather
            name="lock"
            size={16}
            color={colors.textSecondary}
          />

          <Text
            style={{
              color:
                colors.textSecondary,

              marginLeft: 8,
            }}
          >
            Completado hoy ·
            disponible mañana
            6 AM
          </Text>
        </View>
      )}

      {/* 🎮 ACTIONS */}

      {!isLocked && (
        <View
          style={{
            marginTop: 18,
          }}
        >
          {/* ⏱️ TIME */}

          {habit.validationType ===
            "time" && (
            <Pressable
              onPress={onStartFocus}
              style={{
                backgroundColor:
                  colors.primary,

                paddingVertical: 16,

                borderRadius: 16,

                alignItems: "center",

                shadowColor:
                  colors.primary,

                shadowOpacity: 0.4,

                shadowRadius: 16,

                shadowOffset: {
                  width: 0,
                  height: 8,
                },

                elevation: 10,
              }}
            >
              <Text
                style={{
                  color: "#000",

                  fontWeight:
                    "bold",

                  fontSize: 15,
                }}
              >
                ▶ Continuar foco
              </Text>
            </Pressable>
          )}

          {/* ✔ MANUAL */}

          {habit.validationType ===
            "manual" && (
            <Pressable
              onPress={onComplete}
              style={{
                backgroundColor:
                  colors.primary,

                paddingVertical: 16,

                borderRadius: 16,

                alignItems: "center",

                shadowColor:
                  colors.primary,

                shadowOpacity: 0.4,

                shadowRadius: 16,

                shadowOffset: {
                  width: 0,
                  height: 8,
                },

                elevation: 10,
              }}
            >
              <Text
                style={{
                  color: "#000",

                  fontWeight:
                    "bold",

                  fontSize: 15,
                }}
              >
                ✔ Marcar completado
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </Card>
  );
}