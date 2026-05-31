import {
  ScrollView,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { colors } from "../../theme/colors";

export default function ScreenLayout({
  children,
  scroll = true,
  contentStyle = {},
}) {
  const Content = scroll
    ? ScrollView
    : View;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colors.background,
      }}
    >
      <Content
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 140,

          ...contentStyle,
        }}
        style={{
          flex: 1,
        }}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
}