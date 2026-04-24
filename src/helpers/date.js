export const isSameDay = (d1, d2) => {
  return new Date(d1).toDateString() === new Date(d2).toDateString();
};

export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return new Date(date).toDateString() === yesterday.toDateString();
};

export const pluralizeDays = (n) => (n === 1 ? "día" : "días");