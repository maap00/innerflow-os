import React from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import { rewards } from "../data/rewards";
import { useSessionStore } from "../store/useSessionStore";

export default function Rewards() {
  const { balance, redeemReward } = useSessionStore();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20 }}>
        💰 Balance: {balance}
      </Text>

      {rewards.map((r) => (
        <Card key={r.id} style={{ marginVertical: 8 }}>
          <Card.Title title={r.title} />
          <Card.Content>
            <Text>Costo: {r.cost} pts</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => redeemReward(r)}>
              Canjear
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
}