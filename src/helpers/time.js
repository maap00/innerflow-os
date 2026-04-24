export const formatTime = (seconds = 0) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n) => (n < 10 ? "0" : "") + n;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};