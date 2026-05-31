import {
  View,
  Text,
  Image,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { colors } from "../../theme/colors";

export default function ProfileHeader() {
  return (
    <View
      style={{
        alignItems: "center",

        marginTop: 0,

        marginBottom: 32,

      }}
    >
      {/* AVATAR */}

      <Image
        source={{
          uri: "https://i.pravatar.cc/300",
        }}
        id="profile-avatar"
        style={{
          width: 120,
          height: 120,
          
          

          borderRadius: 28,

          borderWidth: 4,

          borderColor: "#FFF",

          marginBottom: 18,
        }}
      />

      {/* NAME */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,

            fontSize: 30,

            fontWeight: "bold",
          }}
        >
          Marco Astudillo
        </Text>

        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Feather
            name="check-circle"
            size={20}
            color={colors.primary}
          />
        </View>
      </View>

      {/* ROLE */}

      <Text
        style={{
          color: colors.primary,

          marginTop: 8,

          fontSize: 15,
        }}
      >
        Elite Athlete & Software
        Engineer
      </Text>
    </View>
  );
}