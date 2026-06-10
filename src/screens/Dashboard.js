import {
  Text,
} from "react-native";

import ScreenLayout from "../components/layout/ScreenLayout";

import DashboardHero from "../components/dashboard/DashboardHero";

import DailySummaryCard from "../components/dashboard/DailySummaryCard";

import HabitCard from "../components/habits/HabitCard";

import { useSessionStore } from "../store/useSessionStore";

import {
  getTodayTotal,
  getTotalTargetToday,
} from "../helpers/metrics";

import {
  getHabitProgress,
} from "../helpers/habits";

import {
  useNavigation,
} from "@react-navigation/native";

export default function Dashboard() {
  const {
    habits,
    sessions,
    streak,
    selectHabit,
    completeHabit,
  } = useSessionStore();

  const todayTotal =
    getTodayTotal(sessions);

  const totalTarget =
    getTotalTargetToday(
      habits
    );

    const navigation =
  useNavigation();

  return (
    <ScreenLayout>
      <DashboardHero />

      <DailySummaryCard
        todayTotal={todayTotal}
        totalTarget={
          totalTarget
        }
        streak={streak}
      />

      <Text
        style={{
          color: "#FFF",

          fontSize: 20,

          fontWeight:
            "700",

          marginBottom: 18,
        }}
      >
        Today Tasks
      </Text>

      {habits.map((habit) => {
        const progress =
          getHabitProgress(
            sessions,
            habit.id
          );

        return (
          <HabitCard
            key={habit.id}
            habit={habit}
            progress={progress}
            onStartFocus={() => {
              selectHabit(
                habit.id
              );

              navigation.navigate(
                "HabitSession"
              );
            }}
            onComplete={() =>
              completeHabit(
                habit.id
              )
            }
          />
        );
      })}
    </ScreenLayout>
  );
}