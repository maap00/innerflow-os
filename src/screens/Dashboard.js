import { View, Alert, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Timer from "../components/timer/Timer";
import { useSessionStore } from "../store/useSessionStore";

import { getTodayProgress } from "../helpers/habits";
import { formatTime } from "../helpers/time";

import { getHabitProgress } from "../helpers/habits";
import { pluralizeDays } from "../helpers/date";
import {
  groupSessionsByDay,
  sortSessionsDesc,
  formatDate,
} from "../helpers/history";

import {
  getTodayTotal,
  getTotalTargetToday,
} from "../helpers/metrics";

import { ProgressBar } from "react-native-paper";

export default function Dashboard({ navigation }) {
  const {
    habits,
    sessions,
    addHabit,
    streak,
    removeHabit,
    selectedHabitId,
    selectHabit,
    resetSessions,
    points,
    getLevel,
    balance,
  } = useSessionStore();

  const todayProgress = getTodayProgress(sessions);
  const sorted = sortSessionsDesc(sessions);
  const grouped = groupSessionsByDay(sorted);
  const days = Object.keys(grouped);
  const todayTotal = getTodayTotal(sessions);
  const totalTarget = getTotalTargetToday(habits);

  const progressPercent =
    totalTarget > 0
      ? Math.min((todayTotal / totalTarget) * 100, 100)
      : 0;

  const getProgressColor = () => {
    if (progressPercent >= 100) return "green";
    if (progressPercent >= 50) return "orange";
    return "red";
  };

  const level = getLevel();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} style={{ flex: 1, padding: 20 }}>
      
      <Text style={{ fontWeight: "bold", color: "#0D0F14" }} variant="headlineMedium">
        InnerFlow OS
      </Text>

      {/* =========================
          📊 CARD PRINCIPAL (MEJORADO)
      ========================= */}
      <Card style={{ marginBottom: 20, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          📊 Hoy
        </Text>

        {/* ⏱️ Tiempo */}
        <Text style={{ marginTop: 8 }}>
          🔥 {formatTime(todayTotal)} de foco real
        </Text>

        {/* 🎯 Objetivo */}
        <Text>
          🎯 Objetivo: {formatTime(totalTarget)}
        </Text>

        {/* 📈 Progreso */}
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          📈 {progressPercent.toFixed(0)}%
        </Text>

        <ProgressBar progress={progressPercent / 100} />

        {/* 🔥 Streak */}
        <Text style={{ marginTop: 8 }}>
          🔥 {streak} {pluralizeDays(streak)}
        </Text>

        {/* 💰 Economía */}
        <Text>💰 {balance} pts disponibles</Text>
        <Text>📊 {points} pts totales</Text>

        {/* 🏆 Nivel */}
        <Text style={{ marginTop: 8 }}>
          🏆 Nivel {level.level}
        </Text>

        <ProgressBar progress={level.progress} style={{ marginTop: 6 }} />

        <Text style={{ marginTop: 5 }}>
          {Math.floor(level.progress * 100)}% hacia nivel siguiente
        </Text>

        <Text>
          {level.currentPoints} / {level.nextLevelPoints} pts
        </Text>

        {/* 🚀 Momentum */}
        {streak >= 3 && (
          <Text style={{ marginTop: 10 }}>
            🚀 Estás en racha, no cortes el flujo
          </Text>
        )}

        {/* 🧠 Identidad */}
        <Text style={{ marginTop: 10 }}>
          Sos una persona que entrena su foco diariamente.
        </Text>
      </Card>

      {/* =========================
          🎯 HÁBITOS (mínimo ajuste UX)
      ========================= */}
      {habits.map((h) => {
        const isSelected = h.id === selectedHabitId;

        const progress = getHabitProgress(sessions, h.id);
        const completed = progress >= h.targetSeconds;

        return (
          <Card key={h.id}>
            <Text>
              🔥 {h.streak} {pluralizeDays(h.streak)} en este hábito
            </Text>

            <Text>{h.name}</Text>

            <Text>
              {formatTime(progress)} / {formatTime(h.targetSeconds)}
            </Text>

            <Text>
              {completed
                ? "✅ Completado hoy"
                : "⏳ En progreso"}
            </Text>

            <Button
              mode={isSelected ? "contained" : "outlined"}
              onPress={() => selectHabit(h.id)}
            >
              {isSelected ? "Seleccionado" : "Seleccionar"}
            </Button>

            <Button
              mode="outlined"
              onPress={() =>
                Alert.alert(
                  "Eliminar hábito",
                  "¿Seguro que querés eliminarlo?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Eliminar", onPress: () => removeHabit(h.id) },
                  ]
                )
              }
              style={{ marginTop: 10 }}
            >
              Eliminar
            </Button>
          </Card>
        );
      })}

      {/* =========================
          ⏱️ TIMER + HISTORIAL
      ========================= */}
      <Card>
        <Text>Sesión actual</Text>

        <Timer />

        {days.map((day) => (
          <Card key={day} style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              {formatDate(day)}
            </Text>

            {grouped[day].map((s, index) => {
              const habit = habits.find((h) => h.id === s.habitId);

              return (
                <Text key={index}>
                  🔥 {formatTime(s.duration)} de foco —{" "}
                  {habit?.name || "Sin hábito"}
                </Text>
              );
            })}
          </Card>
        ))}

        <Button
          mode="outlined"
          onPress={() =>
            Alert.alert(
              "Resetear sesiones",
              "¿Seguro que querés eliminar todo el historial?",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Eliminar",
                  onPress: resetSessions,
                  style: "destructive",
                },
              ]
            )
          }
        >
          Resetear
        </Button>
      </Card>

      {/* =========================
          ⚙️ ACCIONES
      ========================= */}
      <Button onPress={() => addHabit("Foco profundo", 1)}>
        Crear hábito 1 min
      </Button>

      <Button onPress={() => addHabit("Foco profundo", 10)}>
        Crear hábito 10 min
      </Button>

      <Button onPress={() => navigation.navigate("Focus")}>
        Ir a Foco
      </Button>
    </ScrollView>
  );
}