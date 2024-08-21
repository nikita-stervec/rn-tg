import { StyleSheet } from "react-native";

function createSearchStyles(theme: string) {
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    input: {
      width: "100%",
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    placeholderTextColor: {
      color: theme == "dark" ? "#fff" : "#000",
    },
  });
  return styles;
}

export default createSearchStyles;
