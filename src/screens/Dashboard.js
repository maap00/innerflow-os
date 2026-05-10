import { View, ScrollView, Text } from "react-native";
import { ProgressBar } from "react-native-paper";

import Card from "../components/ui/Card";
import HabitCard from "../components/habits/HabitCard";
import Timer from "../components/timer/Timer";

import { useSessionStore } from "../store/useSessionStore";
import { colors } from "../theme/colors";

import { getHabitProgress } from "../helpers/habits";
import { getTodayTotal, getTotalTargetToday } from "../helpers/metrics";
import { formatTime } from "../helpers/time";

export default function Dashboard() {
  const {
    habits,
    sessions,
    selectHabit,
    completeHabit,
    getLevel,
    points,
    balance,
  } = useSessionStore();

  const level = getLevel();

  const todayTotal = getTodayTotal(sessions);
  const totalTarget = getTotalTargetToday(habits);

  const progressPercent =
    totalTarget > 0
      ? Math.min(todayTotal / totalTarget, 1)
      : 0;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
         padding: 16,
         paddingBottom: 140,
      }}
    >
      {/* 🔥 HEADER */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          InnerFlow OS
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 4,
          }}
        >
          Nivel {level.level} • {points} pts
        </Text>
      </View>

      {/* 📊 PROGRESO DEL DÍA */}
      <Card>
        <Text style={{ color: colors.textSecondary }}>
          Hoy
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 4,
          }}
        >
          {formatTime(todayTotal)}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 4,
          }}
        >
          Objetivo: {formatTime(totalTarget)}
        </Text>

        <ProgressBar
          progress={progressPercent}
          color={colors.primary}
          style={{
            marginTop: 10,
            height: 8,
            borderRadius: 10,
            backgroundColor: "#1F2937",
          }}
        />

        <Text
          style={{
            color: colors.primary,
            marginTop: 6,
          }}
        >
          {Math.floor(progressPercent * 100)}% completado
        </Text>
      </Card>

      {/* 🎯 HÁBITOS */}
      <View style={{ marginTop: 10 }}>
        {habits.map((h) => {
          const progress = getHabitProgress(sessions, h.id);

          return (
            <HabitCard
              key={h.id}
              habit={h}
              progress={progress}
              onSelect={() => selectHabit(h.id)}
              onComplete={() => completeHabit(h.id)}
            />
          );
        })}
      </View>

      {/* ⏱️ TIMER */}
      <Timer />

      {/* 🧠 INSIGHTS */}
      <Card>
        <Text
          style={{
            color: colors.text,
            fontWeight: "bold",
          }}
        >
          🧠 Insight
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 6,
          }}
        >
          Tu mejor rendimiento ocurre cuando empezás temprano.
        </Text>
      </Card>

      {/* 📈 ANALYTICS SIMPLE */}
      <Card>
        <Text
          style={{
            color: colors.text,
            fontWeight: "bold",
          }}
        >
          📈 Progreso semanal
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 6,
          }}
        >
          Próximamente gráficos avanzados
        </Text>
      </Card>
    </ScrollView>
  );
}