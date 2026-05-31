import {
  View,
  Text,
  Image,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { colors } from "../../theme/colors";

export default function DashboardHero() {
  return (
    <View
      style={{
        marginBottom: 26,
      }}
    >
      {/* HEADER */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          alignItems: "center",
        }}
      >
        {/* LEFT */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={{
              width: 54,
              height: 54,

              borderRadius: 18,

              marginRight: 14,
            }}
          />

          <View>
            <Text
              style={{
                color:
                  colors.text,

                fontSize: 18,

                fontWeight:
                  "700",
              }}
            >
              Hi Marco 👋
            </Text>

            <Text
              style={{
                color:
                  colors.primary,

                fontSize: 13,
              }}
            >
              Elite Athlete &
              Software Engineer
            </Text>
          </View>
        </View>

        {/* ACTIONS */}

        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,

              borderRadius: 14,

              backgroundColor:
                colors.card,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >
            <Feather
              name="message-circle"
              size={18}
              color={
                colors.primary
              }
            />
          </View>

          <View
            style={{
              width: 42,
              height: 42,

              borderRadius: 14,

              backgroundColor:
                colors.card,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >
            <Feather
              name="bell"
              size={18}
              color={
                colors.primary
              }
            />
          </View>
        </View>
      </View>

      {/* HERO */}

      <View
        style={{
          marginTop: 22,

          backgroundColor:
            "#556B2F",

          borderRadius: 28,

          padding: 22,
        }}
      >
        <Text
          style={{
            color: "#FFF",

            fontSize: 24,

            fontWeight: "bold",
          }}
        >
          My Flow Summary
        </Text>

        <Text
          style={{
            color:
              "rgba(255,255,255,0.8)",

            marginTop: 6,
          }}
        >
          Today focus & habit
          activity
        </Text>
      </View>
    </View>
  );
}