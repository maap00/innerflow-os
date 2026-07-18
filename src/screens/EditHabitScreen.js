import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import ScreenLayout from "../components/layout/ScreenLayout";
import HabitForm from "../components/habitForm/HabitForm";

import { useSessionStore } from "../store/useSessionStore";

import { colors } from "../theme/colors";

import {
    Alert,
} from "react-native";

export default function EditHabitScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { habitId } = route.params;

  const {
    habits,
    updateHabit,
    deleteHabit,
  } = useSessionStore();

  const habit = habits.find(
    (h) => h.id === habitId
  );

  if (!habit) {
    return null;
  }

  // =========================
  // FORM STATE
  // =========================

  const [name, setName] = useState(habit.name);

  const [nameError, setNameError] = useState(false);

  const [validationType, setValidationType] =
    useState(habit.validationType);

  const [category, setCategory] =
    useState(habit.category);

  const [minutes, setMinutes] = useState(
    habit.targetSeconds
      ? habit.targetSeconds / 60
      : 25
  );

  const [mode, setMode] = useState("custom");

  const [stage1, setStage1] = useState(
    String(habit.stageConfig?.stage1 ?? 30)
  );

  const [stage2, setStage2] = useState(
    String(habit.stageConfig?.stage2 ?? 30)
  );

  const [stage3, setStage3] = useState(
    String(habit.stageConfig?.stage3 ?? 30)
  );

  // =========================
  // SAVE
  // =========================

  const handleSave = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }



    updateHabit(habit.id, {
      name,
      validationType,
      category,
      targetMinutes: minutes,
      stage1: Number(stage1),
      stage2: Number(stage2),
      stage3: Number(stage3),
    });

    navigation.goBack();
  };

  const handleDelete = () => {
  Alert.alert(
    "Delete Habit",
    `Are you sure you want to delete "${habit.name}"?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteHabit(habit.id);

          navigation.goBack();
        },
      },
    ]
  );
};

  // =========================
  // UI
  // =========================

  return (
    <ScreenLayout>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 140,
        }}
      >
        <View
          style={{
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Edit Habit
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 8,
            }}
          >
            Update your habit configuration.
          </Text>
        </View>

        <HabitForm
          name={name}
          setName={setName}
          nameError={nameError}
          setNameError={setNameError}
          validationType={validationType}
          setValidationType={setValidationType}
          category={category}
          setCategory={setCategory}
          minutes={minutes}
          setMinutes={setMinutes}
          mode={mode}
          setMode={setMode}
          stage1={stage1}
          setStage1={setStage1}
          stage2={stage2}
          setStage2={setStage2}
          stage3={stage3}
          setStage3={setStage3}
        />

        <Pressable
          onPress={handleSave}
          style={{
            marginTop: 24,
            backgroundColor: colors.primary,
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Save Changes
          </Text>
        </Pressable>
        <Pressable
            onPress={handleDelete}
            style={{
                marginTop: 16,

                paddingVertical: 18,

                borderRadius: 18,

                alignItems: "center",

                borderWidth: 1,

                borderColor: "#DC2626",

                backgroundColor: "#2A1111",
            }}
            >
            <Text
                style={{
                color: "#EF4444",
                fontWeight: "bold",
                fontSize: 16,
                }}
            >
                Delete Habit
            </Text>
        </Pressable>
      </ScrollView>
    </ScreenLayout>
  );
}