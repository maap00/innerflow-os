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

import HabitSessionHeader from "../components/habitSession/HabitSessionHeader";
import HabitMetricsRow from "../components/habitSession/HabitMetricsRow";
import HabitProgressRing from "../components/habitSession/HabitProgressRing";
import SessionHistoryList from "../components/habitSession/SessionHistoryList";

export default function HabitSessionScreen() {
  const navigation =
    useNavigation();

  const {
    habits,
    sessions,
    selectedHabitId,
    checkHabitCompletion,
    startSession,
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

  const isCompletedToday =
  todayProgress >=
  habit.targetSeconds;

       

  return (
    <ScreenLayout>
        <HabitSessionHeader
            habit={habit}
        />

        <HabitMetricsRow
            todayTarget={formatTime(
            habit.targetSeconds
            )}
            totalFocused={formatTime(
            totalFocused
            )}
        />

        <HabitProgressRing
            progress={progress}
            current={formatTime(
            todayProgress
            )}
            target={formatTime(
            habit.targetSeconds
            )}
        />

  

         {/* CLOCK IN */}

    {isCompletedToday ? (
  <View
    style={{
      backgroundColor:
        colors.success,

      paddingVertical:
        18,

      borderRadius: 22,

      alignItems:
        "center",

      marginBottom: 28,
    }}
  >
    <Text
      style={{
        color: "#fff",

        fontSize: 16,

        fontWeight:
          "bold",
      }}
    >
      ✅ Completed Today
    </Text>
  </View>
) : (
  <Pressable
    onPress={() => {
      startSession(
        selectedHabitId
      );

      navigation.navigate(
        "TimerScreen"
      );
    }}
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
)}

      {/* HISTORY */}
      <SessionHistoryList
        sessions={history}
      />
    </ScreenLayout>
  );
}