import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "../screens/Dashboard";
import Habits from "../screens/Habits";
import TimerScreen from "../screens/TimerScreen";
import History from "../screens/History";
import Profile from "../screens/Profile";

import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />

      <Tab.Screen
        name="Habitos"
        component={Habits}
      />

      <Tab.Screen
        name="Timer"
        component={TimerScreen}
      />

      <Tab.Screen
        name="Historial"
        component={History}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
      />
    </Tab.Navigator>
  );
}