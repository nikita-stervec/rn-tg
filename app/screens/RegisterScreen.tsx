import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { setAuthenticated } from "@/store/slices/authSlice";
import auth from "@react-native-firebase/auth";
import getThemeStyles from "@/app/helpers/getThemeStyles";
import { useTheme } from "@/app/helpers/themeContext";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Chats: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [userTag, setUserTag] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const handleRedirect = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    if (!email || !userTag || !password) {
      setError("All fields are required");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          dispatch(
            setUser({
              tag: userTag,
              email: user.email,
              id: user.uid,
              name: user.displayName || undefined,
              avatar: user.photoURL || undefined,
            })
          );
          dispatch(setAuthenticated(true));
        } else {
          setError("User is null");
        }
      })
      .catch(err => {
        setError(err.message);
        console.error(err);
      });
  };

  const themeStyles = getThemeStyles(theme);

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.title}>Register</Text>
      {error ? <Text style={themeStyles.errorText}>{error}</Text> : null}
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
        placeholder='User Tag'
        value={userTag}
        onChangeText={text => setUserTag(text)}
        autoCapitalize='none'
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
      <TouchableOpacity style={themeStyles.button} onPress={handleRegister}>
        <Text style={themeStyles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRedirect()}>
        <Text style={themeStyles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
