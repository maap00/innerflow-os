import {
  View,
  Text,
  Pressable,
} from "react-native";

import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import React, {
  useCallback,
} from "react";

import ScreenLayout from "../components/layout/ScreenLayout";

import Card from "../components/ui/Card";

import { colors } from "../theme/colors";

import {
  useSessionStore,
} from "../store/useSessionStore";

import {
  formatTime,
} from "../helpers/time";

import {
  getTodayHabitProgress,
  getHabitLifetimeTotal,
  getHabitHistory,
} from "../helpers/sessions";

export default function HabitSessionScreen() {
  const navigation =
    useNavigation();

  const {
    habits,
    sessions,
    selectedHabitId,
    checkHabitCompletion,
  } = useSessionStore();

  const habit =
    habits.find(
      (h) =>
        h.id ===
        selectedHabitId
    );

  // ===================================
  // AUTO COMPLETE ON RETURN
  // ===================================

  useFocusEffect(
    useCallback(() => {
      if (habit?.id) {
        checkHabitCompletion(
          habit.id
        );
      }
    }, [habit?.id])
  );

  if (!habit) {
    return null;
  }

  const todayProgress =
    getTodayHabitProgress(
      sessions,
      habit.id
    );

  const totalFocused =
    getHabitLifetimeTotal(
      sessions,
      habit.id
    );

  const history =
    getHabitHistory(
      sessions,
      habit.id
    );

  const progress =
    habit.targetSeconds
      ? Math.min(
          todayProgress /
            habit.targetSeconds,
          1
        )
      : 0;

  return (
    <ScreenLayout>
      {/* HERO */}

      <View
        style={{
          marginBottom: 26,
        }}
      >
        <Text
          style={{
            color:
              colors.primary,

            fontSize: 13,
          }}
        >
          Focus Habit
        </Text>

        <Text
          style={{
            color:
              colors.text,

            fontSize: 34,

            fontWeight:
              "bold",

            marginTop: 6,
          }}
        >
          {habit.name}
        </Text>
      </View>

      {/* STATS */}

      <View
        style={{
          flexDirection:
            "row",

          gap: 12,

          marginBottom: 24,
        }}
      >
        {/* TODAY */}

        <Card
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color:
                colors.textSecondary,
            }}
          >
            Today
          </Text>

          <Text
            style={{
              color:
                colors.text,

              fontSize: 26,

              fontWeight:
                "bold",

              marginTop: 8,
            }}
          >
            {formatTime(
              habit.targetSeconds
            )}
          </Text>

          <Text
            style={{
              color:
                colors.textSecondary,

              marginTop: 4,
            }}
          >
            daily target
          </Text>
        </Card>

        {/* TOTAL */}

        <Card
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color:
                colors.textSecondary,
            }}
          >
            Total Focused
          </Text>

          <Text
            style={{
              color:
                colors.text,

              fontSize: 26,

              fontWeight:
                "bold",

              marginTop: 8,
            }}
          >
            {formatTime(
              totalFocused
            )}
          </Text>

          <Text
            style={{
              color:
                colors.textSecondary,

              marginTop: 4,
            }}
          >
            since started
          </Text>
        </Card>
      </View>

      {/* TODAY TIMER */}

      <Card
        style={{
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color:
              colors.textSecondary,
          }}
        >
          Today Progress
        </Text>

        <Text
          style={{
            color:
              colors.text,

            fontSize: 48,

            fontWeight:
              "bold",

            marginTop: 12,
          }}
        >
          {formatTime(
            todayProgress
          )}
        </Text>

        {/* BAR */}

        <View
          style={{
            height: 10,

            backgroundColor:
              "#1F2937",

            borderRadius:
              999,

            overflow:
              "hidden",

            marginTop: 20,
          }}
        >
          <View
            style={{
              width: `${
                progress *
                100
              }%`,

              height: "100%",

              backgroundColor:
                colors.primary,
            }}
          />
        </View>

        <Text
          style={{
            color:
              colors.textSecondary,

            marginTop: 10,
          }}
        >
          {formatTime(
            todayProgress
          )}
          {" / "}
          {formatTime(
            habit.targetSeconds
          )}
        </Text>
      </Card>

      {/* CLOCK IN */}

      <Pressable
        onPress={() =>
          navigation.navigate(
            "TimerScreen"
          )
        }
        style={{
          backgroundColor:
            colors.primary,

          paddingVertical:
            18,

          borderRadius:
            22,

          alignItems:
            "center",

          marginBottom: 28,
        }}
      >
        <Text
          style={{
            color: "#000",

            fontSize: 16,

            fontWeight:
              "bold",
          }}
        >
          ⏱ Clock In
        </Text>
      </Pressable>

      {/* HISTORY */}

      <Text
        style={{
          color:
            colors.text,

          fontSize: 22,

          fontWeight:
            "bold",

          marginBottom: 14,
        }}
      >
        History
      </Text>

      {history
        .slice(0, 10)
        .map((session) => (
          <Card
            key={
              session.id
            }
            style={{
              marginBottom:
                12,
            }}
          >
            <Text
              style={{
                color:
                  colors.text,
              }}
            >
              {new Date(
                session.createdAt
              ).toLocaleDateString()}
            </Text>

            <Text
              style={{
                color:
                  colors.textSecondary,

                marginTop:
                  4,
              }}
            >
              {formatTime(
                session.durationSeconds
              )}
            </Text>
          </Card>
        ))}
    </ScreenLayout>
  );
}