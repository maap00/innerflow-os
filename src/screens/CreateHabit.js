import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import { useSessionStore } from "../store/useSessionStore";

export default function CreateHabit({ navigation }) {
  const { addHabit } = useSessionStore();

  const [name, setName] = useState("");
  const [type, setType] = useState("time");
  const [minutes, setMinutes] = useState("30");

  return (
    <View style={{ padding: 16 }}>
      <Text>Nombre</Text>
      <TextInput
        value={name}
        onChangeText={setName}
      />

      <Text>Tipo</Text>

      <Button onPress={() => setType("time")}>
        ⏱️ Con tiempo
      </Button>

      <Button onPress={() => setType("manual")}>
        ✔ Manual
      </Button>

      {type === "time" && (
        <TextInput
          value={minutes}
          onChangeText={setMinutes}
          keyboardType="numeric"
        />
      )}

      <Button
        onPress={() => {
          addHabit(name, Number(minutes), type);
          navigation.goBack();
        }}
      >
        Crear hábito
      </Button>
    </View>
  );
}