export const HABIT_MILESTONES = {

    bronze: {

        id: "bronze",

        icon: "🥉",

        days: 30,

    },

    silver: {

        id: "silver",

        icon: "🥈",

        days: 60,

    },

    gold: {

        id: "gold",

        icon: "🥇",

        days: 90,

    }

};

export function getStageAchievement(
  currentDay
) {
  switch (currentDay) {
    case 30:
      return HABIT_MILESTONES.bronze;

    case 60:
      return HABIT_MILESTONES.silver;

    case 90:
      return HABIT_MILESTONES.gold;

    default:
      return null;
  }
}