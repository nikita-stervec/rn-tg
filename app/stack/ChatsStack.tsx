import { createStackNavigator } from "@react-navigation/stack";
import { ChatsScreen } from "../screens/ChatsScreen";
import { ChatScreen } from "../screens/ChatScreen";

export type ChatsStackParamList = {
  Chats: undefined;
  Chat: { chatId: string; chatName: string };
};

const Stack = createStackNavigator<ChatsStackParamList>();

export const ChatsStack = () => {
  return (
    <Stack.Navigator initialRouteName='Chats'>
      <Stack.Screen name='Chats' component={ChatsScreen} />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ navigation, route }) => ({
          headerShown: true,
          drawerIcon: () => null,
          drawerLabel: () => null,
          gestureEnabled: true,
        })}
      />
    </Stack.Navigator>
  );
};
