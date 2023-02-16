import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error("Get user posts error: ", error.message);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/background_2x.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.postsContainer}>
          <View style={styles.avatarWrapper}>
            <ImageBackground
              source={require("../../../assets/images/default_avatar.jpg")}
              style={styles.avatar}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={logOut}
            style={styles.redirectBtn}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{login}</Text>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.postWrapper}>
                <Image style={styles.image} source={{ uri: item.photo }} />
                <View style={styles.infoBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.infoWrapper}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                      style={styles.commentsWrapper}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.commentsCount}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate("Map", item)}
                      style={styles.locationWrapper}
                    >
                      <SimpleLineIcons
                        style={styles.locationIcon}
                        name="location-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.location}>{item.location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  redirectBtn: {
    position: "absolute",
    right: 0,
    top: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  postsContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontFamily: "Roboto-Regular",
    height: "85%",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    alignSelf: "center",
    transform: [{ translateY: -60 }],
    position: "absolute",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    height: 120,
    width: 120,
    resizeMode: "cover",
  },
  nameWrapper: {
    marginTop: 60,
    marginBottom: 30,
  },
  name: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.8,
    color: "#212121",
  },
  postWrapper: {
    paddingBottom: 20,
    marginTop: 10,
  },
  image: {
    borderRadius: 8,
    height: 240,
    width: "100%",
  },
  infoBox: {
    marginTop: 8,
    paddingHorizontal: 5,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.7,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  locationWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  locationIcon: {
    // marginRight: 5,
  },
  location: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  commentsWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  commentsCount: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
    letterSpacing: 0.7,
    marginLeft: 5,
  },
});
