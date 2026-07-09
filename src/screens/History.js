import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

import EmptyHistory from "../components/history/EmptyHistory";
import HistoryItem from "../components/history/HistoryItem";
import HistorySection from "../components/history/HistorySection";
import ScreenLayout from "../components/layout/ScreenLayout";
import { groupSessionsByDate } from "../helpers/history";
import { formatTime } from "../helpers/time";
import { useSessionStore } from "../store/useSessionStore";

export default function History() {
  // Zustand Selectors (Optimized to prevent unnecessary re-renders)
  const sessions = useSessionStore((state) => state.sessions);
  const habits = useSessionStore((state) => state.habits);

  // Derived State
  const groupedSessions = useMemo(() => {
    return groupSessionsByDate(sessions);
  }, [sessions]);

  // Habit name lookup map for O(1) access during render
  const habitNameMap = useMemo(() => {
    const map = {};
    habits.forEach((h) => {
      map[h.id] = h.name;
    });
    return map;
  }, [habits]);

  // Helper to render sessions list
  const renderSessions = (sessionsList) => {
    if (!sessionsList) return null;

    return sessionsList
      .slice()
      .reverse()
      .map((session) => (
        <HistoryItem
          key={session.id}
          title={habitNameMap[session.habitId] || "Habit"}
          duration={formatTime(session.durationSeconds)}
          date={new Date(session.createdAt).toLocaleString()}
        />
      ));
  };

  const hasSessions = sessions.length > 0;

  return (
    <ScreenLayout>
      {!hasSessions ? (
        <EmptyHistory />
      ) : (
        <>
          <Text style={styles.title}>Activity History</Text>

          <HistorySection title="Today">
            {renderSessions(groupedSessions.today)}
          </HistorySection>

          <HistorySection title="Yesterday">
            {renderSessions(groupedSessions.yesterday)}
          </HistorySection>

          <HistorySection title="Older">
            {renderSessions(groupedSessions.older)}
          </HistorySection>
        </>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },
});