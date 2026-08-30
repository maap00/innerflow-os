import {
  getAchievements,
  unlockAchievement,
} from "./repositories/achievementRepository";

export async function testAchievements() {
  try {
    const current =
      await getAchievements();

    console.log(
      "SUPABASE ACHIEVEMENTS:",
      current
    );

    const testAchievement = {
      id: "bronze",
      unlockedAt:
        Date.now(),
    };

    const unlocked =
      await unlockAchievement(
        testAchievement
      );

    console.log(
      "UNLOCKED ACHIEVEMENT:",
      unlocked
    );

    const updated =
      await getAchievements();

    console.log(
      "ACHIEVEMENTS AFTER UNLOCK:",
      updated
    );
  } catch (error) {
    console.error(
      "ACHIEVEMENT REPOSITORY ERROR:",
      error
    );
  }
}