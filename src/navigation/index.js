import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/Dashboard";
import Focus from "../screens/Focus";
import CreateHabit from "../screens/CreateHabit";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer style={{ scrollY: true }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Focus" component={Focus} />
        <Stack.Screen name="CreateHabit" component={CreateHabit} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}