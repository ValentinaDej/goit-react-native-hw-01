import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { doc, collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../../../firebase/config";

const CommentsScreen = ({ navigation, route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const createPost = async () => {
    try {
      const docRef = await doc(db, "posts", postId);
      await addDoc(collection(docRef, "comments"), {
        comment,
        login,
      });
      setComment("");
      getAllComments();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getAllComments = async () => {
    const docRef = await doc(db, "posts", postId);
    const querySnapshot = await getDocs(collection(docRef, "comments"));
    const data = querySnapshot.docs;
    setAllComments(data.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.header}>
        <Feather
          name="arrow-left"
          size={24}
          color="#BDBDBD"
          onPress={() => {
            navigation.navigate("DefaultScreen");
          }}
          style={styles.icon}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Comments</Text>
        </View>
      </View>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text>{item.login}</Text>
                <Text>{item.comment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Comment..."
            value={comment}
            onChangeText={(value) => {
              setComment(value);
            }}
          />
        </View>
        <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>add post</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#20b2aa",
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default CommentsScreen;
