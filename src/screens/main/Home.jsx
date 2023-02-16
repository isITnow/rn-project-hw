import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
          paddingLeft: 80,
          paddingRight: 80,
          borderTopWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: 0.8,
        },
      }}
    >
      <MainTab.Screen
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return {
              height: 85,
              paddingLeft: 80,
              paddingRight: 80,
              borderTopWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
            };
          })(route),
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Ionicons
                  name="grid-outline"
                  size={24}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.3)",
          },
        })}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <AntDesign
                  name="plus"
                  size={24}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
          headerTitle: "Create a new post",
          headerStyle: {
            borderBottomWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.3)",
          },
          tabBarStyle: {
            display: "none",
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Posts")}
              style={styles.redirectBtn}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
        name="Create posts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  redirectBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconWrapper: {
    borderRadius: 20,
    paddingHorizontal: 26,
    paddingVertical: 8,
  },
});
