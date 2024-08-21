import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@/app/helpers/themeContext";
import getSearchScreenStyles from "@/app/helpers/getSearchScreenStyles";

const SearchScreen = () => {
  const { theme } = useTheme();
  const themeStyles = getSearchScreenStyles(theme);

  return (
    <View style={themeStyles.container}>
      <TextInput
        style={[
          themeStyles.input,
          { color: themeStyles.placeholderTextColor.color },
        ]}
        placeholder='Search'
        placeholderTextColor={themeStyles.placeholderTextColor.color}
      />
    </View>
  );
};
export default SearchScreen;
