import { ScrollView, Text } from "react-native";
import { useSessionStore } from "../store/useSessionStore";
import { formatTime } from "../helpers/time";

export default function History() {
  const { sessions } = useSessionStore();

  return (
    <ScrollView style={{ padding: 16 }}>
      {sessions.map((s, i) => (
        <Text key={i}>
          ⏱️ {formatTime(s.duration)}
        </Text>
      ))}
    </ScrollView>
  );
}