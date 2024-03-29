import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../../../firebase/config";

const CommentsScreen = ({ navigation, route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [post, setPost] = useState({});
  const { userId } = useSelector((state) => state.auth);
  const flatListRef = useRef(null);

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  function keyboardHide() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  const createComment = async () => {
    if (!comment) {
      keyboardHide();
      return;
    }

    try {
      const docRef = await doc(db, "posts", postId);
      await addDoc(collection(docRef, "comments"), {
        comment,
        userId,
        createdAt: Date.now().toString(),
      });
      setComment("");
      await getAllComments();
      keyboardHide();
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getAllComments = async () => {
    const docRef = await doc(db, "posts", postId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({ ...docSnap.data() });
    } else {
      console.log("No such document!");
    }

    const commentRef = await collection(docRef, "comments");
    const q = query(commentRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    let comments = [];

    // Ітеруємось через кожен документ в колекції "comments"
    for (const comment of snapshot.docs) {
      // Отримати дані автора поста
      const userRef = doc(db, "users", comment.data().userId);
      const userSnap = await getDoc(userRef);
      // Додати новий об'єкт до масиву "comments", включаючи автора
      comments.push({
        id: comment.id,
        comment: comment.data().comment,
        createdAt: comment.data().createdAt,
        photoUser: userSnap.data().photoURL,
        login: userSnap.data().login,
      });
    }
    setAllComments(comments);
  };

  const renderItem = ({ item, index }) => (
    <View
      style={
        index % 2 === 0
          ? styles.commentContainerEven
          : styles.commentContainerOdd
      }
    >
      <View
        style={
          index % 2 === 0 ? styles.imageContainerEven : styles.imageContainerOdd
        }
      >
        <Image source={{ uri: item.photoUser }} style={styles.photoUser} />
      </View>
      <View style={styles.textComment}>
        <Text
          style={
            index % 2 === 0
              ? styles.textCommentLoginEven
              : styles.textCommentLoginOdd
          }
        >
          {item.login}
        </Text>
        <Text style={styles.textCommentText}>{item.comment}</Text>
        <Text
          style={
            index % 2 === 0
              ? styles.textCommentDateEven
              : styles.textCommentDateOdd
          }
        >
          {Date(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.header}>
        <Feather
          name="arrow-left"
          size={24}
          color="#BDBDBD"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Comments</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Image source={{ uri: post.photo }} style={styles.postImage} />
        <FlatList
          data={allComments}
          removeClippedSubviews={true}
          initialNumToRender={10}
          scrollEventThrottle={1}
          ref={flatListRef}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.input,
              borderColor: isFocus ? `#FF6C00` : `#E8E8E8`,
            }}
          >
            <TextInput
              style={styles.inputText}
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
              placeholder="Comment..."
              value={comment}
              onChangeText={(value) => {
                setComment(value);
              }}
            />
            <TouchableOpacity style={styles.sendGroup} onPress={createComment}>
              <View style={styles.sendIcon}>
                <Feather name="arrow-up" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 30,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    padding: 10,
    marginTop: 16,
    marginBottom: 16,
    color: "#BDBDBD",
  },
  inputText: {
    flex: 1,
  },
  sendGroup: {
    padding: 8,
  },
  sendIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  commentContainerEven: {
    flexDirection: "row-reverse",
    marginBottom: 24,
  },
  commentContainerOdd: {
    flexDirection: "row",
    marginBottom: 24,
  },
  imageContainerEven: {
    marginLeft: 16,
  },
  imageContainerOdd: {
    marginRight: 16,
    // width: 28,
    // height: 28,
  },
  textComment: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderRadius: 6,
  },
  textCommentLoginEven: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textCommentLoginOdd: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-end",
  },
  textCommentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  textCommentDateEven: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  textCommentDateOdd: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
  photoUser: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
});

export default CommentsScreen;
