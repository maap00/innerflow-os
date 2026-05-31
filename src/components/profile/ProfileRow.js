import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { colors } from "../../theme/colors";

export default function ProfileRow({
  icon,
  label,
  onPress,
  destructive = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",

        alignItems: "center",

        justifyContent:
          "space-between",

        paddingVertical: 18,

        opacity: pressed ? 0.7 : 1,
      })}
    >
      {/* LEFT */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,

            borderRadius: 12,

            backgroundColor:
              destructive
                ? "rgba(239,68,68,0.12)"
                : "rgba(124,252,138,0.12)",

            alignItems: "center",
            justifyContent: "center",

            marginRight: 14,
          }}
        >
          <Feather
            name={icon}
            size={18}
            color={
              destructive
                ? colors.destructive
                : colors.primary
            }
          />
        </View>

        <Text
          style={{
            color: destructive
              ? colors.destructive
              : colors.text,

            fontSize: 15,

            fontWeight: "500",
          }}
        >
          {label}
        </Text>
      </View>

      {/* RIGHT */}

      <Feather
        name="chevron-right"
        size={18}
        color={colors.textSecondary}
      />
    </Pressable>
  );
}