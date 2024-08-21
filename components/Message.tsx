import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/app/helpers/themeContext";
import getChatThemeStyles from "@/app/helpers/getChatThemeStyles";

const Message = ({ item, id, isSender }) => {
  const { theme } = useTheme();
  const themeStyles = getChatThemeStyles(theme);

  return (
    <View
      key={id}
      style={
        isSender
          ? themeStyles.senderMessageContainer
          : themeStyles.receiverMessageContainer
      }
    >
      <Text
        style={
          isSender
            ? themeStyles.messageTextSender
            : themeStyles.messageTextReceiver
        }
      >
        {item}
      </Text>
    </View>
  );
};

export default Message;
