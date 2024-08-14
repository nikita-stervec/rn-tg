import { StyleSheet } from "react-native";

function getChatThemeStyles(theme: string) {
  return StyleSheet.create({
    chatItem: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    chatAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme === "dark" ? "#333" : "#ccc",
    },
    chatInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: 10,
    },
    chatName: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#000",
    },
    chatLastMessage: {
      fontSize: 14,
      color: theme === "dark" ? "#aaa" : "#888",
    },
  });
}
export default getChatThemeStyles;
