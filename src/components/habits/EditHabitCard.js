import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Card from "../ui/Card";
import { colors } from "../../theme/colors";
import { getCategory } from "../../helpers/categories";

export default function EditHabitCard({ habit }) {
  const navigation = useNavigation();

  const category = getCategory(habit.category);

  const handleEdit = () => {
    navigation.navigate("EditHabit", {
      habitId: habit.id,
    });
  };

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {habit.name}
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 6,
            }}
          >
            {category.icon} {category.label}
          </Text>
        </View>

        <Pressable
          onPress={handleEdit}
          style={{
            paddingHorizontal: 18,
            paddingVertical: 10,
            backgroundColor: colors.primary,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "600",
            }}
          >
            Edit
          </Text>
        </Pressable>
      </View>
    </Card>
  );
}