import {
  getSessionDuration,
  getSessionTimestamp,
} from "./sessions";

export const getTodayTotal = (sessions) => {
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

export const getTotalTargetToday = (habits) => {
  return habits.reduce(
    (acc, h) =>
      acc +
      (h.targetSeconds || 0),
    0
  );
};
