import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { getLevelData } from "../helpers/level";
import { getStageAchievement } from "../helpers/milestones";
import { getLastResetTime } from "../helpers/timeWindow";

// =========================
// ⚙️ CONFIG & CONSTANTS
// =========================
const MIN_VALID_SECONDS = 60;
const MIN_PROGRESS_RATIO = 0.6;

// =========================
// 💾 STORAGE & UTILITY HELPERS
// =========================
const saveData = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const loadData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const migrateSessions = (sessions = []) => {
  return sessions.map((s) => ({
    id: s.id ?? Date.now().toString(),
    habitId: s.habitId,
    startedAt: s.startedAt ?? s.startTime ?? Date.now(),
    endedAt: s.endedAt ?? s.endTime ?? Date.now(),
    durationSeconds: s.durationSeconds ?? s.duration ?? 0,
    createdAt: s.createdAt ?? Date.now(),
    isValid: s.isValid ?? true,
  }));
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
  achievements: [],

  // =========================
  // 🔄 LOAD & MIGRATION
  // =========================
  loadInitialData: async () => {
    const sessions = await loadData("sessions");
    const habits = (await loadData("habits")) || [];
    const streak = await loadData("streak");
    const points = await loadData("points");
    const balance = await loadData("balance");
    const achievements = await loadData("achievements");

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

    // NUEVO
    category: "mental",

    // Preparado para el futuro
    skills: ["mental"],

    // Mantener datos existentes
    ...h,

    // Si el hábito ya tiene categoría, conservarla
    category:
      h.category ??
      "mental",

    // Si en el futuro ya existe skills, conservarlo.
    // Si no, generarlo a partir de category.
    skills:
      h.skills ??
      [
        h.category ??
          "mental",
      ],
  }));

    set({
      sessions: migrateSessions(sessions || []),
      habits: migratedHabits,
      streak: streak || 0,
      points: points || 0,
      balance: balance || 0,
      achievements: achievements || [],
    });
  },

  // =========================
  // 🎯 HABITS
  // =========================
  addHabit: (name, config) =>
    set((state) => {
      const stageConfig = config.stageConfig;
      const totalDays = stageConfig.stage1;

      const newHabit = {
        id: Date.now().toString(),
        name,
        validationType: config.validationType,
        category:
        config.category,
        skills: [
          config.category,
        ],
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
        milestones: [],
      };

      const updated = [...state.habits, newHabit];
      saveData("habits", updated);

      return {
        habits: updated,
      };
    }),

  // 👉 ONLY FOR MANUAL HABITS
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
        const achievement = getStageAchievement(newDay);
        const currentMilestones = h.milestones || [];

        const updatedMilestones =
          achievement && !currentMilestones.includes(achievement.id)
            ? [...currentMilestones, achievement.id]
            : currentMilestones;

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

        if (achievement) {
          get().unlockAchievement(achievement);
        }

        return {
          ...h,
          currentDay: newDay,
          stage: newStage,
          totalDays,
          milestones: updatedMilestones,
          lastCompletedAt: now,
        };
      });

      saveData("habits", updated);
      return { habits: updated };
    }),

  selectHabit: (id) => set({ selectedHabitId: id }),

  addSession: ({ habitId, startedAt, endedAt, durationSeconds }) =>
    set((state) => {
      const newSession = {
        id: Date.now().toString(),
        habitId,
        startedAt,
        endedAt,
        durationSeconds,
        createdAt: Date.now(),
        isValid: true,
      };

      const updatedSessions = [...state.sessions, newSession];
      saveData("sessions", updatedSessions);

      return {
        sessions: updatedSessions,
      };
    }),

  checkHabitCompletion: (habitId) => {
    const state = get();
    const habit = state.habits.find((h) => h.id === habitId);

    if (!habit || habit.validationType !== "time") {
      return;
    }

    const lastReset = getLastResetTime();
    const completedToday =
      habit.lastCompletedAt && habit.lastCompletedAt > lastReset;

    if (completedToday) {
      return;
    }

    const today = new Date();
    const todaySeconds = state.sessions
      .filter((s) => {
        const date = new Date(s.createdAt);
        return (
          s.habitId === habitId &&
          date.toDateString() === today.toDateString()
        );
      })
      .reduce((sum, s) => sum + s.durationSeconds, 0);

    if (todaySeconds >= habit.targetSeconds) {
      state.completeHabit(habitId);
    }
  },

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

      return {
        currentSession: {
          ...state.currentSession,
          duration: state.currentSession.duration + 1,
        },
      };
    }),

  // =========================
  // 🛑 STOP SESSION
  // =========================
  stopSession: () =>
    set((state) => {
      const session = state.currentSession;
      if (!session) {
        return {};
      }

      const duration = session.duration;
      const target = session.targetSeconds;

      const isValid =
        duration >= MIN_VALID_SECONDS &&
        (!target || duration / target >= MIN_PROGRESS_RATIO);

      const newSession = {
        id: Date.now().toString(),
        habitId: session.habitId,
        startedAt: session.startTime,
        endedAt: Date.now(),
        durationSeconds: duration,
        createdAt: Date.now(),
        isValid,
      };

      const updatedSessions = [...state.sessions, newSession];
      const earnedPoints = isValid ? Math.floor(duration / 60) : 0;
      const newPoints = state.points + earnedPoints;
      const newBalance = state.balance + earnedPoints;

      // Batch storage saves
      Promise.all([
        saveData("sessions", updatedSessions),
        saveData("points", newPoints),
        saveData("balance", newBalance),
      ]).catch((err) => console.error("Failed to save session data:", err));

      return {
        sessions: updatedSessions,
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
    Promise.all([
      saveData("sessions", []),
      saveData("streak", 0),
    ]).catch((err) => console.error("Failed to reset sessions:", err));

    set({
      sessions: [],
      streak: 0,
    });
  },

  // =========================
  // 🏆 ACHIEVEMENTS
  // =========================
  unlockAchievement: (achievement) =>
    set((state) => {
      const alreadyUnlocked = state.achievements.some(
        (a) => a.id === achievement.id
      );

      if (alreadyUnlocked) {
        return {};
      }

      const updatedAchievements = [
        ...state.achievements,
        {
          ...achievement,
          unlockedAt: Date.now(),
        },
      ];

      saveData("achievements", updatedAchievements);

      return {
        achievements: updatedAchievements,
      };
    }),
}));