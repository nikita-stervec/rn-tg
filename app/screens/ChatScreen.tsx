import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/helpers/themeContext";
import createThemeStyles from "@/helpers/themeStyles";
import getChatThemeStyles from "@/helpers/getChatThemeStyles";

export const ChatScreen = ({ route }) => {
  const { chatName } = route.params;
  const { theme } = useTheme();
  const themeStyles = getChatThemeStyles(theme);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.text}>Chat w/ {chatName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={themeStyles.message}>{item}</Text>
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
