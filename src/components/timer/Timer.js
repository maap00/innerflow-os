import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import { useSessionStore } from "../../store/useSessionStore";
import { formatTime } from "../../helpers/time";

export default function Timer() {
  const {
    currentSession,
    startSession,
    stopSession,
    pauseSession,
    resumeSession,
    tick,
    selectedHabitId,
  } = useSessionStore();

  // ⏱️ Intervalo controlado
  useEffect(() => {
    if (!currentSession?.active) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession?.active]);

  // 🎯 Auto-complete
  useEffect(() => {
    if (currentSession?.completed) {
      stopSession();
      alert("🎉 Sesión completada! Sumaste puntos");
    }
  }, [currentSession?.completed]);

  return (
    <View style={{ padding: 16 }}>
      {/* ⏱️ Tiempo */}
      <Text style={{ fontSize: 32, textAlign: "center", color: "#E5E7EB" }}>
        {formatTime(currentSession?.duration || 0)}
      </Text>

      {/* 🎯 Objetivo */}
      {currentSession?.targetSeconds && (
        <Text style={{ textAlign: "center", marginTop: 8, color: "#E5E7EB" }}>
          / {formatTime(currentSession.targetSeconds)}
        </Text>
      )}

      {/* 🔘 CONTROLES */}
      <View style={{ marginTop: 20, gap: 10 }}>
        {!currentSession ? (
          <Button
            mode="contained"
            onPress={() => {
              if (!selectedHabitId) {
                alert("Seleccioná un hábito");
                return;
              }
              startSession(selectedHabitId);
            }}
          >
            Iniciar
          </Button>
        ) : (
          <>
            {currentSession.active ? (
              <Button mode="outlined" onPress={pauseSession}>
                Pausar
              </Button>
            ) : (
              <Button mode="outlined" onPress={resumeSession}>
                Reanudar
              </Button>
            )}

            <Button mode="contained" onPress={stopSession}>
              Finalizar
            </Button>
          </>
        )}
      </View>
    </View>
  );
}