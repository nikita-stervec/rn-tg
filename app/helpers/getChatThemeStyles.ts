import { StyleSheet } from "react-native";

function createThemeStyles(theme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
    },
    text: {
      fontSize: 16,
      color: theme === "dark" ? "#fff" : "#000",
    },
    messagesContainer: {
      flex: 1,
      width: "100%",
      padding: 10,
    },
    message: {
      fontSize: 14,
      color: theme === "dark" ? "#fff" : "#000",
      marginBottom: 5,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: theme === "dark" ? "#333" : "#ccc",
      padding: 10,
      width: "100%",
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    },
    sendButton: {
      backgroundColor: theme === "dark" ? "#3366FF" : "#007AFF",
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    sendButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    placeholderTextColor: {
      color: theme === "dark" ? "#aaa" : "#888",
    },
  });
}
export default createThemeStyles;
