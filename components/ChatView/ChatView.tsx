import { useTheme } from "@/helpers/themeContext";
import { TouchableOpacity, View, Text } from "react-native";
import getChatThemeStyles from "@/helpers/getChatsThemeStyles";

export const ChatView = ({ item, navigation }) => {
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
