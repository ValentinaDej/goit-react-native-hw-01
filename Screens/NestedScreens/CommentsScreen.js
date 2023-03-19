import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ navigation }) => (
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
        <Text style={styles.headerText}>Comments</Text>
      </View>
    </View>
    <Text>CommentsScreen</Text>
  </View>
);

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
});

export default CommentsScreen;
