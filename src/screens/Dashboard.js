import { View } from "react-native";
import { Text } from "react-native-paper";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Timer from "../components/timer/Timer";
import { useSessionStore } from "../store/useSessionStore";

import { getTodayProgress } from "../helpers/habits";
import { formatTime } from "../helpers/time";
import { Alert } from "react-native";

import { getHabitProgress } from "../helpers/habits";
import { pluralizeDays } from "../helpers/date";

export default function Dashboard({ navigation }) {

  const { habits, sessions, addHabit, streak, removeHabit, selectedHabitId ,selectHabit} = useSessionStore();
  const todayProgress = getTodayProgress(sessions);
  

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", color: "#0D0F14" }} variant="headlineMedium">InnerFlow OS</Text>

      <Text style={{ color: "#0D0F14" }}>🔥 Streak: {streak} días</Text>
      
      {habits.map((h) => {
        const isSelected = h.id === selectedHabitId;

        const progress = getHabitProgress(sessions, h.id);
        const completed = progress >= h.targetSeconds;

        return (
            <Card key={h.id}>
            <Text>🔥 {h.streak} {pluralizeDays(h.streak)}</Text>
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
       {sessions.map((s, index) => (
            <Text key={index}>
                Sesión: {formatTime(s.duration)}
            </Text>
        ))}
      </Card>

      <Button onPress={() => addHabit("Foco profundo", 1)}>
        Crear hábito 1 min
      </Button>

      <Button onPress={() => navigation.navigate("Focus")}>
        Ir a Foco
      </Button>
    </View>
  );
}