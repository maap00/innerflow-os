import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { HABIT_MILESTONES } from "../../helpers/milestones";

export default function HabitBadge({ milestone }) {
  const badge = HABIT_MILESTONES[milestone];

  if (!badge) return null;

  return (
    <View
      style={{
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.surface,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 6,
      }}
    >
      <Text style={{ fontSize: 14 }}>
        {badge.icon}
      </Text>
    </View>
  );
}