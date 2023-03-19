import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation, route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isNovigated, setIsNovigated] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataImage, setDataImage] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPlace, setDataPlace] = useState("");
  const [dataLocation, setDataLocation] = useState({
    latitude: "",
    longitude: "",
  });

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("tabPress", (e) => {
  //     console.log("Виконуєьтся при tabPress на CreatePostsScreen ");
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  //  console.log(route.params);

  //  useEffect(() => {
  //    console.log("Novigated from Posts");
  //    console.log(route.params);
  //    if (route.params) {
  //      //setPosts((prevState) => [...prevState, route.params]);
  //    }
  //  }, [route.params]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
    //  console.log("Виконуєьтся лише 1 раз");
  }, []);

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

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync(null);
      const location = await Location.getCurrentPositionAsync();
      // console.log(location.coords.latitude);
      // console.log(location.coords.longitude);
      setDataImage(photo.uri);
      setDataLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  const changeCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const sendPost = () => {
    navigation.navigate("Posts", {
      dataImage,
      dataDescription,
      dataPlace,
      dataLocation,
    });
  };

  const clearPhoto = () => {
    setDataImage("");
  };

  const clearPost = () => {
    clearPhoto();
    setDataDescription("");
    setDataPlace("");
    setDataLocation({ latitude: "", longitude: "" });
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="#BDBDBD"
            onPress={() => {
              navigation.navigate("Posts");
            }}
            style={styles.icon}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Create post</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
            >
              <View style={styles.lastPhotoContainer}>
                {dataImage && (
                  <Image source={{ uri: dataImage }} style={styles.lastPhoto} />
                )}
              </View>
              <TouchableOpacity
                style={styles.iconCameraContainer}
                onPress={takePicture}
              >
                <Feather name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconCameraFlipContainer}
                onPress={changeCameraType}
              >
                <Feather name="rotate-ccw" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          </View>

          {dataImage ? (
            <TouchableOpacity onPress={clearPhoto}>
              <Text style={{ ...styles.text, flex: 0 }}>Edit photo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Text style={{ ...styles.text, flex: 0 }}>Download photo</Text>
            </TouchableOpacity>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <TextInput
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                placeholder="Title..."
                value={dataDescription}
                onChangeText={(value) => {
                  setDataDescription(value);
                }}
                autoComplete="off"
                style={{
                  ...styles.text,
                  color: dataDescription ? `#212121` : `#BDBDBD`,
                  fontWeight: dataDescription ? `bold` : `normal`,
                }}
                selectionColor="#BDBDBD"
              />
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 32,
              }}
            >
              <TouchableOpacity>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TextInput
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                placeholder="Place..."
                maxLength={200}
                value={dataPlace}
                onChangeText={(value) => setDataPlace(value)}
                style={{
                  ...styles.text,
                  marginLeft: 5,
                  color: dataPlace ? "#212121" : "#BDBDBD",
                }}
                selectionColor="#BDBDBD"
              />
            </View>
          </KeyboardAvoidingView>

          {!isShowKeyboard && (
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={sendPost}
                style={styles.btn}
              >
                <Text style={styles.text}>Send</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={clearPost} style={styles.trash}>
                <Image
                  style={styles.trashIcon}
                  source={require("../../assets/images/trash.png")}
                />
                {/* <Feather name="trash-2" size={24} color="black" /> */}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    paddingRight: 16,
  },
  icon: {
    marginRight: "auto",
    paddingLeft: 16,
  },
  form: {
    marginHorizontal: 16,
    flex: 1,
    marginTop: 32,
  },
  cameraContainer: {
    //flex: 1,
    // justifyContent: "center",
  },
  fixedRatio: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
  },

  iconCameraContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    opacity: 0.5,
  },
  lastPhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  lastPhoto: {
    height: 240,
    width: "100%",
    resizeMode: "cover",
  },
  iconCameraFlipContainer: {
    position: "absolute",
    bottom: 0,
    left: "83%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    opacity: 0.5,
  },

  btn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    height: 50,
    marginBottom: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "normal",
    height: 50,
    padding: 10,
  },

  trash: {
    marginTop: 120,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  trashIcon: { height: 40, width: 70 },
});
