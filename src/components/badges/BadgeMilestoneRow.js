import React from "react";
import { View } from "react-native";

import BadgeMilestone from "./BadgeMilestone";

export default function BadgeMilestoneRow({
  milestones = [],
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      <BadgeMilestone
        icon="🥉"
        unlocked={milestones.includes("bronze")}
      />

      <BadgeMilestone
        icon="🥈"
        unlocked={milestones.includes("silver")}
      />

      <BadgeMilestone
        icon="🥇"
        unlocked={milestones.includes("gold")}
      />
    </View>
  );
}