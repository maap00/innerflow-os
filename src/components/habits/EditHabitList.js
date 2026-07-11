import React from "react";
import { View, Text } from "react-native";

import EditHabitCard from "./EditHabitCard";
import { colors } from "../../theme/colors";

export default function EditHabitList({
  habits,
  onEdit,
}) {
  if (!habits.length) {
    return (
      <Text
        style={{
          color: colors.textSecondary,
          textAlign: "center",
          marginTop: 24,
        }}
      >
        No habits created yet.
      </Text>
    );
  }

  return (
    <View>
      <Text
        style={{
          color: colors.text,
          fontSize: 22,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        Edit Habits
      </Text>

      {habits.map((habit) => (
        <EditHabitCard
          key={habit.id}
          habit={habit}
          onEdit={onEdit}
        />
      ))}
    </View>
  );
}