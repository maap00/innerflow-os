import { getTodayHabitProgress } from "./sessions";

export function getHabitTodayProgress(
  sessions,
  habit
) {
  // Hábito manual
  if (habit.validationType === "manual") {
    return {
      todaySeconds: 0,
      progress:
        habit.totalDays > 0
          ? habit.currentDay /
            habit.totalDays
          : 0,
    };
  }

  // Hábito por tiempo
  const todaySeconds =
    getTodayHabitProgress(
      sessions,
      habit.id
    );

  return {
    todaySeconds,
    progress:
      habit.targetSeconds > 0
        ? Math.min(
            todaySeconds /
              habit.targetSeconds,
            1
          )
        : 0,
  };
}