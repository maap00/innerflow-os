import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import HabitCard from "../components/habits/HabitCard";
import Card from "../components/ui/Card";

import { useSessionStore } from "../store/useSessionStore";

import { getHabitProgress } from "../helpers/habits";

import { colors } from "../theme/colors";

export default function Habits() {
  const navigation = useNavigation();

  const {
    habits,
    sessions,
    selectHabit,
    completeHabit,
  } = useSessionStore();

  const activeHabits = habits.length;

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
        {/* 🔥 HEADER */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Tus hábitos
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 6,
              fontSize: 15,
            }}
          >
            Construí disciplina diaria.
          </Text>
        </View>

        {/* 📊 STATS */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 13,
                }}
              >
                Hábitos activos
              </Text>

              <Text
                style={{
                  color: colors.text,
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: 4,
                }}
              >
                {activeHabits}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 13,
                }}
              >
                Sistema
              </Text>

              <Text
                style={{
                  color: colors.primary,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 6,
                }}
              >
                DII
              </Text>
            </View>
          </View>
        </Card>

        {/* 🎯 HABITS */}
        {habits.length === 0 ? (
          <Card
            style={{
              alignItems: "center",
              paddingVertical: 40,
            }}
          >
            <Feather
              name="target"
              size={42}
              color={colors.primary}
            />

            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 14,
              }}
            >
              No hay hábitos
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                marginTop: 8,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Empezá creando tu primer sistema
              {"\n"}
              de disciplina.
            </Text>
          </Card>
        ) : (
          habits.map((h) => {
            const progress = getHabitProgress(
              sessions,
              h.id
            );

            return (
              <HabitCard
                key={h.id}
                habit={h}
                progress={progress}
                onSelect={() => selectHabit(h.id)}
                onComplete={() => completeHabit(h.id)}
              />
            );
          })
        )}
      </ScrollView>

      {/* ➕ FAB */}
      <Pressable
        onPress={() =>
          navigation.navigate("CreateHabits")
        }
        style={{
          position: "absolute",

          right: 24,
          bottom: 110,

          width: 64,
          height: 64,

          borderRadius: 32,

          backgroundColor: colors.primary,

          alignItems: "center",
          justifyContent: "center",

          shadowColor: colors.primary,
          shadowOpacity: 0.5,
          shadowRadius: 20,
          shadowOffset: {
            width: 0,
            height: 8,
          },

          elevation: 10,
        }}
      >
        <Feather
          name="plus"
          size={30}
          color="#000"
        />
      </Pressable>
    </View>
  );
}