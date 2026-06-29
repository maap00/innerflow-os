import { View, Text } from "react-native";

import { colors } from "../../theme/colors";

import SessionHistoryItem from "./SessionHistoryItem";

export default function SessionHistoryList({
  sessions,
}) {
  if (!sessions?.length) {
    return (
      <View>
        <Text
          style={{
            color:
              colors.textSecondary,
            textAlign:
              "center",
            marginTop: 20,
          }}
        >
          No sessions yet
        </Text>
      </View>
    );
  }

  return (
    <>
      <Text
        style={{
          color: colors.text,
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 14,
        }}
      >
        History
      </Text>

      {sessions
        .slice(0, 10)
        .map((session) => (
          <SessionHistoryItem
            key={session.id}
            session={session}
          />
        ))}
    </>
  );
}