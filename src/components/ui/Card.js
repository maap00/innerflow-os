import { Card as PaperCard } from "react-native-paper";

export default function Card({ children }) {
  return (
    <PaperCard
      style={{
        marginVertical: 10,
        padding: 10,
        borderRadius: 16,
      }}
    >
      {children}
    </PaperCard>
  );
}