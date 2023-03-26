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
import { useDispatch, useSelector } from "react-redux";

import { authSignUp } from "../../redux/auth/authOperations";
import authSlice from "../../redux/auth/authReducer";
import errorHandle from "../../services/errorHandle";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataRegistration, setDataRegistration] = useState(initialState);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isFocus, setIsFocus] = useState({
    login: false,
    email: false,
    password: false,
  });
  const { errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  function keyboardHide() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  function submitForm() {
    if (
      dataRegistration.email &&
      dataRegistration.login &&
      dataRegistration.password
    ) {
      dispatch(authSignUp(dataRegistration));
    } else {
      dispatch(
        authSlice.actions.authSetError({
          errorMessage: "Please fill in all fields.",
        })
      );
    }
  }

  function moveToLogin() {
    setDataRegistration(initialState);
    dispatch(authSlice.actions.authSetError({ errorMessage: "" }));
    navigation.navigate("Login");
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../assets/images/PhotoBG.jpg")}
        >
          <View style={styles.avatarWrapper}>
            <Image source={require("../../assets/images/frame.png")} />
            <Image
              style={styles.addAvatar}
              source={require("../../assets/icons/add.png")}
            />
          </View>

          <View style={styles.wrapperForm}>
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>Registration</Text>
              </View>
              {errorMessage ? <Text>{errorHandle(errorMessage)}</Text> : null}
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View>
                  <TextInput
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocus({ ...isFocus, login: true });
                    }}
                    onBlur={() => {
                      setIsFocus({ ...isFocus, login: false });
                    }}
                    placeholder="login"
                    value={dataRegistration.login}
                    onChangeText={(value) => {
                      setDataRegistration((prevState) => ({
                        ...prevState,
                        login: value,
                      }));
                    }}
                    autoComplete="off"
                    style={{
                      ...styles.input,
                      borderColor: isFocus.login ? `#FF6C00` : `#E8E8E8`,
                    }}
                    selectionColor="#BDBDBD"
                  />
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
                    value={dataRegistration.email}
                    onChangeText={(value) =>
                      setDataRegistration((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    style={{
                      ...styles.input,
                      borderColor: isFocus.email ? `#FF6C00` : `#E8E8E8`,
                    }}
                    selectionColor="#BDBDBD"
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
                      value={dataRegistration.password}
                      onChangeText={(value) =>
                        setDataRegistration((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                      secureTextEntry={isSecureEntry}
                      style={{
                        ...styles.input,
                        borderColor: isFocus.password ? `#FF6C00` : `#E8E8E8`,
                      }}
                      selectionColor="#BDBDBD"
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
                <Text style={styles.loginScreenLink} onPress={moveToLogin}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

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
    marginBottom: 27,
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
    paddingBottom: 45,
    paddingTop: 92,
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
  avatarWrapper: {
    left: "35%",
    top: "10%",
    zIndex: 100,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    left: "90%",
    top: "60%",
    width: 25,
    height: 25,
  },
  statusPassword: {
    position: "absolute",
    top: "45%",
    left: "80%",
    color: "#1B4371",
    fontSize: 16,
  },
});
