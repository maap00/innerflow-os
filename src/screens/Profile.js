import { View, Text } from "react-native";
import { useSessionStore } from "../store/useSessionStore";

export default function Profile() {
  const { points, balance } = useSessionStore();

  return (
    <View style={{ padding: 16 }}>
      <Text>Perfil</Text>
      <Text>Puntos: {points}</Text>
      <Text>Balance: {balance}</Text>
    </View>
  );
}