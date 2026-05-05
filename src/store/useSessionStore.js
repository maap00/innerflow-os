import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLevelData } from "../helpers/level";

const MIN_VALID_SECONDS = 60;
const MIN_PROGRESS_RATIO = 0.6;

const saveData = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const loadData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const useSessionStore = create((set, get) => ({
  sessions: [],
  currentSession: null,
  habits: [],
  selectedHabitId: null,
  streak: 0,
  points: 0,
  balance: 0,

  // =========================
  // LOAD
  // =========================
  loadInitialData: async () => {
    const sessions = await loadData("sessions");
    const habits = await loadData("habits");
    const streak = await loadData("streak");
    const points = await loadData("points");
    const balance = await loadData("balance");

    set({
      sessions: sessions || [],
      habits: habits || [],
      streak: streak || 0,
      points: points || 0,
      balance: balance || 0,
    });
  },

  // =========================
  // HABITS (UPDATED)
  // =========================
  addHabit: (name, targetMinutes = 0, type = "time") =>
    set((state) => {
      const newHabit = {
        id: Date.now().toString(),
        name,
        validationType: type,
        targetSeconds: type === "time" ? targetMinutes * 60 : null,

        currentDay: 0,
        stage: 1,

        stageConfig: {
          stage1: 30,
          stage2: 30,
          stage3: 30,
        },

        lastCompletedAt: null,
        streak: 0,
      };

      const updated = [...state.habits, newHabit];
      saveData("habits", updated);

      return { habits: updated };
    }),

  completeHabit: (habitId) =>
    set((state) => {
      const now = Date.now();

      const updated = state.habits.map((h) => {
        if (h.id !== habitId) return h;

        if (
          h.lastCompletedAt &&
          now - h.lastCompletedAt < 86400000
        ) {
          return h;
        }

        const newDay = h.currentDay + 1;

        let newStage = h.stage;

        if (newDay > h.stageConfig.stage1) newStage = 2;
        if (
          newDay >
          h.stageConfig.stage1 + h.stageConfig.stage2
        )
          newStage = 3;

        return {
          ...h,
          currentDay: newDay,
          stage: newStage,
          lastCompletedAt: now,
        };
      });

      saveData("habits", updated);

      return { habits: updated };
    }),

  selectHabit: (id) => set({ selectedHabitId: id }),

  // =========================
  // SESSION CONTROL
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

      // 🎯 completar hábito si aplica
      if (isValid && session.habitId) {
        const { completeHabit } = get();
        completeHabit(session.habitId);
      }

      const earnedPoints = isValid
        ? Math.floor(duration / 60)
        : 0;

      const newPoints = state.points + earnedPoints;
      const newBalance = state.balance + earnedPoints;

      saveData("sessions", updatedSessions);
      saveData("points", newPoints);
      saveData("balance", newBalance);

      return {
        sessions: updatedSessions,
        currentSession: null,
        points: newPoints,
        balance: newBalance,
      };
    }),

  getLevel: () => {
    const { points } = get();
    return getLevelData(points);
  },
}));