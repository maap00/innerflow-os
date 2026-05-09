import { ScrollView, Text } from "react-native";
import { Button } from "react-native-paper";

import { useSessionStore } from "../store/useSessionStore";
import HabitCard from "../components/habits/HabitCard";
import { getHabitProgress } from "../helpers/habits";

export default function Habits() {
  const { habits, sessions, selectHabit, completeHabit, addHabit } =
    useSessionStore();

  return (
    <ScrollView style={{ padding: 16 }}>
      <Button
        mode="contained"
        onPress={() => addHabit("Nuevo hábito", 10)}
      >
        + Crear hábito
      </Button>

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
    </ScrollView>
  );
}