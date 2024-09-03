import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  searchUserByTag,
  getOrCreatePrivateChat,
} from "@/app/helpers/userActions";
import { useNavigation } from "@react-navigation/native";
import { ChatsStackParamList } from "@/app/stack/ChatsStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "@/app/styles/themeContext";
import getChatThemeStyles from "@/app/styles/getChatThemeStyles";
import { getUserTag } from "@/app/helpers/authHelper";
import { SearchResultItem } from "@/components/SeacrhResultItem";

type SearchScreenNavigationProp = StackNavigationProp<
  ChatsStackParamList,
  "Search"
>;

import { IUser } from "@/types/types";
import { getIconColor } from "../styles/getIconColor";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUserTag, setCurrentUserTag] = useState<string | null>(null);
  const [fetchingUserTag, setFetchingUserTag] = useState(true);
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const { theme } = useTheme();
  const themeStyles = getChatThemeStyles(theme);
  const setIconColor = getIconColor(theme);

  useEffect(() => {
    const fetchCurrentUserTag = async () => {
      const tag = await getUserTag();
      setCurrentUserTag(tag);
      setFetchingUserTag(false);
    };
    fetchCurrentUserTag();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const foundUsers: IUser[] = await searchUserByTag(query);
    setSearchResults(foundUsers);
    setLoading(false);
  };

  const handleUserSelect = async (user: IUser) => {
    if (currentUserTag === null) {
      console.error("Current user tag is not available");
      return;
    }
    const chatId = await getOrCreatePrivateChat(currentUserTag, user.tag);
    if (chatId) {
      navigation.navigate("Chat", {
        chatId: chatId,
        chatName: user.name,
        userAvatar: user.avatar || "",
        participants: [currentUserTag, user.tag],
      });
    }
  };

  if (fetchingUserTag) {
    return (
      <View style={themeStyles.container}>
        <ActivityIndicator size='large' color={setIconColor} />
      </View>
    );
  }

  return (
    <View style={themeStyles.container}>
      <View style={themeStyles.searchContainer}>
        <TextInput
          style={[
            themeStyles.input,
            { color: themeStyles.placeholderTextColor.color },
          ]}
          placeholder='Search'
          placeholderTextColor={themeStyles.placeholderTextColor.color}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Entypo
          name='magnifying-glass'
          size={24}
          color={setIconColor}
          onPress={() => handleSearch(searchQuery)}
          style={{ marginRight: 10 }}
        />
      </View>
      {loading ? (
        <ActivityIndicator size='large' color={setIconColor} />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SearchResultItem user={item} onSelect={handleUserSelect} />
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;
