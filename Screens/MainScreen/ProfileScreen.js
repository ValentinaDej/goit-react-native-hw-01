import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/images/PhotoBG.jpg")}
      >
        <View style={styles.avatarWrapper}>
          <Image source={require("../../assets/images/frame.png")} />
          <Image
            style={styles.addAvatar}
            source={require("../../assets/images/add.png")}
          />
        </View>

        <View style={styles.wrapperForm}>
          <View style={styles.form}>
            <View>
              <Text style={styles.title}>USER NAME</Text>
            </View>
            <View>
              <Text>Profile info</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
  wrapperForm: {
    height: 200,
    //padding: 100,
    //paddingBottom: 500,
    //paddingTop: 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    marginHorizontal: 16,
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
});

export default ProfileScreen;
