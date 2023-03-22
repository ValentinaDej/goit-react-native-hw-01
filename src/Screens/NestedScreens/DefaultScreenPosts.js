import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Posts</Text>
        </View>
        <Feather
          name="log-out"
          size={24}
          color="#BDBDBD"
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.icon}
        />
      </View>

      <View style={styles.form}>
        <View style={styles.userContainer}>
          <Text>User info</Text>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image
                source={{ uri: item.dataImage }}
                style={styles.postImage}
              />
              <Text style={styles.postDescription}>{item.dataDescription}</Text>
              <View style={styles.comentCommonContainer}>
                <TouchableOpacity
                  style={styles.comentContainer}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      screenOptions: { tabBarStyle: { display: "none" } },
                    })
                  }
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={styles.comentIcon}
                  />
                  <Text style={styles.comentText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.comentContainer}
                  onPress={() => {
                    const location = item.dataLocation;
                    const description = item.dataDescription;
                    return navigation.navigate("Map", {
                      location,
                      description,
                    });
                  }}
                >
                  <Feather
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                    style={styles.comentIcon}
                  />
                  <Text style={styles.comentPlace}>{item.dataPlace}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

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
    paddingLeft: 16,
  },
  icon: {
    marginLeft: "auto",
    paddingRight: 16,
  },
  form: {
    marginHorizontal: 16,
    flex: 1,
    marginTop: 32,
  },
  userContainer: {
    marginBottom: 32,
  },
  postContainer: {
    marginBottom: 32,
  },
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  postDescription: {
    marginBottom: 8,
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold",
  },
  comentCommonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  comentIcon: {
    paddingRight: 5,
  },
  comentPlace: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  comentText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
});

export default DefaultScreenPosts;
