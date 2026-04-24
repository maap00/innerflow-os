import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/Dashboard";
import Focus from "../screens/Focus";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Focus" component={Focus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}