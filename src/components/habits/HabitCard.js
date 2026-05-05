import { View, Text } from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import { formatTime } from "../../helpers/time";
import { pluralizeDays } from "../../helpers/date";

export default function HabitCard({
  habit,
  progress,
  onSelect,
  onComplete,
}) {
  const total =
    habit.stageConfig.stage1 +
    habit.stageConfig.stage2 +
    habit.stageConfig.stage3;

  const progressPercent =
    total > 0 ? habit.currentDay / total : 0;

  const getStageLabel = () => {
    if (habit.stage === 1) return "🧱 Destrucción";
    if (habit.stage === 2) return "⚙️ Implementación";
    return "🏆 Integración";
  };

  const isLocked =
    habit.lastCompletedAt &&
    Date.now() - habit.lastCompletedAt <
      86400000;

  return (
    <View style={{ marginBottom: 16 }}>
      {/* 🔥 progreso */}
      <Text>
        🔥 {habit.currentDay}/{total}{" "}
        {pluralizeDays(habit.currentDay)}
      </Text>

      {/* 🧠 etapa */}
      <Text>{getStageLabel()}</Text>

      {/* 🏷️ nombre */}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {habit.name}
      </Text>

      {/* ⏱️ progreso */}
      {habit.validationType === "time" && (
        <>
          <Text>
            ⏱️ {formatTime(progress)} /{" "}
            {formatTime(habit.targetSeconds)}
          </Text>

          <ProgressBar progress={progress / habit.targetSeconds} />
        </>
      )}

      {/* 🔒 lock */}
      {isLocked && (
        <Text>⏳ Ya completaste hoy</Text>
      )}

      {/* 🎮 acciones */}
      {!isLocked && (
        <>
          {habit.validationType === "time" && (
            <Button onPress={onSelect}>
              ▶️ Continuar
            </Button>
          )}

          {habit.validationType === "manual" && (
            <Button onPress={onComplete}>
              ✔ Marcar como hecho
            </Button>
          )}
        </>
      )}
    </View>
  );
}