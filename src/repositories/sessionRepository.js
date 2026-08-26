import { supabase } from "../lib/supabase";

// =========================
// MAPPER
// =========================

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const toTimestamp = (
  value,
  fallback = Date.now()
) => {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (value) {
    const timestamp =
      new Date(value).getTime();

    if (
      Number.isFinite(timestamp)
    ) {
      return timestamp;
    }
  }

  return fallback;
};

const toISOString = (value) =>
  new Date(
    toTimestamp(value)
  ).toISOString();

const createLocalSessionId = (
  session
) =>
  [
    "local",
    session.habitId ??
      session.habit_id ??
      "unknown",
    session.startedAt ??
      session.startTime ??
      session.started_at ??
      "start",
    session.endedAt ??
      session.endTime ??
      session.ended_at ??
      "end",
  ].join("-");

export function normalizeSession(
  session = {}
) {
  const startedAt = toTimestamp(
    session.startedAt ??
      session.startTime ??
      session.started_at
  );

  const endedAt = toTimestamp(
    session.endedAt ??
      session.endTime ??
      session.ended_at,
    startedAt
  );

  const createdAt = toTimestamp(
    session.createdAt ??
      session.created_at,
    endedAt
  );

  return {
    id:
      session.id ||
      createLocalSessionId({
        ...session,
        startedAt,
        endedAt,
      }),

    habitId:
      session.habitId ??
      session.habit_id,

    startedAt,

    endedAt,

    durationSeconds:
      session.durationSeconds ??
      session.duration ??
      session.duration_seconds ??
      0,

    createdAt,

    isValid:
      session.isValid ??
      session.is_valid ??
      true,
  };
}

function mapSessionFromDB(session) {
  return normalizeSession(
    session
  );
}

function mapSessionToDB(
  session,
  userId
) {
  return {
    ...(UUID_REGEX.test(
      session.id || ""
    ) && {
      id: session.id,
    }),

    user_id: userId,

    habit_id: session.habitId,

    started_at: toISOString(
      session.startedAt
    ),

    ended_at: toISOString(
      session.endedAt
    ),

    duration_seconds:
      session.durationSeconds,

    is_valid:
      session.isValid,

    created_at: toISOString(
      session.createdAt ??
        session.endedAt
    ),
  };
}

// =========================
// GET SESSIONS
// =========================

export async function getSessions() {
  const {
    data: {
      user,
    },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "User not authenticated"
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {
    throw error;
  }

  return (
    data?.map(
      mapSessionFromDB
    ) || []
  );
}

// =========================
// CREATE SESSION
// =========================

export async function createSession(
  session
) {
  const {
    data: {
      user,
    },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "User not authenticated"
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("sessions")
    .insert(
      mapSessionToDB(
        normalizeSession(session),
        user.id
      )
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapSessionFromDB(
    data
  );
}

// =========================
// UPDATE SESSION
// =========================

export async function updateSession(
  sessionId,
  updates
) {
  const {
    data,
    error,
  } = await supabase
    .from("sessions")
    .update({
      ...(updates.habitId !==
      undefined && {
        habit_id:
          updates.habitId,
      }),

      ...(updates.startedAt !==
      undefined && {
        started_at:
          toISOString(
            updates.startedAt
          ),
      }),

      ...(updates.endedAt !==
      undefined && {
        ended_at:
          toISOString(
            updates.endedAt
          ),
      }),

      ...(updates.durationSeconds !==
      undefined && {
        duration_seconds:
          updates.durationSeconds,
      }),

      ...(updates.isValid !==
      undefined && {
        is_valid:
          updates.isValid,
      }),
    })
    .eq("id", sessionId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapSessionFromDB(
    data
  );
}

// =========================
// DELETE SESSION
// =========================

export async function deleteSession(
  sessionId
) {
  const {
    error,
  } = await supabase
    .from("sessions")
    .delete()
    .eq(
      "id",
      sessionId
    );

  if (error) {
    throw error;
  }

  return {
    success: true,
  };
}
