import { View, Alert, ScrollView, Dimensions } from "react-native";
import { Text, ProgressBar } from "react-native-paper";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Timer from "../components/timer/Timer";
import { useSessionStore } from "../store/useSessionStore";

import { formatTime } from "../helpers/time";
import { getHabitProgress, getTodayProgress } from "../helpers/habits";
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

import {
  getBestFocusHour,
  getBestWeekday,
  getAverageDailyMinutes,
} from "../helpers/insights";

import { BarChart } from "react-native-chart-kit";

import { getLast7DaysFocus } from "../helpers/charts";

import { getCoachMessage } from "../helpers/coach";
import HabitCard from "../components/habits/HabitCard";


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
    completeHabit
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

  const level = getLevel();

  // =========================
  // 🧠 LOOP DE RETENCIÓN
  // =========================
  const getRetentionMessage = () => {
    if (streak >= 5) {
      return "🔥 Gran racha. Hoy no la rompas.";
    }

    if (progressPercent >= 100) {
      return "🎯 Día cumplido. Mañana seguimos más fuerte.";
    }

    if (progressPercent >= 70) {
      return "⚡ Estás cerca de completar hoy.";
    }

    if (todayTotal === 0) {
      return "🚀 Un bloque de foco puede cambiar tu día.";
    }

    return "⏱️ Cada minuto suma.";
  };

    const bestHour = getBestFocusHour(sessions);
    const bestDay = getBestWeekday(sessions);
    const avgMinutes = getAverageDailyMinutes(sessions);

    const screenWidth = Dimensions.get("window").width - 40;

    const chartData = getLast7DaysFocus(sessions);

    const isPremium = false;

    const coach = getCoachMessage({
        sessions,
        streak,
        progressPercent,
    });

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      style={{ flex: 1, padding: 20 }}
    >
      <Text
        style={{ fontWeight: "bold", color: "#0D0F14" }}
        variant="headlineMedium"
      >
        InnerFlow OS
      </Text>

      {/* =========================
          📊 CARD PRINCIPAL
      ========================= */}
      <Card style={{ marginBottom: 20, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          📊 Hoy
        </Text>

        {/* 🧠 MENSAJE RETENCIÓN */}
        <Text style={{ marginTop: 8, marginBottom: 10 }}>
          {getRetentionMessage()}
        </Text>

        {/* ⏱️ Tiempo */}
        <Text>
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

        {/* 🧠 LOSS AVERSION */}
        {streak >= 2 && (
          <Text style={{ marginTop: 4 }}>
            🛡️ Hoy protegés {streak} {pluralizeDays(streak)} de progreso
          </Text>
        )}

        {/* 💰 Economía */}
        <Text style={{ marginTop: 8 }}>
          💰 {balance} pts disponibles
        </Text>

        <Text>
          📊 {points} pts totales
        </Text>

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
          🎯 HÁBITOS
      ========================= */}

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

      <Card style={{ marginBottom: 20, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            🧠 Insights personales
        </Text>

        <Text style={{ marginTop: 8 }}>
            ⏰ Mejor hora: {bestHour}:00 hs
        </Text>

        <Text>
            📅 Mejor día: {bestDay}
        </Text>

        <Text>
            📈 Promedio diario: {avgMinutes} min
        </Text>

        <Text style={{ marginTop: 10 }}>
            Usá tus mejores horarios para tareas críticas.
        </Text>
    </Card>

    <Card style={{ marginBottom: 20, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            🧠 InnerFlow Coach
        </Text>

        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            {coach.title}
        </Text>

        <Text style={{ marginTop: 6 }}>
            {coach.message}
        </Text>
    </Card>

    <Card style={{ marginBottom: 20, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            📈 Últimos 7 días
        </Text>

        <BarChart
            data={{
            labels: chartData.map((d) => d.label),
            datasets: [
                {
                data: chartData.map((d) => d.minutes),
                },
            ],
            }}
            width={screenWidth}
            height={220}
            fromZero
            yAxisLabel=""
            chartConfig={{
            decimalPlaces: 1,
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) =>
                `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) =>
                `rgba(0,0,0,${opacity})`,
            barPercentage: 0.7,
            }}
            style={{
            marginTop: 10,
            borderRadius: 12,
            }}
        />

        <Text style={{ marginTop: 10 }}>
            Minutos de foco por día
        </Text>
    </Card>

    

    {isPremium ? (
        <AdvancedAnalytics />
        ) : (
        <Card>
            <Text>🔒 Analytics avanzados disponibles en Premium</Text>

            <Button>
            Probar Premium
            </Button>
        </Card>
        )}

    

      {/* =========================
          ⏱️ TIMER + HISTORIAL
      ========================= */}
      <Card>
        <Text>Sesión actual</Text>

        <Timer />

        {days.map((day) => (
          <Card key={day} style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              {formatDate(day)}
            </Text>

            {grouped[day].map((s, index) => {
              const habit = habits.find(
                (h) => h.id === s.habitId
              );

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
      <Button onPress={() => navigation.navigate("CreateHabit")}>
        + Nuevo hábito
    </Button>
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