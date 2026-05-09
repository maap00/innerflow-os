import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

import Dashboard from "../screens/Dashboard";
import Habits from "../screens/Habits";
import TimerScreen from "../screens/TimerScreen";
import History from "../screens/History";
import Profile from "../screens/Profile";

import { colors } from "../theme/colors";
import CustomTabBar from "./CustomTabBar";


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0B0F14",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
        },
        

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#6B7280",

        // 🔥 👉 ACA VA EL CÓDIGO
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") iconName = "home";
          if (route.name === "Habitos") iconName = "check-circle";
          if (route.name === "Timer") iconName = "clock";
          if (route.name === "Historial") iconName = "bar-chart-2";
          if (route.name === "Perfil") iconName = "user";

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Habitos" component={Habits} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Historial" component={History} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}