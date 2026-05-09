import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../theme/colors";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#0B0F14",
        borderTopWidth: 0,
        height: 70,
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        let iconName;

        if (route.name === "Dashboard") iconName = "home";
        if (route.name === "Habitos") iconName = "check-circle";
        if (route.name === "Timer") iconName = "clock";
        if (route.name === "Historial") iconName = "bar-chart-2";
        if (route.name === "Perfil") iconName = "user";

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
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                padding: 10,
                borderRadius: 20,

                // 🔥 glow effect activo
                backgroundColor: isFocused
                  ? "rgba(74, 222, 128, 0.15)"
                  : "transparent",

                shadowColor: isFocused ? colors.primary : "transparent",
                shadowOpacity: isFocused ? 0.6 : 0,
                shadowRadius: isFocused ? 12 : 0,
                shadowOffset: { width: 0, height: 0 },
              }}
            >
              <Icon
                name={iconName}
                size={22}
                color={isFocused ? colors.primary : "#6B7280"}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}