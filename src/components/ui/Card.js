import { View } from "react-native";
import { colors } from "../../theme/colors";

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 20,
          padding: 16,
          marginBottom: 16,

          borderWidth: 1,
          borderColor: colors.border,

          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },

          elevation: 8,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}