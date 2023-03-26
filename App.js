import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import AppNavigtor from "./src/Routers/AuthStack";
import app from "./firebase/config";

export default function App() {
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const state = useSelector((state) => state);
  console.log(state);
  //useEffect(() => {}, []);
  const routing = AppNavigtor(null);

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
