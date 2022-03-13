import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";

export default function PostList({ filteredPosts, navigation }) {
  return (
    <>
      {filteredPosts.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.item__text}>No posts Found </Text>
        </View>
      ) : (
        <FlatList
          style={styles.container}
          data={filteredPosts}
          keyExtractor={(post, index) => index}
          renderItem={({ item }) => (
            <Text
              style={styles.item__text}
              onPress={() => navigation.push("Single", { id: item._id })}
            >
              {item.title}
            </Text>
          )}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00b5c1" },
  item__text: { margin: 10 },
});
