export const groupSessionsByDay = (sessions) => {
  const grouped = {};

  sessions.forEach((s) => {
    const date = new Date(s.endTime).toDateString();

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(s);
  });

  return grouped;
};

export const sortSessionsDesc = (sessions) => {
  return [...sessions].sort((a, b) => b.endTime - a.endTime);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};