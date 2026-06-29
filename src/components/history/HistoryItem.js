import {
  View,
  Text,
} from "react-native";

import Card from "../ui/Card";

import { colors } from "../../theme/colors";

export default function HistoryItem({
  title,
  duration,
  date,
}) {
  return (
    <Card
      style={{
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          color:
            colors.text,

          fontWeight:
            "600",
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,

          marginTop: 4,
        }}
      >
        {duration}
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,

          marginTop: 4,

          fontSize: 12,
        }}
      >
        {date}
      </Text>
    </Card>
  );
}