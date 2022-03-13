import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Post from "../screen/Post";
import SinglePost from "../screen/SinglePost";
const PostStack = createStackNavigator();
const Poststack = () => {
  return (
    <PostStack.Navigator initialRouteName="Post">
      <PostStack.Screen name="Post" component={Post} />
      <PostStack.Screen name="Single" component={SinglePost} />
    </PostStack.Navigator>
  );
};

export default Poststack;
