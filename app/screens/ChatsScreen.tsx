import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useTheme } from "@/app/styles/themeContext";
import getChatsScreenStyles from "@/app/styles/getChatsThemeStyles";
import { ChatView } from "@/components/ChatView";
import { useNavigation } from "@react-navigation/native";
import { getChatsWithUserMessages } from "@/app/helpers/userActions";
import { getUserId } from "@/app/helpers/authHelper";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChatsStackParamList } from "@/app/stack/ChatsStack";

type ChatsScreenNavigationProp = StackNavigationProp<
  ChatsStackParamList,
  "Chats"
>;

const ChatsScreen = () => {
  const { theme } = useTheme();
  const themeStyles = getChatsScreenStyles(theme);
  const navigation = useNavigation<ChatsScreenNavigationProp>();

  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    try {
      const userId = getUserId();
      if (userId) {
        const chats = await getChatsWithUserMessages(userId);
        setChats(chats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchChats();
    } finally {
      setRefreshing(false);
    }
  }, [fetchChats]);

  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    const unsubscribe = firestore()
      .collection("chats")
      .where("participants", "array-contains", userId)
      .onSnapshot((snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
        const chats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Record<string, unknown>),
        }));
        setChats(chats);
      });

    return () => unsubscribe();
  }, []);

  const handleChatPress = (
    chatId: string,
    chatName: string,
    userAvatar: string,
    participants: string[]
  ) => {
    navigation.navigate("Chat", {
      chatId,
      chatName,
      userAvatar,
      participants,
    });
  };

  return (
    <View style={themeStyles.container}>
      {loading && !refreshing ? (
        <ActivityIndicator size='large' color={themeStyles.textColor.color} />
      ) : (
        <FlatList
          data={chats}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ChatView item={item} onPress={handleChatPress} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[themeStyles.textColor.color]}
              tintColor={themeStyles.textColor.color}
            />
          }
        />
      )}
    </View>
  );
};

export default ChatsScreen;
