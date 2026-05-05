import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import { useSessionStore } from "../../store/useSessionStore";
import { formatTime } from "../../helpers/time";

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
    <Card style={{ margin: 16, padding: 16 }}>
      <Card.Title title="⏱️ Timer" />

      <Card.Content>
        <Text style={{ fontSize: 32, textAlign: "center" }}>
          {currentSession
            ? formatTime(currentSession.duration)
            : "00:00:00"}
        </Text>

        {selectedHabit && (
          <Text style={{ textAlign: "center" }}>
            🎯 {selectedHabit.name}
          </Text>
        )}
      </Card.Content>

      <Card.Actions style={{ justifyContent: "center" }}>
        {!currentSession && selectedHabitId && (
          <Button
            mode="contained"
            onPress={() => startSession(selectedHabitId)}
          >
            ▶️ Empezar foco
          </Button>
        )}

        {currentSession?.active && (
          <Button onPress={pauseSession}>
            Pausar
          </Button>
        )}

        {currentSession && !currentSession.active && (
          <Button onPress={resumeSession}>
            Reanudar
          </Button>
        )}

        {currentSession && (
          <Button onPress={stopSession}>
            Finalizar
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
}