import { ScrollView, Text } from "react-native";
import { useSessionStore } from "../store/useSessionStore";
import { formatTime } from "../helpers/time";

import ScreenLayout
from "../components/layout/ScreenLayout";

import HistoryItem
from "../components/history/HistoryItem";

import HistorySection
from "../components/history/HistorySection";

import {
  groupSessionsByDate,
} from "../helpers/history";

import EmptyHistory
from "../components/history/EmptyHistory";


export default function History() {
  const { sessions, habits } = useSessionStore();

  const groupedSessions =
  groupSessionsByDate(
    sessions
  );



  function getHabitName(
  habitId
    ) {
      return (
        habits.find(
          (h) =>
            h.id === habitId
        )?.name ||
        "Habit"
      );
    }

    function renderSessions(
    sessionsList
      ) {
        return sessionsList
          .slice()
          .reverse()
          .map((session) => (
            <HistoryItem
              key={session.id}
              title={getHabitName(
                session.habitId
              )}
              duration={formatTime(
                session.durationSeconds
              )}
              date={new Date(
                session.createdAt
              ).toLocaleString()
              }
            />
          ));
      }

  return (
    sessions.length === 0 ? (
      <ScreenLayout>
           <EmptyHistory />
      </ScreenLayout>
       ) : (
      <ScreenLayout>
        <Text>
        Activity History
      </Text>

     <HistorySection
        title="Today"
      >
      {renderSessions(
        groupedSessions.today
      )}
    </HistorySection>

    <HistorySection
      title="Yesterday"
    >
      {renderSessions(
        groupedSessions.yesterday
      )}
    </HistorySection>

    <HistorySection
      title="Older"
    >
      {renderSessions(
        groupedSessions.older
      )}
    </HistorySection>
    </ScreenLayout>
    )
    // <ScrollView style={{ padding: 16 }}>
    //   {sessions.map((s, i) => (
    //     <Text key={i}>
    //       ⏱️ {formatTime(s.duration)}
    //     </Text>
    //   ))}
    // </ScrollView>
  );
}