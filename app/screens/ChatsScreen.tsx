import { useTheme } from "@/helpers/themeContext";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "p2v0 pr1m3" },
  { id: "4", name: "zxcZXC" },
];

export const ChatsScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              navigation.navigate("Chat", {
                chatId: item.id,
                chatName: item.name,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};
