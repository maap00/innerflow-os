export function getNextBadge(
  habit
) {
  if (
    !habit.milestones.includes(
      "bronze"
    )
  ) {
    return {
      badge: "🥉",
      remaining:
        30 -
        habit.currentDay,
    };
  }

  if (
    !habit.milestones.includes(
      "silver"
    )
  ) {
    return {
      badge: "🥈",
      remaining:
        60 -
        habit.currentDay,
    };
  }

  if (
    !habit.milestones.includes(
      "gold"
    )
  ) {
    return {
      badge: "🥇",
      remaining:
        90 -
        habit.currentDay,
    };
  }

  return null;
}