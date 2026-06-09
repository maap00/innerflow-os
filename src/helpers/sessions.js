export function getTodayHabitProgress(
  sessions,
  habitId
) {
  const today =
    new Date();

  return sessions
    .filter((s) => {
      const date =
        new Date(
          s.createdAt
        );

      return (
        s.habitId ===
          habitId &&
        date.toDateString() ===
          today.toDateString()
      );
    })
    .reduce(
      (sum, s) =>
        sum +
        s.durationSeconds,
      0
    );
}

export function getHabitLifetimeTotal(
  sessions,
  habitId
) {
  return sessions
    .filter(
      (s) =>
        s.habitId ===
        habitId
    )
    .reduce(
      (sum, s) =>
        sum +
        s.durationSeconds,
      0
    );
}

export function getHabitHistory(
  sessions,
  habitId
) {
  return sessions
    .filter(
      (s) =>
        s.habitId ===
        habitId
    )
    .sort(
      (a, b) =>
        b.createdAt -
        a.createdAt
    );
}