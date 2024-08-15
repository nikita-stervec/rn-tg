import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000000",
    background: "#ffffff",
    card: "#ffffff",
    text: "#000000",
    border: "#000000",
  },
};

export const darkNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#ffffff",
    background: "#1e1e1e",
    card: "#1e1e1e",
    text: "#ffffff",
    border: "#ffffff",
  },
};
