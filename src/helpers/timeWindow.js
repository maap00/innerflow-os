export const getLastResetTime = () => {
  const now = new Date();

  const reset = new Date();
  reset.setHours(6, 0, 0, 0); // 06:00 AM hoy

  // Si todavía no pasó las 6 AM → usar ayer
  if (now < reset) {
    reset.setDate(reset.getDate() - 1);
  }

  return reset.getTime();
};