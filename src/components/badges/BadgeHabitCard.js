import React from "react";
import { Text } from "react-native";

import Card from "../ui/Card";

import { colors } from "../../theme/colors";

import BadgeMilestoneRow from "./BadgeMilestoneRow";

import { ProgressBar } from "react-native-paper";

import { getNextBadge } from "../../helpers/badges";

import {
  getCategory,
} from "../../helpers/categories";

export default function BadgeHabitCard({
  habit,
}) {

    const nextBadge =
    getNextBadge(habit);

    const category =
        getCategory(
            habit.category
        );
  return (
    <Card
      style={{
        marginBottom: 18,
      }}
    >
        <Text
        style={{
            color: category.color,
            fontSize: 13,
            fontWeight: "700",
            textTransform: "uppercase",
            marginBottom: 8,
        }}
        >
        {category.icon} {category.label}
        </Text>
      <Text
        style={{
          color: colors.text,

          fontSize: 20,

          fontWeight: "700",
        }}
      >
        {habit.name}
      </Text>

      <Text
        style={{
          color: colors.textSecondary,

          marginTop: 6,
        }}
      >
        Day {habit.currentDay} / {habit.totalDays}
      </Text>
      <ProgressBar
        progress={
            habit.currentDay /
            habit.totalDays
        }
        color={colors.primary}
        style={{
            marginTop: 14,

            height: 8,

            borderRadius: 10,
        }}
        />

      <BadgeMilestoneRow
        milestones={
          habit.milestones || []
        }
      />

      {nextBadge && (
        <Text
            style={{
            color:
                colors.textSecondary,

            marginTop: 18,
            }}
        >
            Next Badge{" "}
            {nextBadge.badge}

            {" • "}

            {nextBadge.remaining}

            {" "}days remaining
        </Text>
        )}
    </Card>
  );
}