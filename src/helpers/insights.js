import {
  getSessionDuration,
  getSessionTimestamp,
} from "./sessions";

export const getBestFocusHour = (sessions) => {
  if (!sessions.length) return null;

  const buckets = {};

  sessions.forEach((s) => {
    if (s.isValid === false) {
      return;
    }

    const hour =
      new Date(
        getSessionTimestamp(
          s,
          "endedAt"
        )
      ).getHours();

    if (!buckets[hour]) {
      buckets[hour] = 0;
    }

    buckets[hour] +=
      getSessionDuration(s);
  });

  const entries =
    Object.entries(buckets);

  if (!entries.length) {
    return null;
  }

  const bestHour = entries.sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return Number(bestHour);
};

export const getBestWeekday = (sessions) => {
  if (!sessions.length) return null;

  const buckets = {};

  sessions.forEach((s) => {
    if (s.isValid === false) {
      return;
    }

    const day =
      new Date(
        getSessionTimestamp(
          s,
          "endedAt"
        )
      ).getDay();

    if (!buckets[day]) {
      buckets[day] = 0;
    }

    buckets[day] +=
      getSessionDuration(s);
  });

  const entries =
    Object.entries(buckets);

  if (!entries.length) {
    return null;
  }

  const best = entries.sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  const names = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  return names[best];
};

export const getAverageDailyMinutes = (sessions) => {
  if (!sessions.length) return 0;

  const grouped = {};

  sessions.forEach((s) => {
    if (s.isValid === false) {
      return;
    }

    const day =
      new Date(
        getSessionTimestamp(
          s,
          "endedAt"
        )
      ).toDateString();

    if (!grouped[day]) grouped[day] = 0;

    grouped[day] +=
      getSessionDuration(s);
  });

  const totals = Object.values(grouped);

  if (!totals.length) {
    return 0;
  }

  const avgSeconds =
    totals.reduce((a, b) => a + b, 0) /
    totals.length;

  return Math.floor(avgSeconds / 60);
};
