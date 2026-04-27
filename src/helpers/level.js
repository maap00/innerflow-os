export const getLevelData = (points) => {
  let level = 1;
  let pointsForNext = 100;

  while (points >= pointsForNext) {
    level++;
    pointsForNext += level * 100;
  }

  const prevThreshold = pointsForNext - level * 100;

  const progress =
    (points - prevThreshold) /
    (pointsForNext - prevThreshold);

  return {
    level,
    currentPoints: points,
    nextLevelPoints: pointsForNext,
    progress, // 0 → 1
  };
};