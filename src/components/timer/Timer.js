import { useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useSessionStore } from "../../store/useSessionStore";

import { formatTime } from "../../helpers/time";

export default function Timer() {
  const {
    currentSession,
    startSession,
    stopSession,
    tick,
    selectedHabitId
  } = useSessionStore();
  

  useEffect(() => {
    let interval;

    if (currentSession?.active) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }

    if (currentSession?.completed) {
    stopSession();
    alert("🎉 Sesión completada!");
  }

    return () => clearInterval(interval);
  }, [currentSession?.active, currentSession?.completed]);

  

  return (
    <View style={{ alignItems: "center" }}>
     <Text variant="displaySmall">
        {formatTime(currentSession?.duration || 0)} /{" "}
        {formatTime(currentSession?.targetSeconds || 0)}
    </Text>

      {!currentSession ? (
        <Button mode="contained" onPress={() => {
                if (!selectedHabitId) {
                  alert("Seleccioná un hábito primero");
                  return;
                }
                startSession(selectedHabitId);
              }}>
          Iniciar
        </Button>
      ) : (
        <Button mode="contained" onPress={stopSession}>
          Finalizar
        </Button>
      )}
    </View>
  );
}