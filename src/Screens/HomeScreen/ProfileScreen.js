import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
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
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { authSignOut } from "../../redux/auth/authOperations";
import { db, storage } from "../../../firebase/config";
import { authEditProfile } from "../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [temtUserPhoto, setTemtUserPhoto] = useState(null);
  const [currentUserPhoto, setCurrentUserPhoto] = useState(null);
  setCurrentUserPhoto;
  const { userId, login, photo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!temtUserPhoto) {
      setTemtUserPhoto(photo);
    }
  }, []);

  useEffect(() => {
    if (currentUserPhoto !== null && currentUserPhoto !== photo) {
      uploadPhotoToServer();
    }
  }, [currentUserPhoto]);

  useFocusEffect(
    useCallback(() => {
      getAllUserPost();
    }, [])
  );

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

  const pickUpPhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        await setTemtUserPhoto(result.assets[0].uri);
        await setCurrentUserPhoto(result.assets[0].uri);
      }
    } catch (E) {
      console.log("E", E);
    }
  };

  const uploadPhotoToServer = async () => {
    setLoading(true);
    const response = await fetch(temtUserPhoto);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    try {
      const storageRef = ref(storage, `/userAvatar/${uniquePostId}`);
      const metadata = {
        contentType: "image/jpeg",
      };
      await uploadBytes(storageRef, file, metadata);
      const processedPhoto = await getDownloadURL(storageRef);
      //console.log("processedPhoto", processedPhoto);
      await dispatch(authEditProfile({ photo: processedPhoto }));
      setLoading(false);
      return processedPhoto;
    } catch (error) {
      console.log("error", error.code);
    }
  };

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
            {temtUserPhoto ? (
              <Image source={{ uri: temtUserPhoto }} style={styles.image} />
            ) : (
              <Image source={require("../../assets/images/frame.png")} />
            )}
            <Feather
              name="plus-circle"
              size={25}
              color="#BDBDBD"
              style={styles.addAvatar}
              onPress={pickUpPhoto}
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
          <View style={styles.inputContainer}>
            {loading && (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#FF6C00" />
              </View>
            )}
            <View>
              <Text style={styles.title}>{login}</Text>
            </View>
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
                      <Text style={styles.commentText}>
                        {item.commentsCount}
                      </Text>
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
  inputContainer: {
    position: "relative",
  },
  activityIndicatorContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 999,
  },
});

export default ProfileScreen;
