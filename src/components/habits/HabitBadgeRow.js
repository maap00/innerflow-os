import { View } from "react-native";
import HabitBadge from "./HabitBadge";

export default function HabitBadgeRow({
  milestones = [],
}) {
  if (milestones.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {milestones.map((milestone) => (
        <HabitBadge
          key={milestone}
          milestone={milestone}
        />
      ))}
    </View>
  );
}