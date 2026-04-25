import { View, Alert, ScrollView} from "react-native";
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
    points } = useSessionStore();
    const todayProgress = getTodayProgress(sessions);
    const sorted = sortSessionsDesc(sessions);
    const grouped = groupSessionsByDay(sorted);
    const days = Object.keys(grouped);
    const todayTotal = getTodayTotal(sessions);
    const totalTarget = getTotalTargetToday(habits);

    const progressPercent =
    totalTarget > 0
        ? Math.min(
            (todayTotal / totalTarget) * 100,
            100
        )
        : 0;

    const getProgressColor = () => {
        if (progressPercent >= 100) return "green";
        if (progressPercent >= 50) return "orange";
        return "red";
    };
    

    
  return (
    <ScrollView contentContainerStyle={{padding: 16}} style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", color: "#0D0F14" }} variant="headlineMedium">InnerFlow OS</Text>

      <Card style={{ marginBottom: 20, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            📊 Hoy
        </Text>

        {/* ⏱️ Tiempo */}
        <Text style={{ marginTop: 8 }}>
            ⏱️ {formatTime(todayTotal)}
        </Text>

        {/* 🎯 Objetivo */}
        <Text>
            🎯 {formatTime(totalTarget)}
        </Text>

        {/* 📈 Progreso */}
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            📈 {progressPercent.toFixed(0)}%
        </Text>

        {/* 🔥 Streak global */}
        <Text>
            🔥 {streak} {pluralizeDays(streak)}
        </Text>
        <Text>
        💰 {points} puntos
        </Text>
      </Card>

      
      {habits.map((h) => {
        const isSelected = h.id === selectedHabitId;

        const progress = getHabitProgress(sessions, h.id);
        const completed = progress >= h.targetSeconds;

        return (
            <Card key={h.id}>
            <Text>🔥 Streak: {h.streak} {pluralizeDays(h.streak)}</Text>
            <Text>{h.name}</Text>

            <Text>
                {formatTime(progress)} / {formatTime(h.targetSeconds)}
            </Text>

            <Text>
                {completed ? "✅ Completado" : "⏳ En progreso"}
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
      <Card>
        <Text>Sesión actual</Text>
        
        <Timer />
      
        {days.map((day) => (
            
            <Card key={day} style={{ marginBottom: 16 }}>
                {/* 📅 Fecha */}
                <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
                {formatDate(day)}
                </Text>

                {/* 🧾 Sesiones del día */}
                {grouped[day].map((s, index) => {
                const habit = habits.find((h) => h.id === s.habitId);

                return (
                <Text key={index}>
                    ⏱️ {formatTime(s.duration)} —{" "}
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

      <Button onPress={() => addHabit("Foco profundo", 1)}>
        Crear hábito 1 min
      </Button>

      <Button onPress={() => navigation.navigate("Focus")}>
        Ir a Foco
      </Button>
    </ScrollView>
  );
}