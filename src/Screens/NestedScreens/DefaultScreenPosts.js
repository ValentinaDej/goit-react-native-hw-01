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
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";

import { authSignOut } from "../../redux/auth/authOperations";
import { db } from "../../../firebase/config";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const data = querySnapshot.docs;
    setPosts(data.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useFocusEffect(() => {
    getAllPost();
  });

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };

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
          onPress={signOut}
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
              <Image source={{ uri: item.photo }} style={styles.postImage} />
              <Text style={styles.postDescription}>{item.description}</Text>
              <View style={styles.comentCommonContainer}>
                <TouchableOpacity
                  style={styles.comentContainer}
                  onPress={() =>
                    // navigation.navigate("Comments", {
                    //   screenOptions: { tabBarStyle: { display: "none" } },
                    // })
                    navigation.navigate("Comments", { postId: item.id })
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
                    const location = item.location;
                    const description = item.description;
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
                  <Text style={styles.comentPlace}>{item.place}</Text>
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
