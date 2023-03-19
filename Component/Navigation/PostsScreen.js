// import React, { useState, useEffect } from "react";
// import {
//   Platform,
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";

// const PostsScreen = ({ navigation, route }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (route.params) {
//       setPosts((prevState) => [...prevState, route.params]);
//     }
//   }, [route.params]);

//   //console.log(posts);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
//       <View style={styles.header}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerText}>Posts</Text>
//         </View>
//         <Feather
//           name="log-out"
//           size={24}
//           color="#BDBDBD"
//           onPress={() => {
//             navigation.navigate("Login");
//           }}
//           style={styles.icon}
//         />
//       </View>

//       <View style={styles.form}>
//         <View>
//           <Text>User info</Text>
//         </View>
//         <FlatList
//           data={posts}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={{ marginBottom: 10 }}>
//               <Image
//                 source={{ uri: item.dataImage }}
//                 style={{ height: 240, width: "100%", borderRadius: 8 }}
//               />
//               <Text>{item.dataDescription}</Text>
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 30,
//     height: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E5E5",
//   },
//   headerContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   headerText: {
//     fontFamily: "Roboto-Medium",
//     fontSize: 17,
//     paddingLeft: 16,
//   },
//   icon: {
//     marginLeft: "auto",
//     paddingRight: 16,
//   },
//   form: {
//     marginHorizontal: 16,
//     flex: 1,
//     marginTop: 32,
//   },
// });

// export default PostsScreen;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../../Screens/NestedScreens/DefaultScreenPosts";
import CommentsScreen from "../../Screens/NestedScreens/CommentsScreen";
import MapScreen from "../../Screens/NestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
