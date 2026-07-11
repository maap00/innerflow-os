import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import HabitMetricsRow from "../components/habitSession/HabitMetricsRow";
import HabitProgressRing from "../components/habitSession/HabitProgressRing";
import HabitSessionHeader from "../components/habitSession/HabitSessionHeader";
import SessionHistoryList from "../components/habitSession/SessionHistoryList";
import ScreenLayout from "../components/layout/ScreenLayout";
import { formatTime } from "../helpers/time";
import {
  getTodayHabitProgress,
  getHabitLifetimeTotal,
  getHabitHistory,
} from "../helpers/sessions";
import { useSessionStore } from "../store/useSessionStore";
import { colors } from "../theme/colors";
import {
  getHabitTodayProgress,
} from "../helpers/habitProgress";

export default function HabitSessionScreen() {
  const navigation = useNavigation();

  // Zustand Selectors (Optimized to prevent unnecessary re-renders)
  const habits = useSessionStore((state) => state.habits);
  const sessions = useSessionStore((state) => state.sessions);
  const selectedHabitId = useSessionStore((state) => state.selectedHabitId);
  const checkHabitCompletion = useSessionStore((state) => state.checkHabitCompletion);
  const startSession = useSessionStore((state) => state.startSession);

  // Derived State
  const habit = useMemo(() => {
    return habits.find((h) => h.id === selectedHabitId);
  }, [habits, selectedHabitId]);

  const {
    todaySeconds,
    progress,
    } = useMemo(() => {
      if (!habit) {
        return {
          todaySeconds: 0,
          progress: 0,
        };
      }

      return getHabitTodayProgress(
        sessions,
        habit
      );
    }, [sessions, habit]);

  const totalFocused = useMemo(() => {
    if (!habit) return 0;
    return getHabitLifetimeTotal(sessions, habit.id);
  }, [sessions, habit]);

  const history = useMemo(() => {
    if (!habit) return [];
    return getHabitHistory(sessions, habit.id);
  }, [sessions, habit]);

  // const progress = useMemo(() => {
  //   if (!habit || !habit.targetSeconds) return 0;
  //   return Math.min(todayProgress / habit.targetSeconds, 1);
  // }, [habit, todayProgress]);

 const isCompletedToday = useMemo(() => {
    if (!habit || !habit.targetSeconds) return false;

    return (
      todaySeconds >= habit.targetSeconds
    );
  }, [habit, todaySeconds]);

  // Auto-complete check on screen focus
  useFocusEffect(
    useCallback(() => {
      if (habit?.id) {
        checkHabitCompletion(habit.id);
      }
    }, [habit?.id, checkHabitCompletion])
  );

  // Handlers
  const handleClockIn = useCallback(() => {
    if (habit) {
      startSession(habit.id);
      navigation.navigate("TimerScreen");
    }
  }, [habit, startSession, navigation]);

  if (!habit) {
    return null;
  }

  return (
    <ScreenLayout>
      <HabitSessionHeader habit={habit} />

      <HabitMetricsRow
        todayTarget={formatTime(habit.targetSeconds || 0)}
        totalFocused={formatTime(totalFocused)}
      />

      <HabitProgressRing
      progress={progress}
      current={formatTime(todaySeconds)}
      target={formatTime(habit.targetSeconds)}
    />

      {/* CLOCK IN */}
      {isCompletedToday ? (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>✅ Completed Today</Text>
        </View>
      ) : (
        <Pressable onPress={handleClockIn} style={styles.clockInButton}>
          <Text style={styles.clockInText}>⏱ Clock In</Text>
        </Pressable>
      )}

      {/* HISTORY */}
      <SessionHistoryList sessions={history} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  completedContainer: {
    backgroundColor: colors.success,
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 28,
  },
  completedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  clockInButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 28,
  },
  clockInText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});