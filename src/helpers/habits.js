import {
  getSessionDuration,
  getSessionTimestamp,
} from "./sessions";

export const getTodayProgress = (sessions) => {
  const today = new Date().toDateString();

  return sessions
    .filter(
      (s) =>
        s.isValid !== false &&
        new Date(
          getSessionTimestamp(
            s,
            "endedAt"
          )
        ).toDateString() === today
    )
    .reduce(
      (acc, s) =>
        acc +
        getSessionDuration(s),
      0
    );
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
            getSessionTimestamp(
              s,
              "createdAt"
            )
          ).toDateString() ===
            today &&
          s.isValid
      )
      .reduce(
        (sum, s) =>
          sum +
          getSessionDuration(s),
        0
      );




  return Math.min(
    todaySeconds /
      habit.targetSeconds,
    1
  );
};
