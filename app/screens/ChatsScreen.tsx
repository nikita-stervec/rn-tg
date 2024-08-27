import { ChatView } from "@/components/ChatView";
import { useTheme } from "@/app/helpers/themeContext";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
}

type DrawerParamList = {
  Chats: undefined;
  Settings: undefined;
  [key: string]: undefined | { screen: string };
};

type ChatsScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "Chats">;

interface ChatsScreenProps {
  navigation: ChatsScreenNavigationProp;
}

export const ChatsScreen = ({ navigation }: ChatsScreenProps) => {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({}) => (
        <Entypo
          name='menu'
          size={24}
          color={theme === "dark" ? "white" : "black"}
          style={{ marginLeft: 10 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
    });
  }, [theme]);

  const chats: ChatItem[] = [{ id: "1", name: "John Doe", lastMessage: "123" }];

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatView item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
