import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatsScreen } from "../screens/ChatsScreen";
import { ChatScreen } from "../screens/ChatScreen";
import SearchScreen from "../screens/SearchScreen";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "../helpers/themeContext";

export type ChatsStackParamList = {
  Chats: undefined;
  Chat: { chatId: string; chatName: string };
  Search: undefined;
};

const Stack = createStackNavigator<ChatsStackParamList>();

export const ChatsStack = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "white" : "black";

  return (
    <Stack.Navigator initialRouteName='Chats'>
      <Stack.Screen
        name='Chats'
        component={ChatsScreen}
        options={({ navigation }) => ({
          headerTitle: "Chats",
          headerLeft: () => (
            <Entypo
              name='menu'
              size={24}
              color={color}
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
          headerRight: () => (
            <Entypo
              name='magnifying-glass'
              size={24}
              color={color}
              onPress={() => navigation.navigate("Search")}
              style={{ marginRight: 10 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ navigation, route }) => ({
          headerShown: true,
          drawerIcon: () => null,
          drawerLabel: () => null,
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerTitle: "Search",
        }}
      />
    </Stack.Navigator>
  );
};
