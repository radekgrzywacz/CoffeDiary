import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const {onLogout} = useAuth();
  return (
    <SafeAreaView>
      <Text>home</Text>
      <Button onPress={onLogout} title='logout' />
    </SafeAreaView>
  )
}

export default Home