import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/Dashboard";
import Focus from "../screens/Focus";
import CreateHabits from "../screens/CreateHabits";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer style={{ scrollY: true }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Focus" component={Focus} />
        <Stack.Screen name="CreateHabits" component={CreateHabits} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}