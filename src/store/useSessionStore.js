import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLevelData } from "../helpers/level";
import { getLastResetTime } from "../helpers/timeWindow";

// =========================
// ⚙️ CONFIG
// =========================
const MIN_VALID_SECONDS = 60;
const MIN_PROGRESS_RATIO = 0.6;

// =========================
// 💾 STORAGE HELPERS
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
  sessions: [],
  currentSession: null,
  habits: [],
  selectedHabitId: null,
  streak: 0,
  points: 0,
  balance: 0,

  // =========================
  // 🔄 LOAD + MIGRACIÓN
  // =========================
  loadInitialData: async () => {
    const sessions = await loadData("sessions");
    const habits = (await loadData("habits")) || [];
    const streak = await loadData("streak");
    const points = await loadData("points");
    const balance = await loadData("balance");

    const migratedHabits = habits.map((h) => ({
      validationType: "time",
      totalDays: 30,
      stage: 1,
      currentDay: 0,
      stageConfig: {
        stage1: 30,
        stage2: 30,
        stage3: 30,
      },
      lastCompletedAt: null,
      ...h,
    }));

    set({
      sessions: sessions || [],
      habits: migratedHabits,
      streak: streak || 0,
      points: points || 0,
      balance: balance || 0,
    });
  },

  // =========================
  // 🎯 HABITS
  // =========================
addHabit: (name, config) =>
  set((state) => {
    const stageConfig = config.stageConfig;

    const totalDays =
      stageConfig.stage1;

    const newHabit = {
      id: Date.now().toString(),

      name,

      validationType:
        config.validationType,

      targetSeconds:
        config.validationType === "time"
          ? config.targetMinutes * 60
          : null,

      currentDay: 0,

      stage: 1,

      totalDays,

      stageConfig,

      lastCompletedAt: null,

      streak: 0,
    };

    const updated = [
      ...state.habits,
      newHabit,
    ];

    saveData("habits", updated);

    return {
      habits: updated,
    };
  }),
  // 👉 SOLO PARA HÁBITOS MANUALES
  completeHabit: (habitId) =>
    set((state) => {
      const now = Date.now();
      const lastReset = getLastResetTime();

      const updated = state.habits.map((h) => {
        if (h.id !== habitId) return h;

        if (h.lastCompletedAt && h.lastCompletedAt > lastReset) {
          return h;
        }

        const newDay = h.currentDay + 1;

        const s1 = h.stageConfig.stage1;
        const s2 = h.stageConfig.stage2;
        const s3 = h.stageConfig.stage3;

        let newStage = 1;
        let totalDays = s1;

        if (newDay > s1) {
          newStage = 2;
          totalDays = s1 + s2;
        }

        if (newDay > s1 + s2) {
          newStage = 3;
          totalDays = s1 + s2 + s3;
        }

        return {
          ...h,
          currentDay: newDay,
          stage: newStage,
          totalDays,
          lastCompletedAt: now,
        };
      });

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
        },
      };
    }),

  pauseSession: () =>
    set((state) => ({
      currentSession: {
        ...state.currentSession,
        active: false,
      },
    })),

  resumeSession: () =>
    set((state) => ({
      currentSession: {
        ...state.currentSession,
        active: true,
      },
    })),

  tick: () =>
    set((state) => {
      if (!state.currentSession?.active) return {};

      return {
        currentSession: {
          ...state.currentSession,
          duration: state.currentSession.duration + 1,
        },
      };
    }),

  // =========================
  // 🛑 STOP SESSION (FIXED)
  // =========================
  stopSession: () =>
    set((state) => {
      const session = state.currentSession;
      if (!session) return {};

      const duration = session.duration;
      const target = session.targetSeconds;

      const isValid =
        duration >= MIN_VALID_SECONDS &&
        (!target || duration / target >= MIN_PROGRESS_RATIO);

      const newSession = {
        ...session,
        endTime: Date.now(),
        duration,
        isValid,
      };

      const updatedSessions = [...state.sessions, newSession];

      let updatedHabits = state.habits;

      // 🔥 TODO EN UNA SOLA MUTACIÓN (SIN BUG)
      if (isValid && session.habitId) {
        const now = Date.now();
        const lastReset = getLastResetTime();

        updatedHabits = state.habits.map((h) => {
          if (h.id !== session.habitId) return h;

          if (h.lastCompletedAt && h.lastCompletedAt > lastReset) {
            return h;
          }

          const newDay = h.currentDay + 1;

          const s1 = h.stageConfig.stage1;
          const s2 = h.stageConfig.stage2;
          const s3 = h.stageConfig.stage3;

          let newStage = 1;
          let totalDays = s1;

          if (newDay > s1) {
            newStage = 2;
            totalDays = s1 + s2;
          }

          if (newDay > s1 + s2) {
            newStage = 3;
            totalDays = s1 + s2 + s3;
          }

          return {
            ...h,
            currentDay: newDay,
            stage: newStage,
            totalDays,
            lastCompletedAt: now,
          };
        });
      }

      const earnedPoints = isValid
        ? Math.floor(duration / 60)
        : 0;

      const newPoints = state.points + earnedPoints;
      const newBalance = state.balance + earnedPoints;

      // 💾 Persistencia consistente
      saveData("sessions", updatedSessions);
      saveData("habits", updatedHabits);
      saveData("points", newPoints);
      saveData("balance", newBalance);

      return {
        sessions: updatedSessions,
        habits: updatedHabits,
        currentSession: null,
        points: newPoints,
        balance: newBalance,
      };
    }),

  // =========================
  // 🏆 LEVEL
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
}));