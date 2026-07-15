import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";

export default function BadgeMilestone({
  icon,
  unlocked,
}) {
  return (
    <View
      style={{
        width: 56,
        height: 56,
        borderRadius: 28,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: unlocked
          ? "#2B2615"
          : "#1F2937",

        borderWidth: 2,

        borderColor: unlocked
          ? colors.primary
          : "#374151",

        opacity: unlocked ? 1 : 0.35,
      }}
    >
      <Text
        style={{
          fontSize: 28,
        }}
      >
        {icon}
      </Text>
    </View>
  );
}