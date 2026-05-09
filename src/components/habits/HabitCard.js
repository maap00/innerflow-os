import { View, Text } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import Card from "../ui/Card";
import { colors } from "../../theme/colors";
import { formatTime } from "../../helpers/time";
import { getLastResetTime } from "../../helpers/timeWindow";

export default function HabitCard({
  habit,
  progress,
  onSelect,
  onComplete,
}) {
  const total = habit.totalDays || 30;

  const progressPercent =
    habit.validationType === "time"
      ? Math.min(progress / habit.targetSeconds, 1)
      : habit.currentDay / total;

  const lastReset = getLastResetTime();

  const isLocked =
    habit.lastCompletedAt &&
    habit.lastCompletedAt > lastReset;

  const getStageLabel = () => {
    if (habit.stage === 1) return "🧱 Destrucción";
    if (habit.stage === 2) return "⚙️ Implementación";
    return "🏆 Integración";
  };

  return (
    <Card>
      {/* 🔥 HEADER */}
      <View style={{ marginBottom: 8 }}>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
          }}
        >
          🔥 {habit.currentDay}/{total} días
        </Text>

        <Text
          style={{
            color: colors.primary,
            fontSize: 13,
            marginTop: 2,
          }}
        >
          {getStageLabel()}
        </Text>
      </View>

      {/* 🏷️ NAME */}
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {habit.name}
      </Text>

      {/* ⏱️ PROGRESS */}
      {habit.validationType === "time" && (
        <>
          <Text
            style={{
              color: colors.textSecondary,
              marginBottom: 6,
            }}
          >
            ⏱️ {formatTime(progress)} /{" "}
            {formatTime(habit.targetSeconds)}
          </Text>

          <ProgressBar
            progress={progressPercent}
            color={colors.primary}
            style={{
              height: 8,
              borderRadius: 10,
              backgroundColor: "#1F2937",
            }}
          />
        </>
      )}

      {/* 📊 PROGRESS (manual) */}
      {habit.validationType === "manual" && (
        <ProgressBar
          progress={progressPercent}
          color={colors.primary}
          style={{
            height: 8,
            borderRadius: 10,
            backgroundColor: "#1F2937",
          }}
        />
      )}

      {/* 🔒 LOCK */}
      {isLocked && (
        <Text
          style={{
            color: colors.muted,
            marginTop: 10,
          }}
        >
          ⏳ Disponible a las 6 AM
        </Text>
      )}

      {/* 🎮 ACTIONS */}
      {!isLocked && (
        <View style={{ marginTop: 12 }}>
          {habit.validationType === "time" && (
            <Button
              mode="contained"
              onPress={onSelect}
              buttonColor={colors.primary}
              textColor="#000"
              style={{
                borderRadius: 12,
              }}
            >
              ▶️ Continuar foco
            </Button>
          )}

          {habit.validationType === "manual" && (
            <Button
              mode="contained"
              onPress={onComplete}
              buttonColor={colors.primary}
              textColor="#000"
              style={{
                borderRadius: 12,
              }}
            >
              ✔ Marcar como hecho
            </Button>
          )}
        </View>
      )}
    </Card>
  );
}