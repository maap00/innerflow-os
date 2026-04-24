import { Button as PaperButton } from "react-native-paper";

export default function Button({ children, onPress, mode = "contained" }) {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={{ marginTop: 10, borderRadius: 12 }}
      contentStyle={{ paddingVertical: 6 }}
    >
      {children}
    </PaperButton>
  );
}