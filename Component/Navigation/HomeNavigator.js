import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../../Screens/HomeScreen/PostsScreen";
import CommentsScreen from "../../Screens/NestedScreens/CommentsScreen";
import MapScreen from "../../Screens/NestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const HomeNavigator = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={PostsScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default HomeNavigator;
