import { View, Text } from "react-native";
import { colors } from "../../theme/colors";

export default function EmptyHistory() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
      }}
    >
      <Text
        style={{
          fontSize: 64,
          marginBottom: 16,
        }}
      >
        📈
      </Text>

      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        No activity yet
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        Start your first focus session
        {"\n"}
        to begin building momentum.
      </Text>
    </View>
  );
}