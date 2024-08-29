import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/login';


const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false}}>
        <AuthStack.Screen name="Login" component={Login}/>
    </AuthStack.Navigator>
  )
}

export default AuthNavigator