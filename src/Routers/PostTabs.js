import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import DefaultScreenPosts from "../Screens/NestedScreens/DefaultScreenPosts";
import CreatePostsScreen from "../Screens/HomeScreen/CreatePostsScreen";
import ProfileScreen from "../Screens/HomeScreen/ProfileScreen";

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
                source={require("../assets/icons/new.png")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default PostTabs;
