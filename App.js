import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";


import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}