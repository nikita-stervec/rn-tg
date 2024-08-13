import * as React from "react";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "./screens/AccountScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ChatsStack } from "./stack/ChatsStack";
import { ThemeProvider, useTheme } from "@/helpers/themeContext";
import {
  lightNavigationTheme,
  darkNavigationTheme,
} from "@/helpers/navigationTheme";
import Entypo from "@expo/vector-icons/Entypo";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { Provider } from "react-redux";
import store from "@/store/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setAuthenticated } from "@/store/slices/authSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "@/firebase";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { email: userEmail } = useSelector(
    (state: RootState) => state.user.user?.email
  );
  const { theme } = useTheme();

  const getIconColor = () => (theme === "dark" ? "white" : "black");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(false));
      }
    });
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <NavigationContainer
        independent={true}
        theme={theme === "dark" ? darkNavigationTheme : lightNavigationTheme}
      >
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        independent={true}
        theme={theme === "dark" ? darkNavigationTheme : lightNavigationTheme}
      >
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#f2f2f2",
            },
            drawerInactiveTintColor: getIconColor(),
            drawerActiveTintColor: "#3366FF",
            drawerActiveBackgroundColor:
              theme === "dark" ? "#333333" : "#e6e6e6",
            gestureHandlerProps: {
              minPointers: 1,
              maxPointers: 1,
              activeOffsetX: [-20, 20],
              failOffsetY: [-10, 10],
              hitSlop: { left: 100 },
            },
          }}
        >
          <Drawer.Screen
            name={email ? email : "My account"}
            component={AccountScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Entypo name='user' size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name='Chats'
            component={ChatsStack}
            options={{
              headerShown: false,
              drawerIcon: ({ color }) => (
                <Entypo name='chat' size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name='Settings'
            component={SettingsScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Entypo name='cog' size={24} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
