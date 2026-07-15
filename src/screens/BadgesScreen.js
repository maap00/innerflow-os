import React from "react";
import { Text, View } from "react-native";

import Card from "../components/ui/Card";

import ScreenLayout from "../components/layout/ScreenLayout";

import BadgeHabitCard from "../components/badges/BadgeHabitCard";

import { colors } from "../theme/colors";

import { useSessionStore } from "../store/useSessionStore";


export default function BadgesScreen() {
  const habits =
    useSessionStore(
      (state) => state.habits
    );

  return (
    <ScreenLayout>
      <View
        style={{
            marginBottom: 32,
        }}
        >
        <Text
            style={{
            color: colors.text,

            fontSize: 34,

            fontWeight: "bold",
            }}
        >
            🏆 Badges
        </Text>

        <Text
            style={{
            color: colors.textSecondary,

            marginTop: 8,

            fontSize: 16,

            lineHeight: 22,
            }}
        >
            Unlock achievements by building consistency every day.
        </Text>

    </View>
    <Card
        style={{
            marginBottom: 28,
        }}
        >
        <Text
            style={{
            color: colors.textSecondary,
            }}
        >
            Total Badges
        </Text>

        <Text
            style={{
            color: colors.text,

            fontSize: 42,

            fontWeight: "bold",

            marginTop: 8,
            }}
        >
            {habits.reduce(
            (sum, habit) =>
                sum +
                habit.milestones.length,
            0
            )}
        </Text>

        <Text
            style={{
            color: colors.primary,

            marginTop: 8,
            }}
        >
            unlocked
        </Text>
        </Card>
    

      {habits.map((habit) => (
        <BadgeHabitCard
          key={habit.id}
          habit={habit}
        />
      ))}
    </ScreenLayout>
  );
}