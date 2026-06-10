import { Text } from "react-native";
import Card from "../ui/Card";

export default function SessionHistoryItem({
  session,
  duration,
}) {
  return (
    <Card
      style={{
        marginBottom: 12,
      }}
    >
      <Text>
        {new Date(
          session.createdAt
        ).toLocaleDateString()}
      </Text>

      <Text>
        {duration}
      </Text>
    </Card>
  );
}