import {
  getSessionDuration,
  getSessionTimestamp,
} from "./sessions";

export const getLast7DaysFocus = (sessions) => {
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);

    const label = `${day.getDate()}`;

    const totalSeconds = sessions
      .filter((s) => {
        const d =
          new Date(
            getSessionTimestamp(
              s,
              "endedAt"
            )
          );

        return (
          s.isValid !== false &&
          d.toDateString() ===
            day.toDateString()
        );
      })
      .reduce(
        (acc, s) =>
          acc +
          getSessionDuration(s),
        0
      );

    result.push({
      label,
      minutes: Number((totalSeconds / 60).toFixed(1)),
    });
  }

  return result;
};
