import { View, Pressable } from "react-native";
// import Icon from "react-native-vector-icons/Feather";
import { Feather } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme/colors";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",

        backgroundColor: "#0B0F14",

        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.05)",

        paddingTop: 10,

        // 🔥 SAFE AREA REAL
        paddingBottom: Math.max(insets.bottom, 12),

        height: 70 + insets.bottom,

        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        let iconName;

        if (route.name === "Dashboard")
          iconName = "home";

        if (route.name === "Habitos")
          iconName = "check-circle";

        if (route.name === "Timer")
          iconName = "clock";

        if (route.name === "Historial")
          iconName = "bar-chart-2";

        if (route.name === "Perfil")
          iconName = "user";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            android_ripple={{
              color: "transparent",
            }}  
          >
            <View
              style={{
                width: 48,
                height: 48,

                borderRadius: 24,

                alignItems: "center",
                justifyContent: "center",

                backgroundColor: isFocused
                  ? "rgba(74,222,128,0.12)"
                  : "transparent",

                // ✨ GLOW
                shadowColor: isFocused
                  ? colors.primary
                  : "transparent",

                shadowOpacity: isFocused ? 0.5 : 0,

                shadowRadius: isFocused ? 14 : 0,

                shadowOffset: {
                  width: 0,
                  height: 0,
                },

                elevation: isFocused ? 10 : 0,
              }}
            >
            <Feather
                name={iconName}
                size={22}
                color={
                    isFocused
                    ? colors.primary
                    : "#6B7280"
                }
            />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}