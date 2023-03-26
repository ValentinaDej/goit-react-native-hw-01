import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";

import { authSignOut } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOut());
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/images/PhotoBG.jpg")}
      >
        <View style={styles.wrapperForm}>
          <View style={styles.avatarWrapper}>
            <Image source={require("../../assets/images/frame.png")} />
            <Feather
              name="plus-circle"
              size={25}
              color="#BDBDBD"
              style={styles.addAvatar}
            />
          </View>

          <View style={styles.header}>
            <View style={styles.headerContainer}></View>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={signOut}
              style={styles.icon}
            />
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.title}>USER NAME</Text>
            </View>
            <View style={{ marginTop: 32, alignItems: "center" }}>
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
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapperForm: {
    marginTop: 150,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingBottom: 14,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    paddingLeft: 16,
  },
  icon: {
    marginLeft: "auto",
    paddingRight: 16,
  },
  form: {
    marginHorizontal: 16,
  },
  avatarWrapper: {
    position: "absolute",
    zIndex: 120,
    top: -60,
  },
  addAvatar: {
    position: "absolute",
    bottom: 16,
    left: "90%",
    transform: [{ rotate: "45deg" }],
  },
  title: {
    marginTop: 92,
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontWeight: 500,
  },
});

export default ProfileScreen;
