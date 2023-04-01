import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  where,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
//import { getAuth } from "firebase/auth";

import { authSignOut } from "../../redux/auth/authOperations";
import { db, app } from "../../../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
  });
  const { userId } = useSelector((state) => state.auth);

  const getUserInfo = async () => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (user !== null) {
        setUserInfo({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      }
    } catch (error) {
      console.log("Error getting info: ", error);
    }
  };

  const getAllUserPost = async () => {
    try {
      // Отримати всі документи колекції "Posts"
      const postsRef = await collection(db, "posts");
      const q = query(
        postsRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      let posts = [];

      // Ітеруємось через кожен документ в колекції "Posts"
      for (const post of snapshot.docs) {
        // Отримати кількість документів з підколекції "Comments" для кожного документа "Post"
        const postRef = await doc(db, "posts", post.id);
        const commentsRef = collection(postRef, "comments");
        const commentsSnapshot = await getDocs(commentsRef);
        const commentsCount = commentsSnapshot.size;

        // Додати новий об'єкт до масиву "posts", включаючи кількість коментарів
        posts.push({
          id: post.id,
          ...post.data(),
          commentsCount,
        });
      }

      setUserPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
      getAllUserPost();
    }, [])
  );

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/images/PhotoBG.jpg")}
      >
        <View style={styles.wrapperForm}>
          <View style={styles.avatarWrapper}>
            {userInfo.photoURL ? (
              <Image source={{ uri: userInfo.photoURL }} style={styles.image} />
            ) : (
              <Image source={require("../../assets/images/frame.png")} />
            )}
            <Feather
              name="plus-circle"
              size={25}
              color="#BDBDBD"
              style={styles.addAvatar}
            />
          </View>

          <View style={styles.header}>
            <View style={styles.headerContainer}></View>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              onPress={signOut}
              style={styles.icon}
            />
          </View>
          <View>
            <Text style={styles.title}>{userInfo.displayName}</Text>
          </View>

          <View style={styles.form}>
            <FlatList
              style={{ marginHorizontal: 16 }}
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.postImage}
                  />
                  <Text style={styles.postDescription}>{item.description}</Text>
                  <View style={styles.comentCommonContainer}>
                    <TouchableOpacity
                      style={styles.comentContainer}
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
                            ? styles.comentIconCount
                            : styles.comentIcon
                        }
                      />
                      <Text style={styles.comentText}>
                        {item.commentsCount}
                      </Text>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapperForm: {
    marginTop: 150,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingBottom: 14,
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
    width: "100%",
  },
  avatarWrapper: {
    position: "absolute",
    zIndex: 120,
    top: -60,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    bottom: 16,
    left: "90%",
    transform: [{ rotate: "45deg" }],
  },
  title: {
    marginTop: 32,
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontWeight: 500,
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
    paddingLeft: 5,
    transform: [{ scaleX: -1 }],
  },
  comentIconCount: {
    paddingLeft: 5,
    transform: [{ scaleX: -1 }],
    color: "#FF6C00",
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

export default ProfileScreen;
