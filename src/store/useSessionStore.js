import { create } from "zustand";
import { saveData, loadData } from "../helpers/storage";
import { isSameDay, isYesterday } from "../helpers/date";

export const useSessionStore = create((set, get) => ({
  // ------------------------
  // STATE
  // ------------------------
  sessions: [],
  currentSession: null,
  streak: 0,
  habits: [],
  selectedHabitId: null,

  // ------------------------
  // SESSION LOGIC
  // ------------------------

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

  stopSession: () =>
    set((state) => {
      if (!state.currentSession) return {};

      const endTime = Date.now();

      const duration = Math.floor(
        (endTime - state.currentSession.startTime) / 1000
      );

      const newSession = {
        ...state.currentSession,
        duration,
        endTime,
        habitId: state.currentSession.habitId,
      };

      const updatedSessions = [...state.sessions, newSession];

      const today = new Date().toDateString();

      const updatedHabits = state.habits.map((h) => {
        // solo afecta al hábito de la sesión
        if (h.id !== newSession.habitId) return h;

        // calcular progreso del día para este hábito
        const todayProgress = updatedSessions
            .filter(
            (s) =>
                s.habitId === h.id &&
                new Date(s.endTime).toDateString() === today
            )
            .reduce((acc, s) => acc + s.duration, 0);

        const completed = todayProgress >= h.targetSeconds;

        if (!completed) return h;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        let newStreak = h.streak;

        if (!h.lastCompletedDate) {
            newStreak = 1;
        } else if (
            new Date(h.lastCompletedDate).toDateString() === today
        ) {
            // ya contó hoy
            newStreak = h.streak;
        } else if (
            new Date(h.lastCompletedDate).toDateString() ===
            yesterday.toDateString()
        ) {
            newStreak = h.streak + 1;
        } else {
            newStreak = 1;
        }

        return {
            ...h,
            streak: newStreak,
            lastCompletedDate: today,
        };
      });

      // ------------------------
      // STREAK LOGIC
      // ------------------------
      let newStreak = state.streak;

      const lastSession = state.sessions[state.sessions.length - 1];

      if (!lastSession) {
        newStreak = 1;
      } else if (isSameDay(lastSession.endTime, endTime)) {
        newStreak = state.streak;
      } else if (isYesterday(lastSession.endTime)) {
        newStreak = state.streak + 1;
      } else {
        newStreak = 1;
      }

      // ------------------------
      // PERSISTENCIA
      // ------------------------
      saveData("sessions", updatedSessions);
      saveData("streak", newStreak);
      saveData("habits", updatedHabits);

      return {
        sessions: updatedSessions,
        currentSession: null,
        streak: newStreak,
        habits: updatedHabits,

      };
    }),

  tick: () =>
  set((state) => {
    if (!state.currentSession?.active) return {};

    const newDuration = state.currentSession.duration + 1;

    const target = state.currentSession.targetSeconds;

    const isCompleted =
      target && newDuration >= target;

    return {
      currentSession: {
        ...state.currentSession,
        duration: newDuration,
        completed: isCompleted,
      },
    };
  }),

  // ------------------------
  // LOAD DATA
  // ------------------------

  loadSessions: async () => {
    const data = await loadData("sessions");
    if (data) set({ sessions: data });
  },

  loadStreak: async () => {
    const data = await loadData("streak");
    if (data) set({ streak: data });
  },

  // ------------------------
  // HABITS
  // ------------------------

  addHabit: (name, targetMinutes) =>
    set((state) => {
      const newHabit = {
        id: Date.now(),
        name,
        targetSeconds: targetMinutes * 60,
        createdAt: Date.now(),
        streak: 0,
        lastCompletedDate: null,
      };

      const updatedHabits = [...state.habits, newHabit];

      saveData("habits", updatedHabits);

      return {
        habits: updatedHabits,
      };
    }),

  loadHabits: async () => {
    const data = await loadData("habits");
    if (data) set({ habits: data });
  },

  removeHabit: (id) =>
  set((state) => {
    const updatedHabits = state.habits.filter((h) => h.id !== id);

    saveData("habits", updatedHabits);

    return {
      habits: updatedHabits,
    };
     
  }),

  selectHabit: (habitId) => set({ selectedHabitId: habitId }),


}));