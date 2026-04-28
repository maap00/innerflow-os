export const getLast7DaysFocus = (sessions) => {
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);

    const label = `${day.getDate()}`;

    const totalSeconds = sessions
      .filter((s) => {
        const d = new Date(s.endTime);

        return d.toDateString() === day.toDateString();
      })
      .reduce((acc, s) => acc + s.duration, 0);

    result.push({
      label,
      minutes: Number((totalSeconds / 60).toFixed(1)),
    });
  }

  return result;
};