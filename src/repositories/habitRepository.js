import { supabase } from "../lib/supabase";

// =========================
// MAPPERS
// =========================

const mapHabitFromDB = (habit) => ({
  id: habit.id,

  name: habit.name,

  validationType:
    habit.validation_type,

  category:
    habit.category,

  targetSeconds:
    habit.target_seconds,

  currentDay:
    habit.current_day,

  stage:
    habit.stage,

  totalDays:
    habit.total_days,

  stageConfig:
    habit.stage_config,

  streak:
    habit.streak,

  milestones:
    habit.milestones || [],

  lastCompletedAt:
    habit.last_completed_at
      ? new Date(
          habit.last_completed_at
        ).getTime()
      : null,
});

const mapHabitToDB = (habit) => ({
  name: habit.name,

  validation_type:
    habit.validationType,

  category:
    habit.category,

  target_seconds:
    habit.targetSeconds,

  current_day:
    habit.currentDay,

  stage:
    habit.stage,

  total_days:
    habit.totalDays,

  stage_config:
    habit.stageConfig,

  streak:
    habit.streak,

  milestones:
    habit.milestones || [],

  last_completed_at:
    habit.lastCompletedAt
      ? new Date(
          habit.lastCompletedAt
        ).toISOString()
      : null,
});

// =========================
// GET HABITS
// =========================

export async function getHabits() {
  const {
    data,
    error,
  } = await supabase
    .from("habits")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data || []).map(
    mapHabitFromDB
  );
}

// =========================
// CREATE HABIT
// =========================

export async function createHabit(
  habit
) {
  const {
    data: {
      user,
    },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "User not authenticated"
    );
  }

  const payload = {
    ...mapHabitToDB(habit),

    user_id: user.id,
  };

  const {
    data,
    error,
  } = await supabase
    .from("habits")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapHabitFromDB(
    data
  );
}

// =========================
// UPDATE HABIT
// =========================

export async function updateHabit(
  habitId,
  habit
) {
  const payload =
    mapHabitToDB(habit);

  const {
    data,
    error,
  } = await supabase
    .from("habits")
    .update(payload)
    .eq("id", habitId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapHabitFromDB(
    data
  );
}

// =========================
// DELETE HABIT
// =========================

export async function deleteHabit(
  habitId
) {
  const {
    error,
  } = await supabase
    .from("habits")
    .delete()
    .eq("id", habitId);

  if (error) {
    throw error;
  }

  return true;
}