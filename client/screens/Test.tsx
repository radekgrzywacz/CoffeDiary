import { View, Text, SafeAreaView, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import axios from "axios";
import useAxios from "../utils/useAxios";
import { COLORS } from "../constants/colors";

const Test = () => {
  let api = useAxios();
  const { onLogout } = useAuth();
  const [test, setTest] = useState("");

  const logout = async () => {
    await api.post(`${API_URL}/logout`);
    if (onLogout) {
      await onLogout();
    } else {
      console.error("onLogout is undefined");
    }
  };

  const testReq = async () => {
    try {
      const result = await api.get(`${API_URL}/test`);
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
    //setTest(result.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>home</Text>
      <Button onPress={testReq} title="test" />
      <Button onPress={logout} title="logout" />
      <Button onPress={onLogout} title="safe logout" />
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      padding: 24,
      backgroundColor: COLORS.almond,
    },
})