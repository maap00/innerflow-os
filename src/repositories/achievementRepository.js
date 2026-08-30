import { supabase } from "../lib/supabase";

// =========================
// GET ACHIEVEMENTS
// =========================

export async function getAchievements() {
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "User not authenticated"
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", user.id)
    .order(
      "unlocked_at",
      {
        ascending: true,
      }
    );

  if (error) {
    throw error;
  }

  return (
    data?.map((achievement) => ({
      id: achievement.achievement_id,

      unlockedAt:
        achievement.unlocked_at,

      createdAt:
        achievement.created_at,
    })) || []
  );
}

// =========================
// UNLOCK ACHIEVEMENT
// =========================

export async function unlockAchievement(
  achievement
) {
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "User not authenticated"
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("achievements")
    .upsert(
      {
        user_id:
          user.id,

        achievement_id:
          achievement.id,

        unlocked_at:
          achievement.unlockedAt
            ? new Date(
                achievement.unlockedAt
              ).toISOString()
            : new Date().toISOString(),
      },
      {
        onConflict:
          "user_id,achievement_id",
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id:
      data.achievement_id,

    unlockedAt:
      data.unlocked_at,

    createdAt:
      data.created_at,
  };
}

// =========================
// DELETE ACHIEVEMENT
// =========================

export async function deleteAchievement(
  achievementId
) {
  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "User not authenticated"
    );
  }

  const {
    error,
  } = await supabase
    .from("achievements")
    .delete()
    .eq(
      "user_id",
      user.id
    )
    .eq(
      "achievement_id",
      achievementId
    );

  if (error) {
    throw error;
  }

  return {
    success: true,
  };
}