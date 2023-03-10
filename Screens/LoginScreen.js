import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Image,
} from "react-native";
import { useFonts } from "expo-font";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataLogin, setDataLogin] = useState(initialState);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  function keyboardHide() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  function submitForm() {
    console.log(dataLogin);
    setDataRegistration(initialState);
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../assets/images/PhotoBG.jpg")}
        >
          <View
            style={{
              ...styles.wrapperForm,
              paddingBottom: isFocus.email || isFocus.password ? 40 : 111,
            }}
          >
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>Log in</Text>
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View>
                  <TextInput
                    keyboardType="email-address"
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocus({ ...isFocus, email: true });
                    }}
                    onBlur={() => {
                      setIsFocus({ ...isFocus, email: false });
                    }}
                    placeholder="e-mail"
                    value={dataLogin.email}
                    onChangeText={(value) =>
                      setDataLogin((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    style={{
                      ...styles.input,
                      borderColor: isFocus.email ? `#FF6C00` : `#E8E8E8`,
                    }}
                  />
                  <View>
                    <TextInput
                      onFocus={() => {
                        setIsShowKeyboard(true);
                        setIsFocus({ ...isFocus, password: true });
                      }}
                      onBlur={() => {
                        setIsFocus({ ...isFocus, password: false });
                      }}
                      placeholder="password"
                      maxLength={12}
                      value={dataLogin.password}
                      onChangeText={(value) =>
                        setDataLogin((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                      secureTextEntry={isSecureEntry}
                      style={{
                        ...styles.input,
                        borderColor: isFocus.password ? `#FF6C00` : `#E8E8E8`,
                        //  marginBottom: -50,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.statusPassword}
                      onPress={() => {
                        setIsSecureEntry((prevState) => !prevState);
                      }}
                    >
                      <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={submitForm}
                  style={styles.btn}
                >
                  <Text style={styles.textBtn}>Sign in</Text>
                </TouchableOpacity>
              )}
            </View>
            {!isShowKeyboard && (
              <TouchableOpacity>
                <Text style={styles.loginScreenLink}>
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    position: "relative",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    marginBottom: 32,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    padding: 10,
    marginTop: 16,
    color: "#BDBDBD",
  },
  wrapperForm: {
    paddingBottom: 111,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    marginHorizontal: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    marginBottom: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
  },
  loginScreenLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  statusPassword: {
    position: "absolute",
    top: "45%",
    left: "80%",
    color: "#1B4371",
    fontSize: 16,
  },
});
