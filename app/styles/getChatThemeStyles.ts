import { StyleSheet } from "react-native";

function createThemeStyles(theme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: "#fff",
    },
    messagesContainer: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      marginRight: 10,
    },
    sendButton: {
      padding: 10,
      backgroundColor: "#007AFF",
      borderRadius: 20,
    },
    disabledSendButton: {
      backgroundColor: "#ccc",
    },
    sendButtonText: {
      color: "#fff",
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 10,
    },

    text: {
      fontSize: 16,
      color: theme === "dark" ? "#fff" : "#000",
    },

    messageContainer: {
      backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
      alignSelf: "flex-start",
      maxWidth: "80%",
    },
    senderMessageContainer: {
      backgroundColor: theme === "dark" ? "#3366FF" : "#007AFF",
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
      alignSelf: "flex-end",
      maxWidth: "80%",
    },
    receiverMessageContainer: {
      backgroundColor: theme === "dark" ? "#333" : "#e0e0e0",
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
      alignSelf: "flex-start",
      maxWidth: "80%",
    },
    messageTextSender: {
      fontSize: 14,
      color: theme === "dark" ? "#fff" : "#fff",
    },
    messageTextReceiver: {
      fontSize: 14,
      color: theme === "dark" ? "#fff" : "#000",
    },

    placeholderTextColor: {
      color: theme === "dark" ? "#aaa" : "#888",
    },

    chatAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme === "dark" ? "#333" : "#ccc",
    },

    messageTime: {
      fontSize: 12,
      color: theme === "dark" ? "#aaa" : "#888",
      marginTop: 4,
    },

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    userItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
    },
    userName: {
      fontSize: 16,
      color: theme === "dark" ? "white" : "black",
    },
    userTag: {
      fontSize: 14,
      color: "gray",
    },
  });
}

export default createThemeStyles;
