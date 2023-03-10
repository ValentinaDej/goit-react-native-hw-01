import React from "react";
import {
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PostsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Posts</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.logout}
      >
        <Image
          style={styles.logoutIcon}
          source={require("../../assets/images/log-out.png")}
        />
      </TouchableOpacity>

      <View style={styles.form}>
        <Text>Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0,
    ...Platform.select({
      ios: { shadowOpacity: 0.3 },
      android: { elevation: 1 },
    }),
  },
  headerText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    marginTop: 60,
    marginBottom: 15,
  },
  form: {
    marginHorizontal: 16,
    flex: 1,
  },
  logout: {
    position: "relative",
    top: -40,
    left: 340,
    width: 50,
    height: 50,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
});

export default PostsScreen;
