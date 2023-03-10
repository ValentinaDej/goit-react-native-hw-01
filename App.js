import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

const authStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </authStack.Navigator>
    </NavigationContainer>
  );
}
