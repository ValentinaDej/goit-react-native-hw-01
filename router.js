import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";

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
    <mainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex" }, null],
      }}
    >
      <mainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              //   <TouchableOpacity>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("./assets/icons/grid.png")}
              />
              //   </TouchableOpacity>
            );
          },
        }}
      />
      <mainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              //   <TouchableOpacity>
              <Image
                style={{ width: 70, height: 40 }}
                source={require("./assets/icons/new.png")}
              />
              //   </TouchableOpacity>
            );
          },
        }}
      />
      <mainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              //   <TouchableOpacity>
              <Image
                style={{ width: 40, height: 40 }}
                source={require("./assets/icons/user.png")}
              />
              /* </TouchableOpacity> */
            );
          },
        }}
      />
    </mainTab.Navigator>
  );
};

export default useRoute;

//   <Image source={require("../../assets/images/frame.png")} />
//  return (
//    <Image
//      style={{ width: 10, height: 10 }}
//      source={require("../../assets/svg/grid.svg")}
//    />
//  );
