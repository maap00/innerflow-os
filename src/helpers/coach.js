import { getTodayTotal } from "./metrics";
import { getBestFocusHour } from "./insights";

export const getCoachMessage = ({
  sessions,
  streak,
  progressPercent,
}) => {
  const todayTotal = getTodayTotal(sessions);
  const hour = new Date().getHours();
  const bestHour = getBestFocusHour(sessions);

  if (todayTotal === 0) {
    return {
      title: "🚀 Empezá simple",
      message:
        "Un bloque corto de foco ahora puede cambiar tu día.",
    };
  }

  if (progressPercent >= 100) {
    return {
      title: "🎯 Día cumplido",
      message:
        "Excelente trabajo. Hoy mantené el ritmo liviano.",
    };
  }

  if (streak >= 5) {
    return {
      title: "🔥 Racha fuerte",
      message:
        "Protegé tu consistencia con una sesión breve.",
    };
  }

  if (bestHour !== null && hour === bestHour) {
    return {
      title: "⚡ Hora premium",
      message:
        "Suele ser tu mejor hora de foco. Aprovechala.",
    };
  }

  return {
    title: "🧠 Siguiente paso",
    message:
      "Completá otro bloque y acercate a tu objetivo.",
  };
};