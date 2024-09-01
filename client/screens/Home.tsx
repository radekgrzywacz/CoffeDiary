import { View, Text, SafeAreaView, Button } from "react-native";
import React, { useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import axios from "axios";
import useAxios from "../utils/useAxios";

const Home = () => {
  let api = useAxios();
  const { onLogout } = useAuth();
  const [test, setTest] = useState("");

  const logout = async () => {
    console.log("in logout");
    const result = await api.post(`${API_URL}/logout`);
    console.log("before onLogout");
    if (onLogout) {
      await onLogout();
    } else {
      console.error("onLogout is undefined");
    }
    console.log("after onLogout");
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
    <SafeAreaView>
      <Text>home</Text>
      <Button onPress={testReq} title="test" />
      <Button onPress={logout} title="logout" />
    </SafeAreaView>
  );
};

export default Home;
