import { View, Text } from "react-native";
import Card from "../ui/Card";
import { colors } from "../../theme/colors";

export default function HabitMetricsRow({
  todayTarget,
  totalFocused,
}) {
  return (
    <View
      style={{
        flexDirection:
          "row",

        gap: 12,

        marginBottom: 24,
      }}
    >
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
          {todayTarget}
        </Text>
      </Card>

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
          {totalFocused}
        </Text>
      </Card>
    </View>
  );
}