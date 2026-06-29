import {
  Text,
} from "react-native";

import {
  colors,
} from "../../theme/colors";

export default function HistorySection({
  title,
  children,
}) {
  return (
    <>
      <Text
        style={{
          color:
            colors.text,

          fontSize: 22,

          fontWeight:
            "bold",

          marginTop: 20,

          marginBottom: 12,
        }}
      >
        {title}
      </Text>

      {children}
    </>
  );
}