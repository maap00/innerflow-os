import React from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import Card from "../ui/Card";
import { colors } from "../../theme/colors";

export default function EditHabitCard({
  habit,
  onEdit,
}) {
  return (
    <Card
      style={{
        marginBottom: 12,
      }}
    >
      <Pressable
        onPress={() => onEdit(habit)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {habit.name}
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {habit.validationType === "time"
              ? "Time Habit"
              : "Manual Habit"}
          </Text>
        </View>

        <Feather
          name="edit-2"
          size={20}
          color={colors.primary}
        />
      </Pressable>
    </Card>
  );
}