import {
  View,
  Text,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import ProfileHeader from "../components/profile/ProfileHeader";

import ProfileSection from "../components/profile/ProfileSection";

import ProfileRow from "../components/profile/ProfileRow";

import { colors } from "../theme/colors";

import {
  useNavigation,
} from "@react-navigation/native";

export default function Profile() {

  const navigation =
    useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // keep container relative so the hero can be absolutely positioned behind content
        position: "relative",
        backgroundColor: colors.background,
      }}
    >
      {/* HERO */}

      <View
        id="profile-header"
        style={{
          // position the hero absolutely so it sits behind the rest of the screen
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          backgroundColor: "#556B2F",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          zIndex: 0,
          elevation: 0,
        }}
      >
        <View
          style={{
            paddingHorizontal: 24,

            paddingTop: 30,
          }}
        >
          <Text
            style={{
              color: "#FFF",

              fontSize: 28,

              fontWeight: "bold",
            }}
          >
            My Profile
          </Text>
        </View>
      </View>

      {/* CONTENT */}

      <ScrollView
        // make sure content sits above the absolute hero background
        style={{
          zIndex: 1,
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          // leave space at top so content (and the header component/avatar) appears below the hero
          paddingTop: 100,
          paddingBottom: 140,
        }}
      >
        {/* HEADER */}

        <ProfileHeader />

        {/* CONTACT */}

        <ProfileSection title="CONTACT">
          <ProfileRow
            icon="mail"
            label="marco@gmail.com"
          />

          <ProfileRow
            icon="map-pin"
            label="Argentina"
          />
        </ProfileSection>

        {/* ACCOUNT */}

        <ProfileSection title="ACCOUNT">
          <ProfileRow
            icon="user"
            label="Personal Data"
          />

          <ProfileRow
            icon="briefcase"
            label="Achievements"
          />

          <ProfileRow
            icon="award"
            label="Badges"
            onPress={() =>
              navigation.navigate(
                "Badges"
              )
            }
          />
        </ProfileSection>

        {/* SETTINGS */}

        <ProfileSection title="SETTINGS">
          <ProfileRow
            icon="lock"
            label="Change Password"
          />

          <ProfileRow
            icon="help-circle"
            label="FAQ & Help"
          />

          <ProfileRow
            icon="log-out"
            label="Logout"
            destructive
          />
        </ProfileSection>
      </ScrollView>
    </SafeAreaView>
  );
}