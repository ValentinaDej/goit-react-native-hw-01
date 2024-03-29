import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { storage, db } from "../../../firebase/config";

export default function CreatePostsScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [hasImagePickerPermission, setImagePickerPermission] = useState(null);
  const [haslocationPermission, setLocationPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataImage, setDataImage] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPlace, setDataPlace] = useState("");
  const [dataLocation, setDataLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();
      if (Platform.OS !== "web") {
        const imagePickerPermission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setImagePickerPermission(imagePickerPermission.status === "granted");
      }

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setLocationPermission(locationPermission.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      camera.stopRecording();
    }
  }, [isFocused]);

  // useFocusEffect(
  //   useCallback(() => {
  //     //getLocation();
  //   }, [])
  // );

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

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (hasMediaLibraryPermission === false) {
    return <Text>No access to gallery</Text>;
  }

  if (hasImagePickerPermission === false) {
    return <Text>No access to image picker</Text>;
  }

  if (haslocationPermission === false) {
    return <Text>No access to location</Text>;
  }

  function keyboardHide() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  const changeCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setDataImage(photo.uri);

    await MediaLibrary.createAssetAsync(photo.uri);
  };

  const downloadPhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setDataImage(result.assets[0].uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const sendPost = async () => {
    if (dataImage && dataDescription && dataPlace) {
      await uploadPostToServer();
      navigation.navigate("DefaultScreen");
      clearPost();
    }
  };

  const uploadPostToServer = async () => {
    let locationRes;
    setLoading(true);
    const photo = await uploadPhotoToServer();
    try {
      locationRes = await Location.getCurrentPositionAsync({});
    } catch (error) {}

    if (!locationRes) {
      locationRes = { coords: { latitude: 0, longitude: 0 } };
    }

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        description: dataDescription,
        place: dataPlace,
        location: {
          latitude: locationRes.coords.latitude,
          longitude: locationRes.coords.longitude,
        },
        userId,
        login,
        createdAt: Date.now().toString(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoading(false);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(dataImage);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    try {
      const storageRef = ref(storage, `postImage/${uniquePostId}`);
      await uploadBytes(storageRef, file);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log("error", error.code);
    }
  };

  const clearPhoto = () => {
    setDataImage("");
  };

  const clearPost = () => {
    clearPhoto();
    setDataDescription("");
    setDataPlace("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="#BDBDBD"
            onPress={() => {
              navigation.navigate("DefaultScreen");
            }}
            style={styles.icon}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Create post</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            {loading && (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#FF6C00" />
              </View>
            )}
            <View style={styles.cameraContainer}>
              <Camera
                ref={(ref) => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                resizeMode="cover"
              >
                <View style={styles.lastPhotoContainer}>
                  {dataImage && (
                    <Image
                      source={{ uri: dataImage }}
                      style={styles.lastPhoto}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={styles.iconCameraContainer}
                  onPress={takePhoto}
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
                <Text style={styles.editor}>Edit photo</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={downloadPhoto}>
                <Text style={styles.editor}>Download photo</Text>
              </TouchableOpacity>
            )}

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.textContainer}>
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

              <View style={{ ...styles.textContainer, marginBottom: 32 }}>
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
                  style={{
                    ...styles.btn,
                    backgroundColor:
                      dataImage && dataDescription && dataPlace
                        ? "#FF6C00"
                        : "#F6F6F6",
                    color:
                      dataImage && dataDescription && dataPlace
                        ? "#FFFFFF"
                        : "#BDBDBD",
                  }}
                >
                  <Text style={styles.text}>Send</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={clearPost} style={styles.trash}>
                  {/* <Feather name="trash-2" size={24} color="black" /> */}
                  <Image
                    style={styles.trashIcon}
                    source={require("../../assets/icons/trash.png")}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
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
    height: 240,
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
    justifyContent: "center",
    alignItems: "center",
  },
  editor: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "normal",
    padding: 10,
    paddingBottom: 32,
    paddingTop: 8,
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
    alignItems: "center",
    marginTop: 150,
    height: 60,
    marginBottom: 20,
  },
  activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 999,
  },
});
