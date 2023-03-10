import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import AppNavigtor from "./Component/Navigation/AppNavigtor";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const routing = AppNavigtor(null);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
