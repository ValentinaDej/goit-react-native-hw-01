import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigtor from "../src/Routers/AuthStack";
import { authStateChanged } from "../src/redux/auth/authOperations";

const Main = () => {
  const { stateChanged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //console.log("stateChanged", stateChanged);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  const routing = AppNavigtor(stateChanged);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
