import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatsScreen from "../screens/ChatsScreen";
import { ChatScreen } from "../screens/ChatScreen";
import SearchScreen from "../screens/SearchScreen";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "../styles/themeContext";
import { RouteProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { getIconColor } from "../styles/getIconColor";

export type ChatsStackParamList = {
  Chats: undefined;
  Chat: {
    chatId: string;
    chatName: string;
    userAvatar: string;
    participants: string[];
  };
  Search: undefined;
};

export type ChatsNavigationProp = StackNavigationProp<
  ChatsStackParamList,
  "Chats"
>;

export type ChatNavigationProp = StackNavigationProp<
  ChatsStackParamList,
  "Chat"
>;

export type SearchNavigationProp = StackNavigationProp<
  ChatsStackParamList,
  "Search"
>;

const Stack = createStackNavigator<ChatsStackParamList>();

const ChatsScreenOptions = ({
  navigation,
}: {
  navigation: StackNavigationProp<ChatsStackParamList, "Chats">;
}): StackNavigationOptions => {
  const { theme } = useTheme();
  const setIconColor = getIconColor(theme);

  return {
    headerTitle: "Chats",
    headerLeft: () => (
      <Entypo
        name='menu'
        size={24}
        color={setIconColor}
        onPress={() => navigation.openDrawer()}
        style={{ marginLeft: 10 }}
      />
    ),
    headerRight: () => (
      <Entypo
        name='magnifying-glass'
        size={24}
        color={setIconColor}
        onPress={() => navigation.navigate("Search")}
        style={{ marginRight: 10 }}
      />
    ),
  };
};

const ChatScreenOptions = ({
  route,
}: {
  route: RouteProp<ChatsStackParamList, "Chat">;
}): StackNavigationOptions => {
  return {
    headerShown: true,
    title: route.params.chatName,
  };
};

const SearchScreenOptions: StackNavigationOptions = {
  headerTitle: "Search",
};

export const ChatsStack = () => {
  return (
    <Stack.Navigator initialRouteName='Chats'>
      <Stack.Screen
        name='Chats'
        component={ChatsScreen}
        options={ChatsScreenOptions}
      />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={ChatScreenOptions}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={SearchScreenOptions}
      />
    </Stack.Navigator>
  );
};
