export function getSessionTimestamp(
  session,
  field = "createdAt"
) {
  const value =
    session?.[field] ??
    (field === "createdAt"
      ? session?.created_at
        ?? session?.endedAt
        ?? session?.endTime
        ?? session?.ended_at
      : null) ??
    (field === "endedAt"
      ? session?.endTime ??
        session?.ended_at
      : null) ??
    (field === "startedAt"
      ? session?.startTime ??
        session?.started_at
      : null);

  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  const timestamp =
    new Date(value).getTime();

  return Number.isFinite(timestamp)
    ? timestamp
    : Date.now();
}

export function getSessionDuration(
  session
) {
  return (
    session?.durationSeconds ??
    session?.duration ??
    session?.duration_seconds ??
    0
  );
}

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
          getSessionTimestamp(
            s,
            "createdAt"
          )
        );

      return (
        s.habitId ===
          habitId &&
        s.isValid !== false &&
        date.toDateString() ===
          today.toDateString()
      );
    })
    .reduce(
      (sum, s) =>
        sum +
        getSessionDuration(s),
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
        habitId &&
        s.isValid !== false
    )
    .reduce(
      (sum, s) =>
        sum +
        getSessionDuration(s),
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
        getSessionTimestamp(
          b,
          "createdAt"
        ) -
        getSessionTimestamp(
          a,
          "createdAt"
        )
    );
}
