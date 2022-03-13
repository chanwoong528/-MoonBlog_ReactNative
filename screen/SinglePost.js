import React, { useEffect, useState } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import RenderHtml from "react-native-render-html";

import customAxios from "../config/customAxios";
export default function SinglePost({ route, navigation }) {
  const { width } = useWindowDimensions();
  const { id } = route.params;
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getSinglePost = async (id) => {
      try {
        const res = await customAxios.get(`/post/${id}`);
        const data = await res.data;
        if (res.status === 200) {
          setPost(data.post);
          setLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSinglePost(id);
  }, []);

  return (
    <View>
      {!loaded ? (
        <ActivityIndicator animating={!loaded} color="black" />
      ) : (
        <>
          <Text>{post.title}</Text>
          <ScrollView>
            <RenderHtml contentWidth={width} source={{ html: post.body }} />
          </ScrollView>
        </>
      )}
    </View>
  );
}
