import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTheme } from "@/app/styles/themeContext";
import getChatThemeStyles from "@/app/styles/getChatThemeStyles";
import { Message } from "@/components/Message";
import firestore from "@react-native-firebase/firestore";
import { sendMessage, getMessages } from "@/app/helpers/userActions";
import { getUserTag } from "@/app/helpers/authHelper";
import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { IMessage } from "@/types/types";

type ChatsStackParamList = {
  Chat: {
    chatName: string;
    chatId: string;
    userAvatar: string;
    participants: string[];
  };
};

interface ChatScreenProps {
  route: RouteProp<ChatsStackParamList, "Chat">;
  navigation: NavigationProp<ChatsStackParamList, "Chat">;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  route,
  navigation,
}) => {
  const { chatName, chatId, userAvatar, participants } = route.params;

  const { theme } = useTheme();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userTag, setUserTag] = useState<string | null>(null);
  const themeStyles = getChatThemeStyles(theme);
  const flatListRef = useRef<FlatList<IMessage>>(null);
  const styles = getChatThemeStyles(theme);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatName,
      headerTitleAlign: "center",
      headerRight: () => (
        // <Image source={{ uri: userAvatar }} style={styles.avatar} />
        <Text>ava</Text>
      ),
    });
  }, [navigation, chatName, userAvatar]);

  useEffect(() => {
    const fetchUserTag = async () => {
      const tag = await getUserTag();
      if (tag) {
        setUserTag(tag);
      }
    };

    fetchUserTag();
  }, []);

  useEffect(() => {
    if (!userTag) return;

    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(chatId, userTag);
      setMessages(fetchedMessages);
    };

    fetchMessages();

    const unsubscribe = firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot(snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            senderTag: data.senderTag,
            sender: data.senderTag === userTag,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });
        setMessages(fetchedMessages);
      });

    return () => unsubscribe();
  }, [chatId, userTag]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && userTag) {
      const updatedParticipants = participants.includes(userTag)
        ? participants
        : [...participants, userTag];

      sendMessage(
        chatId,
        { text: message, senderTag: userTag },
        updatedParticipants
      )
        .then(() => {
          setMessage("");
        })
        .catch(error => {
          console.error("Error sending message:", error);
        });
    } else {
      console.error("Message text and senderTag are required");
    }
  };
  const isSendButtonDisabled = !message.trim() || !userTag;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Message
            id={item.id}
            text={item.text}
            sender={item.sender}
            createdAt={item.createdAt}
          />
        )}
        style={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder='Type a message'
          placeholderTextColor={themeStyles.placeholderTextColor.color}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            isSendButtonDisabled && styles.disabledSendButton,
          ]}
          onPress={handleSendMessage}
          disabled={isSendButtonDisabled}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
