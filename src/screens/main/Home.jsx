import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

export default function Home(props) {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 85, paddingLeft: 80, paddingRight: 80 },
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
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Ionicons
                  style={
                    {
                      // ...styles.tabIconStyle,
                    }
                  }
                  name="grid-outline"
                  size={24}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log("Logout Click")}
              style={styles.redirectBtn}
            >
              <View style={styles.logoutIconWrapper}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          ),
        }}
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
                  // style={{
                  //   // ...styles.tabIconStyle,
                  //   backgroundColor: focused ? "#FF6C00" : "#ffffff",
                  // }}
                  name="plus"
                  size={24}
                  color={focused ? "#ffffff" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          },
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
                  // style={{
                  //   // ...styles.tabIconStyle,
                  //   backgroundColor: focused ? "#FF6C00" : "#ffffff",
                  // }}
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
  logoutIconWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconWrapper: {
    borderRadius: 20,
    paddingHorizontal: 26,
    paddingVertical: 8,
  },
});
