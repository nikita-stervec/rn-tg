import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/helpers/themeContext";
import createThemeStyles from "@/helpers/themeStyles";

export const ChatScreen = ({ route }) => {
  const { chatName } = route.params;
  const { theme } = useTheme();
  const themeStyles = createThemeStyles(theme);

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.text}>Chat w/ {chatName}</Text>
    </View>
  );
};
