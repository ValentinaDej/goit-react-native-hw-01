import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { Feather } from "@expo/vector-icons";

import CreatePostsScreen from "../../Screens/MainScreen/CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "../../Screens/MainScreen/ProfileScreen";

const mainTab = createBottomTabNavigator();

const BottomTabNavigator = ({ state, descriptors, navigation }) => {
  // const data = { name: "John", age: 30 };
  // const newPost = Math.floor(Math.random() * 1000) + 1;
  return (
    <mainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex", height: 70 }, null],
        initialRouteName: "Posts",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          const iconColor = focused ? "#FF6C00" : color;

          return <Feather name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <mainTab.Screen
        name="Posts"
        component={PostsScreen}
        // initialParams={{ itemId: 42 }}
      />
      <mainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <Image
                style={{
                  width: 70,
                  height: 40,
                  marginBottom: 20,
                }}
                source={require("../../assets/icons/new.png")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <mainTab.Screen name="Profile" component={ProfileScreen} />
    </mainTab.Navigator>
  );
};

export default BottomTabNavigator;
