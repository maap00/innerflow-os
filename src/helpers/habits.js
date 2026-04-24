export const getTodayProgress = (sessions) => {
  const today = new Date().toDateString();

  return sessions
    .filter(
      (s) => new Date(s.endTime).toDateString() === today
    )
    .reduce((acc, s) => acc + s.duration, 0);
};

export const getHabitProgress = (sessions, habitId) => {
  const today = new Date().toDateString();

  return sessions
    .filter(
      (s) =>
        s.habitId === habitId &&
        new Date(s.endTime).toDateString() === today
    )
    .reduce((acc, s) => acc + s.duration, 0);
};