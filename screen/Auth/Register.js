import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Btn from "../../components/Btn";

import customAxios from "../../config/customAxios";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const onPressRegister = async () => {
    try {
      const res = await customAxios.post("/user", {
        email,
        name,
        password,
        passwordConf,
      });
      const data = await res.data;
      if (res.status === 200) {
        alert(data.msg);
        navigation.navigate("Login");
      }
      //TODO: Else Statement not yet done.(erros for register=> invalid input, user exist...)
    } catch (error) {
      console.log("Register Error:", error);
    }
  };

  return (
    <View style={styles.main}>
      <Text>Register</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(pw) => setPassword(pw)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Password Confirmation"
          onChangeText={(pw) => setPasswordConf(pw)}
          secureTextEntry
        />
        <Btn title="Register" onPress={onPressRegister} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: { flex: 1, height: "100%", padding: 10 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    height: 50,
    borderBottomColor: "black",
    margin: 5,
  },
});
