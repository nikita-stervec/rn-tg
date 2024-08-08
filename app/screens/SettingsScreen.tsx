import React, { useLayoutEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native";
import { ThemeContext } from "@/helpers/themeContext";
import createThemeStyles from "@/helpers/themeStyles";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";

const SettingsScreen: React.FC = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeStyles = createThemeStyles(theme);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Entypo
          name='menu'
          size={24}
          color={theme === "dark" ? "white" : "black"}
          style={{ marginLeft: 10 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
    });
  }, [theme, navigation]);

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.text}>YOO Settings</Text>

      <View>
        <Text style={themeStyles.title}>Switch Color Theme</Text>
        <Button title={"theme"} onPress={toggleTheme} />
      </View>

      <View>
        <Text style={themeStyles.title}>Switch Chat Theme</Text>
        <Button title={"theme"} onPress={() => alert(theme)} />
      </View>
    </View>
  );
};

export { SettingsScreen };
