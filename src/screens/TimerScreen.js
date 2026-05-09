import { View } from "react-native";
import Timer from "../components/timer/Timer";
import { colors } from "../theme/colors";

export default function TimerScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Timer />
    </View>
  );
}