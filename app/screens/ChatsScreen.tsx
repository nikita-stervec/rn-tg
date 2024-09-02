import { ChatView } from "@/components/ChatView/ChatView";
import { useTheme } from "@/app/helpers/themeContext";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ChatItem {
  id: string;
  name: string;
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

  const chats: ChatItem[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "John Doe" },
    { id: "3", name: "John Doe" },
    { id: "4", name: "zxcZXC" },
    { id: "5", name: "alcoGramm" },
  ];

  return (
    <SafeAreaView>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatView item={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};
