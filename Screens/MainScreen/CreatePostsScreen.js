import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>CreatePostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;
