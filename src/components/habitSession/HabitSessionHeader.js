import { View, Text } from "react-native";
import { colors } from "../../theme/colors";

export default function HabitSessionHeader({
  habit,
}) {
  const stageNames = {
    1: "Destruction",
    2: "Implementation",
    3: "Integration",
  };

  return (
    <View
      style={{
        marginBottom: 28,
      }}
    >
      <Text
        style={{
          color:
            colors.text,

          fontSize: 34,

          fontWeight:
            "bold",
        }}
      >
        {habit.name}
      </Text>

      <Text
        style={{
          color:
            colors.primary,

          marginTop: 8,

          fontSize: 15,
        }}
      >
        {
          stageNames[
            habit.stage
          ]
        }
        {" • "}
        {
          habit.currentDay
        }
        /
        {
          habit.totalDays
        }
        {" days"}
      </Text>
    </View>
  );
}