import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create post</Text>
      </View>
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
});

export default CreatePostsScreen;
