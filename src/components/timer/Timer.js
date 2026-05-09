import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import { useSessionStore } from "../../store/useSessionStore";
import CircularTimer from "./CircularTimer";
import { colors } from "../../theme/colors";

export default function Timer() {
  const {
    currentSession,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    tick,
    habits,
    selectedHabitId,
  } = useSessionStore();

  // ⏱️ Tick loop
  useEffect(() => {
    let interval;

    if (currentSession?.active) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentSession?.active]);

  const selectedHabit = habits.find(
    (h) => h.id === selectedHabitId
  );

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
      }}
    >
      {/* 🎯 Hábito activo */}
      {selectedHabit && (
        <Text
          style={{
            color: colors.primary,
            marginBottom: 10,
            fontSize: 14,
          }}
        >
          🎯 {selectedHabit.name}
        </Text>
      )}

      {/* 🔵 TIMER CIRCULAR */}
      <View
        style={{
          shadowColor: colors.primary,
          shadowOpacity: 0.4,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
        }}
      >
        <CircularTimer
          duration={currentSession?.duration || 0}
          target={currentSession?.targetSeconds || 1500}
        />
      </View>

      {/* 🎮 CONTROLES */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 24,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        {/* ▶️ START */}
        {!currentSession && selectedHabitId && (
          <Button
            mode="contained"
            onPress={() => startSession(selectedHabitId)}
            buttonColor={colors.primary}
            textColor="#000"
            style={{ borderRadius: 12 }}
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
            style={{ borderRadius: 12 }}
          >
            Reanudar
          </Button>
        )}

        {/* ⛔ STOP */}
        {currentSession && (
          <Button
            mode="text"
            onPress={stopSession}
            textColor="#ef4444"
          >
            Finalizar
          </Button>
        )}
      </View>
    </View>
  );
}