import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { baseUrl } from "../../config/customAxios";
import { AuthContext } from "../../context/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Btn from "../../components/Btn";

export default function Login({ navigation }) {
  const { userDispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    const req = { email, password };
    try {
      const res = await fetch(`${baseUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        //console.log("onSubmitLogin[response]: ", data);
        console.log("onSubmitLogin[response]: ", data.user);
        userDispatch({
          type: "LOGGED_IN_USER",
          payload: {
            isLoggedIn: data.isLoggedIn,
            isAdmin: data.user.admin,
            user: data.user,
          },
        });
        await AsyncStorage.setItem("accToken", data.accToken);
        await AsyncStorage.setItem("refToken", data.refToken);
        navigation.navigate("Landing");
      } else {
        if (res.status === 404 || res.status === 401) {
          //Wrong Email || Wrong PW
          alert(data.msg);
        }
      }
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  return (
    <View style={styles.main}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(pw) => setPassword(pw)}
        secureTextEntry
      />
      <Btn title="Log In" onPress={onPressLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  main: { height: "100%", padding: 10 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    height: 50,
    borderBottomColor: "black",
    margin: 5,
  },
});
