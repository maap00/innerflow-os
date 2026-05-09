import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../../theme/colors";
import { formatTime } from "../../helpers/time";

export default function CircularTimer({
  duration,
  target = 1500, // default 25 min
}) {
  const radius = 120;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(duration / target, 1);

  const strokeDashoffset =
    circumference - circumference * progress;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg
        width={280}
        height={280}
        viewBox="0 0 300 300"
      >
        {/* background circle */}
        <Circle
          cx="150"
          cy="150"
          r={radius}
          stroke="#1F2937"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* progress circle */}
        <Circle
          cx="150"
          cy="150"
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin="150,150"
        />
      </Svg>

      {/* CENTER CONTENT */}
      <View
        style={{
          position: "absolute",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 42,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          {formatTime(duration)}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 4,
          }}
        >
          Tiempo restante
        </Text>
      </View>
    </View>
  );
}