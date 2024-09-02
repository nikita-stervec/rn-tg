import { StyleSheet } from "react-native";

function getThemeStyles(theme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
    },
    secondaryContainer: {
      borderRadius: 10,
      width: "90%",
      display: "flex",
      paddingVertical: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "#252525" : "#f7f7f7",
    },
    chatButton: {
      width: "100%",
    },
    link: {
      color: theme === "dark" ? "#3366FF" : "blue",
      marginTop: 10,
    },
    placeholderTextColor: {
      color: theme === "dark" ? "#aaa" : "#888",
    },
    text: {
      fontSize: 16,
      color: theme === "dark" ? "#fff" : "#000",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme === "dark" ? "#fff" : "#000",
    },
    input: {
      width: "80%",
      height: 40,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    },
    button: {
      width: "80%",
      backgroundColor: theme === "dark" ? "#3366FF" : "#007AFF",
      borderRadius: 5,
      paddingVertical: 10,
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
    errorText: {
      color: "red",
      marginBottom: 10,
    },
  });
}
export default getThemeStyles;
