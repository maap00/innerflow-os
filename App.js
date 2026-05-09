import Navigation from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/theme/theme";
import { useEffect } from "react";
import { useSessionStore } from "./src/store/useSessionStore";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}