import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DashboardHero from "../components/dashboard/DashboardHero";
import HabitCard from "../components/habits/HabitCard";
import ScreenLayout from "../components/layout/ScreenLayout";
import { getHabitProgress } from "../helpers/habits";
import { getTodayTotal, getTotalTargetToday } from "../helpers/metrics";
import { useSessionStore } from "../store/useSessionStore";
import { getHabitTodayProgress } from "../helpers/habitProgress";

export default function Dashboard() {
  const navigation = useNavigation();

  // Zustand Selectors (Optimized to prevent unnecessary re-renders)
  const habits = useSessionStore((state) => state.habits);
  const sessions = useSessionStore((state) => state.sessions);
  const selectHabit = useSessionStore((state) => state.selectHabit);
  const completeHabit = useSessionStore((state) => state.completeHabit);

  // Derived State
  const todayTotal = useMemo(() => getTodayTotal(sessions), [sessions]);
  const totalTarget = useMemo(() => getTotalTargetToday(habits), [habits]);

  // Handlers
  const handleStartFocus = useCallback(
    (habitId) => {
      selectHabit(habitId);
      navigation.navigate("HabitSession");
    },
    [selectHabit, navigation]
  );

  const handleComplete = useCallback(
    (habitId) => {
      completeHabit(habitId);
    },
    [completeHabit]
  );

  return (
    <ScreenLayout>
      <DashboardHero />

      <Text style={styles.title}>Today Tasks</Text>

      {habits.map((habit) => {
       const {
          progress,
          todaySeconds,
        } =
          getHabitTodayProgress(
            sessions,
            habit
          );

        return (
        <HabitCard
          key={habit.id}
          habit={habit}
          progress={progress}
          todaySeconds={todaySeconds}
          onStartFocus={() => handleStartFocus(habit.id)}
          onComplete={() => handleComplete(habit.id)}
        />
        );
      })}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },
});