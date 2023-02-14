import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <Image
              style={styles.image}
              source={{ uri: item.photoData.photo }}
            />
            <View style={styles.infoBox}>
              <Text style={styles.title}>{item.photoData.photoInfo.title}</Text>
              <View style={styles.infoWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Comments")}
                  style={styles.commentsWrapper}
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={styles.commentsCount}>15</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Map", item.photoData)}
                  style={styles.locationWrapper}
                >
                  <SimpleLineIcons
                    style={styles.locationIcon}
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.location}>
                    {item.photoData.photoInfo.location}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 16,
  },
  postWrapper: {
    // borderWidth: 1,
    marginTop: 32,
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
