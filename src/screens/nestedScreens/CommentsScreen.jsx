import { View, Text, StyleSheet } from "react-native";

export default CommentsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
