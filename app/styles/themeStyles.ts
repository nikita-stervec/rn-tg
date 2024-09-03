import { StyleSheet } from "react-native";
import { lightThemeColors, darkThemeColors } from "./themeColors";

type Theme = "light" | "dark";

const createThemeStyles = (theme: Theme) => {
  const colors = theme === "dark" ? darkThemeColors : lightThemeColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      padding: 16,
      gap: 8,
      backgroundColor: colors.background,
      color: colors.text,
    },
    text: {
      fontSize: 16,
      color: colors.text,
    },
    title: {
      fontSize: 24,
      color: colors.title,
    },
  });
};

export default createThemeStyles;
