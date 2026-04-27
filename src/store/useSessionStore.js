import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLevelData } from "../helpers/level";

// =========================
// ⚙️ CONFIG VALIDACIÓN
// =========================
const MIN_VALID_SECONDS = 60;
const MIN_PROGRESS_RATIO = 0.6;

// =========================
// 💾 HELPERS STORAGE
// =========================
const saveData = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const loadData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// =========================
// 🧠 STORE
// =========================
export const useSessionStore = create((set, get) => ({
  // =========================
  // 📊 STATE
  // =========================
  sessions: [],
  currentSession: null,
  habits: [],
  selectedHabitId: null,
  streak: 0,
  points: 0,
  balance: 0,

  // =========================
  // 🔄 LOAD
  // =========================
  loadInitialData: async () => {
    const sessions = await loadData("sessions");
    const habits = await loadData("habits");
    const streak = await loadData("streak");
    const points = await loadData("points");

    set({
      sessions: sessions || [],
      habits: habits || [],
      streak: streak || 0,
      points: points || 0,
      balance: balance || 0,
    });
  },

  // =========================
  // 🎯 HABITS
  // =========================
  addHabit: (name, targetMinutes) =>
    set((state) => {
      const newHabit = {
        id: Date.now().toString(),
        name,
        targetSeconds: targetMinutes * 60,
        streak: 0,
      };

      const updated = [...state.habits, newHabit];
      saveData("habits", updated);

      return { habits: updated };
    }),

  removeHabit: (id) =>
    set((state) => {
      const updated = state.habits.filter((h) => h.id !== id);
      saveData("habits", updated);
      return { habits: updated };
    }),

  selectHabit: (id) => set({ selectedHabitId: id }),

  // =========================
  // ⏱️ SESSION CONTROL
  // =========================
  startSession: (habitId) =>
    set((state) => {
      const habit = state.habits.find((h) => h.id === habitId);

      return {
        currentSession: {
          startTime: Date.now(),
          duration: 0,
          active: true,
          habitId,
          targetSeconds: habit?.targetSeconds || null,
          completed: false,
        },
      };
    }),

  pauseSession: () =>
    set((state) => {
      if (!state.currentSession) return {};
      return {
        currentSession: {
          ...state.currentSession,
          active: false,
        },
      };
    }),

  resumeSession: () =>
    set((state) => {
      if (!state.currentSession) return {};
      return {
        currentSession: {
          ...state.currentSession,
          active: true,
        },
      };
    }),

  tick: () =>
    set((state) => {
      if (!state.currentSession?.active) return {};

      const newDuration = state.currentSession.duration + 1;
      const target = state.currentSession.targetSeconds;

      const isCompleted = target && newDuration >= target;

      return {
        currentSession: {
          ...state.currentSession,
          duration: newDuration,
          completed: isCompleted,
        },
      };
    }),

  // =========================
  // 🛑 STOP SESSION
  // =========================
  stopSession: () =>
    set((state) => {
      const session = state.currentSession;
      if (!session) return {};

      const endTime = Date.now();
      const duration = session.duration;
      const target = session.targetSeconds;

      // =========================
      // 🧠 VALIDACIÓN ANTI-TRAMPA
      // =========================
      const meetsMinDuration = duration >= MIN_VALID_SECONDS;

      const meetsProgress = target
        ? duration / target >= MIN_PROGRESS_RATIO
        : true;

      const isValidSession =
        meetsMinDuration && meetsProgress;

      // =========================
      // 🧾 SESSION FINAL
      // =========================
      const newSession = {
        ...session,
        endTime,
        duration,
        isValid: isValidSession,
      };

      const updatedSessions = [...state.sessions, newSession];

      const newBalance = state.balance + earnedPoints;

      // =========================
      // 🔥 STREAK GLOBAL
      // =========================
      let newStreak = state.streak;

      if (isValidSession) {
        const today = new Date().toDateString();
        const lastSession = state.sessions[state.sessions.length - 1];

        if (lastSession) {
          const lastDay = new Date(lastSession.endTime).toDateString();

          if (lastDay !== today) {
            newStreak += 1;
          }
        } else {
          newStreak = 1;
        }
      }

      // =========================
      // 🔥 STREAK POR HÁBITO
      // =========================
      const updatedHabits = state.habits.map((h) => {
        if (h.id !== session.habitId) return h;

        const completed =
          isValidSession &&
          target &&
          duration >= target;

        return {
          ...h,
          streak: completed ? h.streak + 1 : h.streak,
        };
      });

      // =========================
      // 💰 PUNTOS
      // =========================
      const earnedPoints = isValidSession
        ? Math.floor(duration / 60)
        : 0;

      const newPoints = state.points + earnedPoints;

      // =========================
      // 💾 PERSISTENCIA
      // =========================
      saveData("sessions", updatedSessions);
      saveData("habits", updatedHabits);
      saveData("streak", newStreak);
      saveData("points", newPoints);
      saveData("balance", newBalance);

      return {
        sessions: updatedSessions,
        currentSession: null,
        habits: updatedHabits,
        streak: newStreak,
        points: newPoints,
        balance: newBalance,
      };
    }),
    
 // =========================
  // 🆕 SISTEMA DE NIVELES
  // =========================
  getLevel: () => {
    const { points } = get();
    return getLevelData(points);
  },
  // =========================
  // 🧹 RESET
  // =========================
  resetSessions: () => {
    saveData("sessions", []);
    saveData("streak", 0);

    set({
      sessions: [],
      streak: 0,
    });
  },

   // =========================
  // REWARDS
  // =========================

  redeemReward: (reward) =>
  set((state) => {
    if (state.balance < reward.cost) {
      alert("No tenés puntos suficientes");
      return {};
    }

    const newBalance = state.balance - reward.cost;

    saveData("balance", newBalance);

    alert(`Canjeaste: ${reward.title}`);

    return {
      balance: newBalance,
    };
  }),
}));