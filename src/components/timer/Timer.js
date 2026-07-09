import React, { useEffect, useMemo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useSessionStore } from "../../store/useSessionStore";
import { colors } from "../../theme/colors";
import CircularTimer from "./CircularTimer";

export default function Timer() {
  const navigation = useNavigation();

  // Zustand Selectors (Optimized to prevent unnecessary re-renders)
  const currentSession = useSessionStore((state) => state.currentSession);
  const startSession = useSessionStore((state) => state.startSession);
  const pauseSession = useSessionStore((state) => state.pauseSession);
  const resumeSession = useSessionStore((state) => state.resumeSession);
  const stopSession = useSessionStore((state) => state.stopSession);
  const tick = useSessionStore((state) => state.tick);
  const habits = useSessionStore((state) => state.habits);
  const selectedHabitId = useSessionStore((state) => state.selectedHabitId);

  // ⏱️ Tick loop
  useEffect(() => {
    let interval;

    if (currentSession?.active) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentSession?.active, tick]);

  // Derived State
  const selectedHabit = useMemo(() => {
    return habits.find((h) => h.id === selectedHabitId);
  }, [habits, selectedHabitId]);

  // Handlers
  const handleStart = useCallback(() => {
    if (selectedHabitId) {
      startSession(selectedHabitId);
    }
  }, [selectedHabitId, startSession]);

  const handleStop = useCallback(() => {
    navigation.goBack();
    stopSession();
  }, [stopSession, navigation]);

  return (
    <View style={styles.container}>
      {/* 🎯 Hábito activo */}
      {selectedHabit && (
        <Text style={styles.habitTitle}>
          🎯 {selectedHabit.name}
        </Text>
      )}

      {/* 🔵 TIMER CIRCULAR */}
      <View style={styles.timerWrapper}>
        <CircularTimer
          duration={currentSession?.duration || 0}
          target={currentSession?.targetSeconds || 1500}
        />
      </View>

      {/* 🎮 CONTROLES */}
      <View style={styles.controlsRow}>
        {/* ▶️ START */}
        {!currentSession && selectedHabitId && (
          <Button
            mode="contained"
            onPress={handleStart}
            buttonColor={colors.primary}
            textColor="#000"
            style={styles.primaryButton}
          >
            ▶️ Empezar
          </Button>
        )}

        {/* ⏸️ PAUSE */}
        {currentSession?.active && (
          <Button mode="outlined" onPress={pauseSession}>
            Pausar
          </Button>
        )}

        {/* ▶️ RESUME */}
        {currentSession && !currentSession.active && (
          <Button
            mode="contained"
            onPress={resumeSession}
            buttonColor={colors.primary}
            textColor="#000"
            style={styles.primaryButton}
          >
            Reanudar
          </Button>
        )}

        {/* ⛔ STOP */}
        {currentSession && (
          <Button
            mode="text"
            onPress={handleStop}
            textColor="#ef4444"
          >
            Finalizar
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  habitTitle: {
    color: colors.primary,
    marginBottom: 10,
    fontSize: 14,
  },
  timerWrapper: {
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 20,
  },
  primaryButton: {
    borderRadius: 12,
  },
});