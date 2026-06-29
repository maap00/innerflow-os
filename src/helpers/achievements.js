export const ACHIEVEMENTS = {
  BRONZE: {
    id: "bronze-discipline",
    title: "Bronze Discipline",
    description: "Complete 30 consecutive days.",
    icon: "🥉",
  },

  SILVER: {
    id: "silver-discipline",
    title: "Silver Discipline",
    description: "Complete 60 consecutive days.",
    icon: "🥈",
  },

  GOLD: {
    id: "gold-discipline",
    title: "Gold Discipline",
    description: "Complete 90 consecutive days.",
    icon: "🥇",
  },
};

export function getStageAchievement(
  currentDay
) {
  if (currentDay === 30)
    return ACHIEVEMENTS.BRONZE;

  if (currentDay === 60)
    return ACHIEVEMENTS.SILVER;

  if (currentDay === 90)
    return ACHIEVEMENTS.GOLD;

  return null;
}