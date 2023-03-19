import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { Feather } from "@expo/vector-icons";

import CreatePostsScreen from "../../Screens/HomeScreen/CreatePostsScreen";
import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../../Screens/HomeScreen/ProfileScreen";

const mainTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <mainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex", height: 70 }, null],
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "grid";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          const iconColor = focused ? "#FF6C00" : color;

          return <Feather name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <mainTab.Screen name="Home" component={HomeNavigator} />
      <mainTab.Screen
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
