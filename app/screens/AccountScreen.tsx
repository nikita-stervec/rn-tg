import React, { useLayoutEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/app/styles/themeContext";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "@/store/slices/authSlice";
import { clearUser, setName, setTag } from "@/store/slices/userSlice";
import getThemeStyles from "@/app/styles/getThemeStyles";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootState } from "@/store/store";
import { getIconColor } from "../styles/getIconColor";

type DrawerParamList = {
  Chats: undefined;
  Settings: undefined;
  [key: string]: undefined | { screen: string };
};

type AccountScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Chats"
>;

interface AccountScreenProps {
  navigation: AccountScreenNavigationProp;
}

export const AccountScreen = ({ navigation }: AccountScreenProps) => {
  const [name, setNameState] = useState("");
  const [userTag, setUserTagState] = useState("");
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const tag = useSelector((state: RootState) => state.user.user?.tag);
  const setIconColor = getIconColor(theme);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Entypo
          name='menu'
          size={24}
          color={setIconColor}
          style={{ marginLeft: 10 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
    });
  }, [theme, navigation]);

  const handleNameChange = (text: string) => {
    setNameState(text);
  };

  const handleTagChange = (text: string) => {
    setUserTagState(text);
  };

  const handleApplyName = () => {
    dispatch(setName(name));
  };

  const handleApplyTag = () => {
    dispatch(setTag(userTag));
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setAuthenticated(false));
        dispatch(clearUser());
      });
  };

  const themeStyles = getThemeStyles(theme);

  return (
    <View style={themeStyles.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 20,
        }}
      >
        <View style={themeStyles.secondaryContainer}>
          <Text style={themeStyles.title}>input your name</Text>
          <TextInput
            style={themeStyles.input}
            onChangeText={handleNameChange}
            value={name}
          />
          <TouchableOpacity
            style={themeStyles.button}
            onPress={handleApplyName}
          >
            <Text style={themeStyles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={themeStyles.secondaryContainer}>
          <Text style={themeStyles.text}>Your's Id: {userId}</Text>
        </View>

        <View style={themeStyles.secondaryContainer}>
          <Text style={themeStyles.title}>Your's Tag: {tag}</Text>
          <TextInput
            style={themeStyles.input}
            onChangeText={handleTagChange}
            value={userTag}
          />

          <TouchableOpacity style={themeStyles.button} onPress={handleApplyTag}>
            <Text style={themeStyles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={themeStyles.secondaryContainer}>
          <Text style={themeStyles.text}>logout</Text>
          <TouchableOpacity style={themeStyles.button} onPress={handleSignOut}>
            <Text style={themeStyles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
