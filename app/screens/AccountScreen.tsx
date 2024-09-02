import React, { useLayoutEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/app/helpers/themeContext";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions } from "@react-navigation/native";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "@/store/slices/authSlice";
import { clearUser, setName } from "@/store/slices/userSlice";
import getThemeStyles from "@/app/helpers/getThemeStyles";
import { DrawerNavigationProp } from "@react-navigation/drawer";

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
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Entypo
          name='menu'
          size={24}
          color={theme === "dark" ? "white" : "black"}
          style={{ marginLeft: 10 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
    });
  }, [theme, navigation]);

  const handleNameChange = (text: string) => {
    setNameState(text);
  };

  const handleApplyName = () => {
    dispatch(setName(name));
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
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
          <Text style={themeStyles.text}>logout</Text>
          <TouchableOpacity style={themeStyles.button} onPress={handleSignOut}>
            <Text style={themeStyles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
