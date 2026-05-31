import {
  View,
  Text,
} from "react-native";

import Card from "../ui/Card";

import { colors } from "../../theme/colors";

export default function ProfileSection({
  title,
  children,
}) {
  return (
    <View
      style={{
        marginBottom: 28,
      }}
    >
      {/* TITLE */}

      <Text
        style={{
          color: colors.textSecondary,

          fontSize: 13,

          fontWeight: "700",

          marginBottom: 14,

          letterSpacing: 1,
        }}
      >
        {title}
      </Text>

      {/* CONTENT */}

      <Card
        style={{
          paddingVertical: 4,
        }}
      >
        {children}
      </Card>
    </View>
  );
}