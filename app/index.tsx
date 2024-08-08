import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AccountScreen } from "./screens/AccountScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ChatsStack } from "./stack/ChatsStack";
import { ThemeProvider, useTheme } from "@/helpers/themeContext";
import {
  lightNavigationTheme,
  darkNavigationTheme,
} from "@/helpers/navigationTheme";
import Entypo from "@expo/vector-icons/Entypo";

const Drawer = createDrawerNavigator();

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  const getIconColor = () => (theme === "dark" ? "white" : "black");

  return (
    <NavigationContainer
      independent={true}
      theme={theme === "dark" ? darkNavigationTheme : lightNavigationTheme}
    >
      <Drawer.Navigator initialRouteName='Chats'>
        <Drawer.Screen
          name='My account'
          component={AccountScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Entypo name='user' size={24} color={getIconColor()} />
            ),
          }}
        />
        <Drawer.Screen
          name='Chats'
          component={ChatsStack}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Entypo name='chat' size={24} color={getIconColor()} />
            ),
          }}
        />
        <Drawer.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Entypo name='cog' size={24} color={getIconColor()} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
