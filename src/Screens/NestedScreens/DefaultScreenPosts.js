import React, { useState, useCallback, useEffect } from "react";
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
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

import { authSignOut } from "../../redux/auth/authOperations";
import { db } from "../../../firebase/config";

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllPost();
    }, [])
  );

  const getAllPost = async () => {
    try {
      // Отримати всі документи колекції "Posts"
      const postsRef = await collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      let posts = [];

      // Ітеруємось через кожен документ в колекції "Posts"
      for (const post of snapshot.docs) {
        // Отримати кількість документів з підколекції "Comments" для кожного документа "Post"
        const postRef = await doc(db, "posts", post.id);
        const commentsRef = collection(postRef, "comments");
        const commentsSnapshot = await getDocs(commentsRef);
        const commentsCount = commentsSnapshot.size;

        // Отримати дані автора поста
        const userRef = doc(db, "users", post.data().userId);
        const userSnap = await getDoc(userRef);

        // Додати новий об'єкт до масиву "posts", включаючи кількість коментарів, та автора
        posts.push({
          id: post.id,
          ...post.data(),
          commentsCount,
          login: userSnap.data().login,
          email: userSnap.data().email,
          photoUser: userSnap.data().photoURL,
        });
      }

      setPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  };

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
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <View style={styles.userContainer}>
                <Image
                  source={{ uri: item.photoUser }}
                  style={styles.photoUser}
                />
                <View style={styles.infoUser}>
                  <Text style={styles.loginUser}>{item.login}</Text>
                  <Text style={styles.emailUser}>{item.email}</Text>
                </View>
              </View>
              <Image source={{ uri: item.photo }} style={styles.postImage} />
              <Text style={styles.postDescription}>{item.description}</Text>
              <View style={styles.commentCommonContainer}>
                <TouchableOpacity
                  style={styles.commentContainer}
                  onPress={() =>
                    navigation.navigate("Comments", { postId: item.id })
                  }
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={
                      item.commentsCount
                        ? styles.commentIconCount
                        : styles.commentIcon
                    }
                  />
                  <Text style={styles.commentText}>{item.commentsCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.commentContainer}
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
                    style={styles.commentIcon}
                  />
                  <Text style={styles.commentPlace}>{item.place}</Text>
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
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
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
  commentCommonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    paddingLeft: 5,
    transform: [{ scaleX: -1 }],
  },
  commentIconCount: {
    paddingLeft: 5,
    transform: [{ scaleX: -1 }],
    color: "#FF6C00",
  },
  commentPlace: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  commentText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  photoUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  infoUser: {
    justifyContent: "center",
    paddingLeft: 8,
  },
  loginUser: {
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold",
  },
  emailUser: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default DefaultScreenPosts;
