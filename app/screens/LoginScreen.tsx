import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { setAuthenticated } from "@/store/slices/authSlice";
import auth from "@react-native-firebase/auth";
import { useTheme } from "@/app/styles/themeContext";
import getThemeStyles from "@/app/styles/getThemeStyles";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Chats: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const themeStyles = getThemeStyles(theme);

  const handleRedirect = () => {
    navigation.navigate("Register");
  };

  const handleLogin = (email: string, pass: string) => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(({ user }) => {
        if (user) {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              tag: null,
              name: user.displayName || undefined,
              avatar: user.photoURL || undefined,
            })
          );
          dispatch(setAuthenticated(true));
        } else {
          alert("User is null");
        }
      })
      .catch(() => alert("Wrong Email or Password"));
  };

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.title}>Login</Text>
      <TextInput
        style={themeStyles.input}
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize='none'
        keyboardType='email-address'
        placeholderTextColor={themeStyles.placeholderTextColor.color}
      />
      <TextInput
        style={themeStyles.input}
        placeholder='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor={themeStyles.placeholderTextColor.color}
      />
      <TouchableOpacity
        style={themeStyles.button}
        onPress={() => handleLogin(email, password)}
      >
        <Text style={themeStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRedirect()}>
        <Text style={themeStyles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};
