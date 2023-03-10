import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";

import CreatePostsScreen from "./Screens/MainScreen/CreatePostsScreen";
import PostsScreen from "./Screens/MainScreen/PostsScreen";
import ProfileScreen from "./Screens/MainScreen/ProfileScreen";

const authStack = createStackNavigator();
const mainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <authStack.Navigator>
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
      </authStack.Navigator>
    );
  }
  return (
    <mainTab.Navigator>
      <mainTab.Screen name="Posts" component={PostsScreen} />
      <mainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
      <mainTab.Screen name="Profile" component={ProfileScreen} />
    </mainTab.Navigator>
  );
};

export default useRoute;
