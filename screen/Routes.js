import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";

import Nav from "../components/Nav";

export default function Routes() {
  return (
    <>
      <Nav />
    </>
  );
}
