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

  // =========================
  // ⏱️ TICK LOOP
  // =========================
  useEffect(() => {
    let interval;

    if (currentSession?.active) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currentSession?.active]);

  // =========================
  // 🎯 HÁBITO ACTIVO
  // =========================
  const selectedHabit = habits.find(
    (h) => h.id === selectedHabitId
  );

  // =========================
  // 🧠 FEEDBACK EMOCIONAL
  // =========================
  const getSessionFeedback = (duration, target) => {
    const minutes = Math.floor(duration / 60);

    if (duration < 60) {
      return {
        title: "⚠️ Muy corto",
        message: "Intentá sostener al menos 1 minuto de foco.",
      };
    }

    if (target && duration >= target) {
      return {
        title: "🎯 Objetivo logrado",
        message: `Excelente. Completaste ${minutes} min de foco.`,
      };
    }

    if (minutes >= 10) {
      return {
        title: "🔥 Buen progreso",
        message: `${minutes} min reales. Esto construye disciplina.`,
      };
    }

    return {
      title: "✅ Sesión válida",
      message: `${minutes} min sumados.`,
    };
  };

  // =========================
  // 🛑 STOP HANDLER
  // =========================
  const handleStop = () => {
    const duration = currentSession?.duration || 0;
    const target = currentSession?.targetSeconds;

    stopSession();

    // =========================
    // 🧠 FEEDBACK (alineado a validación)
    // =========================
    const feedback = getSessionFeedback(duration, target);

    alert(`${feedback.title}\n${feedback.message}`);
  };
  

  // =========================
  // 🎨 UI
  // =========================
  return (
    <Card style={{ margin: 16, padding: 16, backgroundColor: "#E5E7EB" }}>

      <Card.Content >
        <Text style={{ color: "#0D0F14", paddingHorizontal: 2 }} >⏱️ Time</Text>
        <Text style={{ fontSize: 32, textAlign: "center" }}>
          {currentSession
            ? formatTime(currentSession.duration)
            : "00:00:00"}
        </Text>

        {selectedHabit && (
          <Text style={{ textAlign: "center", marginTop: 8 }}>
            🎯 {selectedHabit.name}
          </Text>
        )}

        {currentSession?.targetSeconds && (
          <Text style={{ textAlign: "center", marginTop: 4 }}>
            Objetivo: {formatTime(currentSession.targetSeconds)}
          </Text>
        )}
      </Card.Content>

      <Card.Actions style={{ justifyContent: "center" }}>
        {!currentSession && selectedHabitId && (
          <Button
            mode="contained"
            onPress={() => startSession(selectedHabitId)}
          >
            Iniciar
          </Button>
        )}

        {currentSession?.active && (
          <Button mode="outlined" onPress={pauseSession}>
            Pausar
          </Button>
        )}

        {currentSession && !currentSession.active && (
          <Button mode="contained" onPress={resumeSession}>
            Reanudar
          </Button>
        )}

        {currentSession && (
          <Button mode="text" onPress={handleStop}>
            Finalizar
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
}