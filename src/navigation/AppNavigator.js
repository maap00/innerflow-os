import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import Dashboard from "../screens/Dashboard";
import Habits from "../screens/Habits";
import TimerScreen from "../screens/TimerScreen";
import History from "../screens/History";
import Profile from "../screens/Profile";

import CreateHabits from "../screens/CreateHabits";

import CustomTabBar from "./CustomTabBar";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => (
        <CustomTabBar {...props} />
      )}
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

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={Tabs}
      />

      <Stack.Screen
        name="CreateHabits"
        component={CreateHabits}
      />
    </Stack.Navigator>
  );
}