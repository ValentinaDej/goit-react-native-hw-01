import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";

import CreatePostsScreen from "./Screens/HomeScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/HomeScreen/ProfileScreen";

import DefaultScreenPosts from "./Screens/NestedScreens/DefaultScreenPosts";
import MapScreen from "./Screens/NestedScreens/MapScreen";
import CommentsScreen from "./Screens/NestedScreens/CommentsScreen";

const authStack = createStackNavigator();
const AppNavigtor = (isAuth) => {
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
        <authStack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={MainNavigator}
        />
      </authStack.Navigator>
    );
  }
  return <MainNavigator />;
};

const MainStack = createStackNavigator();
function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Posts"
        component={PostTabs}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function PostTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex", height: 70 }, null],
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "DefaultScreen") {
            iconName = "grid";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          const iconColor = focused ? "#FF6C00" : color;

          return <Feather name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name="DefaultScreen" component={DefaultScreenPosts} />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          unmountOnBlur: true,
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <Image
                style={{
                  width: 70,
                  height: 40,
                  marginBottom: 20,
                }}
                source={require("./assets/icons/new.png")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigtor;
