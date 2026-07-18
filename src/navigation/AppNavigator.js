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

import CreateHabits from "../screens/CreateHabitScreen";

import CustomTabBar from "./CustomTabBar";

import HabitSessionScreen
from "../screens/HabitSessionScreen";

import BadgesScreen from "../screens/BadgesScreen";
import EditHabitScreen from "../screens/EditHabitScreen";

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

      <Stack.Screen
        name="HabitSession"
        component={HabitSessionScreen}
      />
      
      <Stack.Screen
      name="TimerScreen"
      component={TimerScreen}
      options={{
        headerShown: false,
      }}
    />

      <Stack.Screen
        name="Badges"
        component={BadgesScreen}
      />

      <Stack.Screen
        name="EditHabit"
        component={EditHabitScreen}
      />
    </Stack.Navigator>
  );
}