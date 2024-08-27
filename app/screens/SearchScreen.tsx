import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "@/app/helpers/themeContext";
import getSearchScreenStyles from "@/app/helpers/getSearchScreenStyles";
import { Entypo } from "@expo/vector-icons";
import { ChatView } from "@/components/ChatView";
import { useNavigation } from "@react-navigation/native";
import { searchUserByTag } from "@/app/helpers/userActions";

const SearchScreen = () => {
  const { theme } = useTheme();
  const themeStyles = getSearchScreenStyles(theme);
  const navigation = useNavigation();

  const color = theme === "dark" ? "white" : "black";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const results = await searchUserByTag(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

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
          color={color}
          onPress={() => handleSearch(searchQuery)}
          style={{ marginRight: 10 }}
        />
      </View>
      {loading ? (
        <ActivityIndicator size='large' color={color} />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ChatView item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;
