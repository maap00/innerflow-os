export const getBestFocusHour = (sessions) => {
  if (!sessions.length) return null;

  const buckets = {};

  sessions.forEach((s) => {
    const hour = new Date(s.endTime).getHours();

    if (!buckets[hour]) {
      buckets[hour] = 0;
    }

    buckets[hour] += s.duration;
  });

  const bestHour = Object.entries(buckets).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return Number(bestHour);
};

export const getBestWeekday = (sessions) => {
  if (!sessions.length) return null;

  const buckets = {};

  sessions.forEach((s) => {
    const day = new Date(s.endTime).getDay();

    if (!buckets[day]) {
      buckets[day] = 0;
    }

    buckets[day] += s.duration;
  });

  const best = Object.entries(buckets).sort(
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
    const day = new Date(s.endTime).toDateString();

    if (!grouped[day]) grouped[day] = 0;

    grouped[day] += s.duration;
  });

  const totals = Object.values(grouped);

  const avgSeconds =
    totals.reduce((a, b) => a + b, 0) /
    totals.length;

  return Math.floor(avgSeconds / 60);
};