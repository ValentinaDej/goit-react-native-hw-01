import { createStackNavigator } from "@react-navigation/stack";

import PostTabs from "./PostTabs";
import MapScreen from "../Screens/NestedScreens/MapScreen";
import CommentsScreen from "../Screens/NestedScreens/CommentsScreen";

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
export default MainNavigator;
