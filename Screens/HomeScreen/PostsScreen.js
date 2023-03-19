import React, { useState, useEffect } from "react";
import {
  Platform,
  View,
  Text,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const PostsScreen = ({ navigation, route }) => {
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
        <View>
          <Text>User info</Text>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Image
                source={{ uri: item.dataImage }}
                style={{ height: 240, width: "100%", borderRadius: 8 }}
              />
              <Text>{item.dataDescription}</Text>
              <Button
                title="go to map"
                onPress={() => {
                  const location = item.dataLocation;
                  const description = item.dataDescription;
                  return navigation.navigate("Map", { location, description });
                }}
              />
              <Button
                title="go to Comments"
                onPress={() => navigation.navigate("Comments")}
              />
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
});

export default PostsScreen;
