import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import MainNavigator from "./MainStack";

const AuthStack = createStackNavigator();
const AppNavigtor = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Main" component={MainNavigator} />
      </AuthStack.Navigator>
    );
  }
  return <MainNavigator />;
};

export default AppNavigtor;
