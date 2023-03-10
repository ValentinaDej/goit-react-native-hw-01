import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ProfileScreen = ({ navigation }) => {
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
            source={require("../../assets/images/addGrey.png")}
          />
          <TouchableOpacity
            style={styles.logout}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Image
              source={require("../../assets/images/log-out.png")}
              styles={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.wrapperForm}>
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
    position: "relative",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapperForm: {
    flex: 1,
    alignItems: "center",
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
    left: "84%",
    top: "60%",
    transform: [{ rotate: "90deg" }],
    width: 40,
    height: 40,
  },
  logout: {
    position: "absolute",
    left: "170%",
    top: "67%",
    width: 50,
    height: 50,
  },
  logoutIcon: {
    width: 25,
    height: 25,
  },
  title: {
    marginTop: 92,
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontWeight: 500,
  },
});

export default ProfileScreen;
