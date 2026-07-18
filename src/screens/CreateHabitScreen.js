import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";

import { useState } from "react";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import Card from "../components/ui/Card";

import { colors } from "../theme/colors";

import { useSessionStore } from "../store/useSessionStore";

import {
  getAllCategories,
} from "../helpers/categories";

import HabitForm from "../components/habitForm/HabitForm";

export default function CreateHabits() {
  const navigation = useNavigation();

  const { addHabit } = useSessionStore();

  // =========================
  // 🧠 FORM STATE
  // =========================

  const [name, setName] = useState("");

  const [nameError, setNameError] =
    useState(false);

  const [validationType, setValidationType] =
    useState("time");

  const [minutes, setMinutes] = useState(30);

  const [mode, setMode] = useState("custom");

  const [
  category,
  setCategory,
] = useState("mental");

  const [stage1, setStage1] = useState("30");
  const [stage2, setStage2] = useState("30");
  const [stage3, setStage3] = useState("30");

  // =========================
  // 🚀 CREATE
  // =========================

  const handleCreateHabit = () => {
    // 🚨 VALIDATION

    if (!name.trim()) {
      setNameError(true);
      return;
    }

    setNameError(false);

    const config = {
      validationType,
      category,

      targetMinutes:
        validationType === "time"
          ? minutes
          : 0,

      stageConfig:
        mode === "222222"
          ? {
              stage1: 22,
              stage2: 22,
              stage3: 22,
            }
          : {
              stage1: Number(stage1),
              stage2: Number(stage2),
              stage3: Number(stage3),
            },
    };

    addHabit(name.trim(), config);

    navigation.goBack();
  };

  // =========================
  // 🎨 UI
  // =========================

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >

   <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 140,
      }}
    >
      {/* HEADER */}

      <View style={{ marginBottom: 30 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Nuevo hábito
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 8,
            fontSize: 15,
          }}
        >
          Diseñá un nuevo sistema de disciplina.
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
    </ScrollView>

      {/* 🚀 CTA */}

      <View
        style={{
          position: "absolute",

          left: 16,
          right: 16,
          bottom: 40,
        }}
      >
        <Pressable
          onPress={() => {
            if (!name.trim()) {
              setNameError(true);
              return;
            }

            handleCreateHabit();
          }}
          style={{
            backgroundColor: colors.primary,

            paddingVertical: 18,

            borderRadius: 18,

            alignItems: "center",

            opacity: name.trim()
              ? 1
              : 0.5,

            shadowColor: colors.primary,
            shadowOpacity: 0.5,
            shadowRadius: 20,
            shadowOffset: {
              width: 0,
              height: 10,
            },

            elevation: 10,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Crear hábito
          </Text>
        </Pressable>
      </View>
    </View>
  );
}