import {
  View,
  Text,
} from "react-native";

import Card from "../ui/Card";

import { colors } from "../../theme/colors";

import { formatTime } from "../../helpers/time";

export default function DailySummaryCard({
  todayTotal,
  totalTarget,
  streak,
}) {
  const progress =
    totalTarget > 0
      ? Math.min(
          todayTotal /
            totalTarget,
          1
        )
      : 0;

  return (
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

          fontSize: 42,

          fontWeight:
            "bold",

          marginTop: 10,
        }}
      >
        {formatTime(todayTotal)}
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,

          marginTop: 8,
        }}
      >
        Goal:
        {" "}
        {formatTime(totalTarget)}
      </Text>

      <View
        style={{
          height: 10,

          backgroundColor:
            "#1F2937",

          borderRadius: 999,

          marginTop: 20,

          overflow:
            "hidden",
        }}
      >
        <View
          style={{
            width: `${
              progress * 100
            }%`,

            backgroundColor:
              colors.primary,

            height: "100%",
          }}
        />
      </View>

      <Text
        style={{
          color:
            colors.primary,

          marginTop: 16,

          fontWeight:
            "700",
        }}
      >
        🔥 {streak} días
      </Text>
    </Card>
  );
}