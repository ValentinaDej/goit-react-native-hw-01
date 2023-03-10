import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";

import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";

import CreatePostsScreen from "./Screens/MainScreen/CreatePostsScreen";
import PostsScreen from "./Screens/MainScreen/PostsScreen";
import ProfileScreen from "./Screens/MainScreen/ProfileScreen";

const authStack = createStackNavigator();
const mainTab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <mainTab.Navigator>
        <mainTab.Screen name="Posts" component={PostsScreen} />
        <mainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
        <mainTab.Screen name="Profile" component={ProfileScreen} />
      </mainTab.Navigator>
    </NavigationContainer>
  );
}

/* <authStack.Navigator>
        <authStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <authStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </authStack.Navigator> */
