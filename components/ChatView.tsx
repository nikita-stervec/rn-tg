import { useTheme } from "@/app/styles/themeContext";
import { TouchableOpacity, View, Text } from "react-native";
import getChatThemeStyles from "@/app/styles/getChatsThemeStyles";
import { ChatItem } from "@/types/types";

interface ChatViewProps {
  item: ChatItem;
  onPress: (
    chatId: string,
    chatName: string,
    userAvatar: string,
    participants: string[]
  ) => void;
}

export const ChatView = ({ item, onPress }: ChatViewProps) => {
  const { theme } = useTheme();
  const styles = getChatThemeStyles(theme);

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => {
        onPress(item.id, item.name, item.avatar, [item.id]);
      }}
    >
      <View style={styles.chatAvatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};
