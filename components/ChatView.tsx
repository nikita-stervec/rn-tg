import { useTheme } from "@/app/helpers/themeContext";
import { TouchableOpacity, View, Text } from "react-native";
import getChatThemeStyles from "@/app/helpers/getChatsThemeStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ChatsStackParamList } from "@/app/stack/ChatsStack"; // Путь к вашему файлу навигации

interface ChatItem {
  id: string;
  name: string;
}

type ChatViewNavigationProp = StackNavigationProp<ChatsStackParamList, "Chats">;
type ChatViewRouteProp = RouteProp<ChatsStackParamList, "Chats">;

interface ChatViewProps {
  item: ChatItem;
  navigation: ChatViewNavigationProp;
  route?: ChatViewRouteProp;
}

export const ChatView = ({ item, navigation, route }: ChatViewProps) => {
  const { theme } = useTheme();
  const styles = getChatThemeStyles(theme);

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("Chat", {
          chatId: item.id,
          chatName: item.name,
        })
      }
    >
      <View style={styles.chatAvatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatLastMessage}>Last message...</Text>
      </View>
    </TouchableOpacity>
  );
};
