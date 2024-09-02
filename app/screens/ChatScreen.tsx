import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTheme } from "@/app/helpers/themeContext";
import getChatThemeStyles from "@/app/helpers/getChatThemeStyles";

interface ChatScreenRouteParams {
  chatName: string;
}

interface Message {
  id: string;
  text: string;
}

export const ChatScreen = ({
  route,
}: {
  route: { params: ChatScreenRouteParams };
}) => {
  const { chatName } = route.params;
  const { theme } = useTheme();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const themeStyles = getChatThemeStyles(theme);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: new Date().toISOString(),
        text: message,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.text}>Chat w/ {chatName}</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={themeStyles.message}>{item.text}</Text>
        )}
        style={themeStyles.messagesContainer}
      />
      <View style={themeStyles.inputContainer}>
        <TextInput
          style={themeStyles.input}
          value={message}
          onChangeText={setMessage}
          placeholder='Type a message'
          placeholderTextColor={themeStyles.placeholderTextColor.color}
        />
        <TouchableOpacity style={themeStyles.sendButton} onPress={sendMessage}>
          <Text style={themeStyles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
