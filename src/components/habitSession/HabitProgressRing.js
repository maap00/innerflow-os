import { View, Text } from "react-native";

import Card from "../ui/Card";

import { colors } from "../../theme/colors";

export default function HabitProgressRing({
  progress,
  current,
  target,
}) {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <Card
        style={{
          marginBottom: 24,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: colors.textSecondary,
          }}
        >
          Today Progress
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 48,
            fontWeight: "bold",
            marginTop: 12,
          }}
        >
          {current}
        </Text>

        <View
          style={{
            height: 10,
            backgroundColor: "#1F2937",
            borderRadius: 999,
            overflow: "hidden",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: `${progress * 100}%`,
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
          {current}
          {" / "}
          {target}
        </Text>
      </Card>
    </View>
  );
}