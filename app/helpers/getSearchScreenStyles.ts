import { StyleSheet } from "react-native";

function createSearchStyles(theme: string) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    searchContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    placeholderTextColor: {
      color: theme === "dark" ? "#fff" : "#000",
    },
    resultsContainer: {
      flex: 1,
    },
    resultItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    resultText: {
      color: theme === "dark" ? "#fff" : "#000",
    },
  });
  return styles;
}

export default createSearchStyles;
