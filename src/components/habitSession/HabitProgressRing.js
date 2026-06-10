import { View, Text } from "react-native";
import CircularTimer from "../timer/CircularTimer";

export default function HabitProgressRing({
  progress,
  current,
  target,
}) {
  return (
    <View
      style={{
        alignItems:
          "center",

        marginBottom: 30,
      }}
    >
      <CircularTimer
        progress={progress}
      />

      <Text
        style={{
          marginTop: 20,

          fontSize: 22,

          fontWeight:
            "bold",
        }}
      >
        {current}
        {" / "}
        {target}
      </Text>
    </View>
  );
}