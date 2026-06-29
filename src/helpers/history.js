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

export function groupSessions(
  sessions
) {
  const groups = {};

  sessions.forEach(
    (session) => {
      const date =
        new Date(
          session.createdAt
        );

      const key =
        date.toDateString();

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(
        session
      );
    }
  );

  return groups;
}

export function groupSessionsByDate(
  sessions
) {
  const today =
    new Date();

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const groups = {
    today: [],
    yesterday: [],
    older: [],
  };

  sessions.forEach(
    (session) => {
      const date =
        new Date(
          session.createdAt
        );

      if (
        date.toDateString() ===
        today.toDateString()
      ) {
        groups.today.push(
          session
        );

        return;
      }

      if (
        date.toDateString() ===
        yesterday.toDateString()
      ) {
        groups.yesterday.push(
          session
        );

        return;
      }

      groups.older.push(
        session
      );
    }
  );

  return groups;
}