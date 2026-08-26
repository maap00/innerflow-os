import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { getLevelData } from "../helpers/level";
import { getStageAchievement } from "../helpers/milestones";
import { getLastResetTime } from "../helpers/timeWindow";
import { getHabits, 
         createHabit,  
         updateHabit as updateHabitCloud,
         deleteHabit as deleteHabitCloud,
         updateHabitProgress,

} from "../repositories/habitRepository";

import {
  createSession,
  getSessions,
  normalizeSession,
} from "../repositories/sessionRepository";

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
  return sessions
    .map(normalizeSession)
    .filter(
      (session) =>
        session.id &&
        session.habitId
    );
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
    const localSessions =
      (await getSessions()) || [];

  const localHabits =
    (await loadData("habits")) || [];

  const streak =
    await loadData("streak");

  const points =
    await loadData("points");

  const balance =
    await loadData("balance");

  const achievements =
    await loadData(
      "achievements"
    );

  // =========================
  // CLOUD HABITS
  // =========================

  let habits = localHabits;
  let sessions =
    migrateSessions(
      localSessions
    );

  try {
    const cloudHabits =
      await getHabits();

     

    habits = cloudHabits;

    // Cache local
    await saveData(
      "habits",
      cloudHabits
    );
  } catch (error) {
    console.log(
      "Cloud habits unavailable. Using local cache:",
      error?.message
    );
  }

  try {
    const cloudSessions =
      await getSessions();

    sessions =
      migrateSessions(
        cloudSessions
      );

    await saveData(
      "sessions",
      sessions
    );
  } catch (error) {
    console.log(
      "Cloud sessions unavailable. Using local cache:",
      error?.message
    );
  }

  // =========================
  // MIGRATION
  // =========================

  const migratedHabits =
    habits.map((h) => ({
      validationType: "time",

      totalDays: 30,

      stage: 1,

      currentDay: 0,

      stageConfig: {
        stage1: 30,
        stage2: 30,
        stage3: 30,
      },

      category: null,

      skills: [],

      milestones: [],

      lastCompletedAt: null,

      streak: 0,

      ...h,
    }));

  set({
    sessions,

    habits:
      migratedHabits,

    streak:
      streak || 0,

    points:
      points || 0,

    balance:
      balance || 0,

    achievements:
      achievements || [],
    });
  },

  // =========================
  // 🎯 HABITS
  // =========================
  addHabit: async (name, config) => {
  const stageConfig =
    config.stageConfig;

  const totalDays =
    stageConfig.stage1;

  // =========================
  // BUILD HABIT
  // =========================

  const newHabit = {
    name,

    validationType:
      config.validationType,

    category:
      config.category,

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

  try {
    // =========================
    // CLOUD CREATE
    // =========================

    const createdHabit =
      await createHabit(
        newHabit
      );

    // Supabase devuelve el hábito
    // con su UUID real.

    const updatedHabits = [
      ...get().habits,
      createdHabit,
    ];

    // =========================
    // LOCAL CACHE
    // =========================

    await saveData(
      "habits",
      updatedHabits
    );

    // =========================
    // ZUSTAND
    // =========================

    set({
      habits:
        updatedHabits,
    });

    return {
      success: true,
      habit:
        createdHabit,
    };
  } catch (error) {
    console.log(
      "Create habit error:",
      error
    );

    return {
      success: false,
      error,
    };
  }
},

 updateHabit: async (
  habitId,
  updates
  ) => {
    const currentHabit =
      get().habits.find(
        (habit) =>
          habit.id === habitId
      );

    if (!currentHabit) {
      return {
        success: false,
        error: new Error(
          "Habit not found"
        ),
      };
    }

    // =========================
    // BUILD UPDATED HABIT
    // =========================

    const updatedHabit = {
      ...currentHabit,

      ...updates,

      targetSeconds:
        updates.validationType === "time"
          ? updates.targetMinutes * 60
          : null,

      stageConfig: {
        stage1:
          updates.stage1,

        stage2:
          updates.stage2,

        stage3:
          updates.stage3,
      },
    };

    try {
      // =========================
      // CLOUD
      // =========================

      const savedHabit =
        await updateHabitCloud(
          habitId,
          updatedHabit
        );

      // =========================
      // ZUSTAND
      // =========================

      const updatedHabits =
        get().habits.map(
          (habit) =>
            habit.id === habitId
              ? savedHabit
              : habit
        );

      set({
        habits:
          updatedHabits,
      });

      // =========================
      // LOCAL CACHE
      // =========================

      await saveData(
        "habits",
        updatedHabits
      );

      return {
        success: true,
        habit: savedHabit,
      };
    } catch (error) {
      console.log(
        "Update habit error:",
        error
      );

      return {
        success: false,
        error,
      };
    }
  },

 deleteHabit: async (habitId) => {
  try {
    // =========================
    // CLOUD
    // =========================

    await deleteHabitCloud(
      habitId
    );

    // =========================
    // ZUSTAND
    // =========================

    const updatedHabits =
      get().habits.filter(
        (habit) =>
          habit.id !== habitId
      );

    set({
      habits:
        updatedHabits,
    });

    // =========================
    // LOCAL CACHE
    // =========================

    await saveData(
      "habits",
      updatedHabits
    );

    return {
      success: true,
    };
  } catch (error) {
    console.log(
      "Delete habit error:",
      error
    );

    return {
      success: false,
      error,
    };
  }
},

  // 👉 ONLY FOR MANUAL HABITS
  completeHabit: async (habitId) => {
    const state = get();

    const now = Date.now();

    const lastReset =
      getLastResetTime();

    const updated =
      state.habits.map((h) => {
        if (h.id !== habitId) {
          return h;
        }

        if (
          h.lastCompletedAt &&
          h.lastCompletedAt > lastReset
        ) {
          return h;
        }

        const newDay =
          h.currentDay + 1;

        const achievement =
          getStageAchievement(
            newDay
          );

        const currentMilestones =
          h.milestones || [];

        const updatedMilestones =
          achievement &&
          !currentMilestones.includes(
            achievement.id
          )
            ? [
                ...currentMilestones,
                achievement.id,
              ]
            : currentMilestones;

        const s1 =
          h.stageConfig.stage1;

        const s2 =
          h.stageConfig.stage2;

        const s3 =
          h.stageConfig.stage3;

        let newStage = 1;

        let totalDays = s1;

        if (newDay > s1) {
          newStage = 2;

          totalDays =
            s1 + s2;
        }

        if (newDay > s1 + s2) {
          newStage = 3;

          totalDays =
            s1 + s2 + s3;
        }

        if (achievement) {
          get().unlockAchievement(
            achievement
          );
        }

        return {
          ...h,

          currentDay: newDay,

          stage: newStage,

          totalDays,

          milestones:
            updatedMilestones,

          lastCompletedAt:
            now,
        };
      });

    const completedHabit =
      updated.find(
        (h) =>
          h.id === habitId
      );

    try {
      if (completedHabit) {
        await updateHabitProgress(
          habitId,
          completedHabit
        );
      }
    } catch (error) {
      console.log(
        "Progress sync error:",
        error
      );
    }

    await saveData(
      "habits",
      updated
    );

    set({
      habits: updated,
    });

    return {
      success: true,
    };
  },

  selectHabit: (id) => set({ selectedHabitId: id }),

 addSession: async ({
  habitId,
  startedAt,
  endedAt,
  durationSeconds,
  isValid = true,
    }) => {
      const newSession = {
        habitId,
        startedAt,
        endedAt,
        durationSeconds,
        createdAt:
          endedAt ?? Date.now(),
        isValid,
      };

      try {
        // =========================
        // SUPABASE
        // =========================

        const cloudSession =
          await createSession(
            newSession
          );

        // =========================
        // LOCAL STATE
        // =========================

        const state = get();

        const updatedSessions = [
          ...state.sessions,
          cloudSession,
        ];

        await saveData(
          "sessions",
          updatedSessions
        );

        set({
          sessions:
            updatedSessions,
        });

        return {
          success: true,
          session:
            cloudSession,
        };
      } catch (error) {
        console.log(
          "Create session error:",
          error
        );

        const fallbackSession =
          normalizeSession(
            newSession
          );

        const updatedSessions = [
          ...get().sessions,
          fallbackSession,
        ];

        await saveData(
          "sessions",
          updatedSessions
        );

        set({
          sessions:
            updatedSessions,
        });

        return {
          success: false,
          error,
          session:
            fallbackSession,
        };
      }
    },

  checkHabitCompletion: async (habitId) => {
    const state = get();

    const habit =
      state.habits.find(
        (h) => h.id === habitId
      );

    if (
      !habit ||
      habit.validationType !== "time"
    ) {
      return;
    }

    const lastReset =
      getLastResetTime();

    const completedToday =
      habit.lastCompletedAt &&
      habit.lastCompletedAt >
        lastReset;

    if (completedToday) {
      return;
    }

    const today =
      new Date();

    const todaySeconds =
      state.sessions
        .filter((session) => {
          const date =
            new Date(
              session.createdAt
            );

          return (
            session.habitId ===
              habitId &&
            session.isValid !==
              false &&
            date.toDateString() ===
              today.toDateString()
          );
        })
        .reduce(
          (sum, session) =>
            sum +
            session.durationSeconds,
          0
        );

    if (
      todaySeconds >=
      habit.targetSeconds
    ) {
      await state.completeHabit(
        habitId
      );
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
  stopSession: async () => {
    const state = get();
    const session =
      state.currentSession;

    if (!session) {
      return {
        success: false,
        error: new Error(
          "No active session"
        ),
      };
    }

    const duration =
      session.duration;

    const target =
      session.targetSeconds;

    const isValid =
      duration >= MIN_VALID_SECONDS &&
      (!target ||
        duration / target >=
          MIN_PROGRESS_RATIO);

    const endedAt = Date.now();

    const result =
      await get().addSession({
        habitId:
          session.habitId,
        startedAt:
          session.startTime,
        endedAt,
        durationSeconds:
          duration,
        isValid,
      });

    const earnedPoints =
      isValid
        ? Math.floor(
            duration / 60
          )
        : 0;

    const newPoints =
      state.points +
      earnedPoints;

    const newBalance =
      state.balance +
      earnedPoints;

    await Promise.all([
      saveData(
        "points",
        newPoints
      ),
      saveData(
        "balance",
        newBalance
      ),
    ]).catch((err) =>
      console.error(
        "Failed to save session data:",
        err
      )
    );

    set({
      currentSession: null,
      points: newPoints,
      balance: newBalance,
    });

    if (isValid) {
      await get()
        .checkHabitCompletion(
          session.habitId
        );
    }

    return result;
  },

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
