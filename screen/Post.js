import React, { useEffect, useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PostContext } from "../context/PostContext";

import customAxios from "../config/customAxios";
import PostList from "../components/Posts/PostList";

export default function Post({ navigation }) {
  const [topics, setTopics] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState();
  const { posts, postDispatch } = useContext(PostContext);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await customAxios.get("/post");
        const data = await res.data;

        if (res.status === 200) {
          postDispatch({ type: "LOAD_POSTS", payload: { posts: data.posts } });
        }
      } catch (error) {
        console.log("useEffect[getPosts]: ", error);
      }
    };
    getPosts();
  }, []);
  useEffect(() => {
    const getTopics = async () => {
      try {
        const res = await customAxios.get("/admin/topic");
        const data = await res.data;
        if (res.status === 200) {
          setTopics(data.topics);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTopics();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          style={styles.topic__container}
          data={topics}
          renderItem={({ item }) => (
            <Text
              style={
                selected === item._id
                  ? styles.item__text__selected
                  : styles.item__text
              }
              onPress={() => {
                setFiltered(posts.filter((post) => post.postType === item._id));
                setSelected(item._id);
              }}
            >
              {item.topic}
            </Text>
          )}
          keyExtractor={(topic, index) => index}
        />
        <PostList filteredPosts={filtered} navigation={navigation} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row" },
  topic__container: { backgroundColor: "#0c003d", flex: 1 },
  item__text: { margin: 10, color: "white" },
  item__text__selected: { margin: 10, color: "#0088b6" },
});
