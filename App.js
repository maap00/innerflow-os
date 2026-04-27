import Navigation from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/theme/theme";
import { useEffect } from "react";
import { useSessionStore } from "./src/store/useSessionStore";

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}