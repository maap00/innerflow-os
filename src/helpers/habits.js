export const getTodayProgress = (sessions) => {
  const today = new Date().toDateString();

  return sessions
    .filter(
      (s) => new Date(s.endTime).toDateString() === today
    )
    .reduce((acc, s) => acc + s.duration, 0);
};

export const getHabitProgress = (
  sessions,
  habit
) => {
  // Hábito manual
  if (
    habit.validationType ===
    "manual"
  ) {
    return (
      habit.currentDay /
      habit.totalDays
    );
  }

  // Hábito por tiempo
  const today =
    new Date().toDateString();

  const todaySeconds =
    sessions
      .filter(
        (s) =>
          s.habitId ===
            habit.id &&
          new Date(
            s.createdAt
          ).toDateString() ===
            today &&
          s.isValid
      )
      .reduce(
        (sum, s) =>
          sum +
          s.durationSeconds,
        0
      );




  return Math.min(
    todaySeconds /
      habit.targetSeconds,
    1
  );
};