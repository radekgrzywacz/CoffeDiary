import { View, Text, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';
import useAxios from '../utils/useAxios';

const Home = () => {
  let api = useAxios();
  const {onLogout} = useAuth();
  const [test, setTest] = useState("");

  const testReq = async () => {
    try{
      const result = await api.get(`${API_URL}/test`);
      console.log(result.data)
    } catch(e) {
      console.log(e)
    }
    //setTest(result.data);
  }

  return (
    <SafeAreaView>
      <Text>home</Text>
      <Button onPress={testReq} title="test" />
      <Button onPress={onLogout} title='logout' />
    </SafeAreaView>
  )
}

export default Home