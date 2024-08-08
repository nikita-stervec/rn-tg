import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/helpers/themeContext";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";
import createThemeStyles from "@/helpers/themeStyles";

export const AccountScreen = ({ navigation }) => {
  const { theme } = useTheme();
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={themeStyles.text}>YOO acc</Text>
    </View>
  );
};
