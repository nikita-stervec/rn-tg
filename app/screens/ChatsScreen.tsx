import { useTheme } from "@/helpers/themeContext";
import { RootState } from "@/store/store";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export const ChatsScreen = ({ navigation }) => {
  const { user } = useSelector((state: RootState) => state.user);
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

  const chats = [
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
