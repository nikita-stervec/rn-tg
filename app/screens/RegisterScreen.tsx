import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { setAuthenticated } from "@/store/slices/authSlice";
import auth from "@react-native-firebase/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userTag, setUserTag] = useState("");
  const [password, setPassword] = useState("");

  const handleRedirect = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    auth()
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='User Tag'
        value={userTag}
        onChangeText={text => setUserTag(text)}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRedirect()}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  link: {
    color: "blue",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
