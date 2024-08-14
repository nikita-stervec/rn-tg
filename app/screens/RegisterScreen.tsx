import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { setAuthenticated } from "@/store/slices/authSlice";
import { auth } from "@/firebase";
import getThemeStyles from "@/helpers/getThemeStyles";
import { useTheme } from "@/helpers/themeContext";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            tag: userTag,
            email: user.email,
            id: user.uid,
          })
        );
        dispatch(setAuthenticated(true));
        navigation.navigate("Chats");
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
