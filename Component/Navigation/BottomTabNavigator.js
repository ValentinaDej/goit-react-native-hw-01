import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";

import CreatePostsScreen from "../../Screens/MainScreen/CreatePostsScreen";
import PostsScreen from "../../Screens/MainScreen/PostsScreen";
import ProfileScreen from "../../Screens/MainScreen/ProfileScreen";

const mainTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <mainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex", height: 70 }, null],
        //tabBarActiveBackgroundColor: "#F6F6F6",
      }}
    >
      <mainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <Image
                style={{ width: 40, height: 40, marginBottom: 10 }}
                source={require("../../assets/icons/grid.png")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <mainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <Image
                style={{
                  width: 70,
                  height: 40,
                  marginBottom: 10,
                }}
                source={require("../../assets/icons/new.png")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <mainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 10,
                }}
                source={require("../../assets/icons/user.png")}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </mainTab.Navigator>
  );
};

export default BottomTabNavigator;
