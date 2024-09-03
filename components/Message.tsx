import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/app/styles/themeContext";
import createThemeStyles from "@/app/styles/getChatThemeStyles";

interface MessageProps {
  id: string;
  text: string;
  sender: boolean;
  createdAt: Date;
}

export const Message = ({ id, text, sender, createdAt }: MessageProps) => {
  const { theme } = useTheme();
  const styles = createThemeStyles(theme);

  return (
    <View
      style={
        sender ? styles.senderMessageContainer : styles.receiverMessageContainer
      }
    >
      <Text
        style={sender ? styles.messageTextSender : styles.messageTextReceiver}
      >
        {text}
      </Text>
      <Text style={styles.messageTime}>
        {new Date(createdAt).toLocaleTimeString()}
      </Text>
    </View>
  );
};
