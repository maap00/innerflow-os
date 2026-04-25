export const getTodayTotal = (sessions) => {
  const today = new Date().toDateString();

  return sessions
    .filter(
      (s) =>
        new Date(s.endTime).toDateString() === today
    )
    .reduce((acc, s) => acc + s.duration, 0);
};

export const getTotalTargetToday = (habits) => {
  return habits.reduce(
    (acc, h) => acc + h.targetSeconds,
    0
  );
};