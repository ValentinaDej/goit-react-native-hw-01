import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import RegistrationScreen from "../../Screens/Auth/RegistrationScreen";
import LoginScreen from "../../Screens/Auth/LoginScreen";

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
          component={BottomTabNavigator}
        />
      </authStack.Navigator>
    );
  }
  return <BottomTabNavigator />;
};

export default AppNavigtor;
