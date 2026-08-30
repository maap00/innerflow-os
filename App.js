import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";


import RootNavigator from "./src/navigation/RootNavigator";
import { useEffect } from "react";

import { testAchievements } from "./src/testAchievements"; 

export default function App() {

  useEffect(() => {
    testAchievements();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}