import { View, Text } from "react-native";
import Card from "../ui/Card";
import { colors } from "../../theme/colors";
import { formatTime } from "../../helpers/time";

export default function SessionHistoryItem({
  session,
}) {
  return (
    <Card
      style={{
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontWeight: "600",
        }}
      >
        {new Date(
          session.createdAt
        ).toLocaleDateString()}
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,
          marginTop: 4,
        }}
      >
        {formatTime(
          session.durationSeconds
        )}
      </Text>
    </Card>
  );
}