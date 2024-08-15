import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/helpers/themeContext";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { setAuthenticated } from "@/store/slices/authSlice";
import { auth } from "@/firebase";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userTag, setUserTag] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const handleRedirect = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
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
      .catch(err => console.error(err));
  };

  const getThemeStyles = () => {
    return {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
      },
      link: {
        color: theme === "dark" ? "#3366FF" : "blue",
        marginTop: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: theme === "dark" ? "#fff" : "#000",
      },
      input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: theme === "dark" ? "#333" : "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      },
      button: {
        width: "80%",
        backgroundColor: theme === "dark" ? "#3366FF" : "#007AFF",
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 20,
      },
      buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
      },
    };
  };

  const themeStyles = getThemeStyles();

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.title}>Register</Text>
      <TextInput
        style={themeStyles.input}
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize='none'
        keyboardType='email-address'
        placeholderTextColor={theme === "dark" ? "#aaa" : "#888"}
      />
      <TextInput
        style={themeStyles.input}
        placeholder='User Tag'
        value={userTag}
        onChangeText={text => setUserTag(text)}
        autoCapitalize='none'
        placeholderTextColor={theme === "dark" ? "#aaa" : "#888"}
      />
      <TextInput
        style={themeStyles.input}
        placeholder='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor={theme === "dark" ? "#aaa" : "#888"}
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
