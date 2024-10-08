import * as React from "react";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "./screens/AccountScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ChatsStack } from "./stack/ChatsStack";
import { ThemeProvider, useTheme } from "@/app/helpers/themeContext";
import {
  lightNavigationTheme,
  darkNavigationTheme,
} from "@/app/helpers/navigationTheme";
import Entypo from "@expo/vector-icons/Entypo";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { Provider } from "react-redux";
import store from "@/store/store";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setAuthenticated } from "@/store/slices/authSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import getThemeStyles from "@/app/helpers/getThemeStyles";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const email = useSelector((state: RootState) => state.user.user?.email);
  const name = useSelector((state: RootState) => state.user.user?.name);
  const { theme } = useTheme();

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

  const emailCutter = (email: string | undefined): string => {
    if (email === undefined) {
      return "";
    }
    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
      return email;
    }
    return email.slice(0, atIndex);
  };

  const cuttedEmail = emailCutter(email);

  const themeStyles = getThemeStyles(theme);

  const getIconColor = () => (theme === "dark" ? "white" : "black");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        independent={true}
        theme={theme === "dark" ? darkNavigationTheme : lightNavigationTheme}
      >
        {isAuthenticated ? (
          <Drawer.Navigator
            initialRouteName='Chats'
            screenOptions={{
              headerShadowVisible: false,
              drawerStyle: {
                backgroundColor: themeStyles.container.backgroundColor,
              },
              drawerInactiveTintColor: getIconColor(),
              drawerActiveTintColor: "#3366FF",
              drawerActiveBackgroundColor:
                themeStyles.container.backgroundColor,
              gestureHandlerProps: {
                minPointers: 1,
                maxPointers: 1,
                activeOffsetX: [-20, 20],
                failOffsetY: [-10, 10],
                hitSlop: { left: 100 },
              },
              headerStyle: {
                backgroundColor: themeStyles.container.backgroundColor,
              },
              headerTintColor: getIconColor(),
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerShown: false,
            }}
          >
            <Drawer.Screen
              name={name ? name : cuttedEmail || "My account"}
              component={AccountScreen}
              options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                  <Entypo name='user' size={24} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name='My Chats'
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
                headerShown: true,

                drawerIcon: ({ color }) => (
                  <Entypo name='cog' size={24} color={color} />
                ),
              }}
            />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName='Login'>
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
        )}
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
