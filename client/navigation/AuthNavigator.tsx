import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login';
import Register from '../screens/Register';
import { RootStackParamList } from '../types/navigationTypes';


const AuthStack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false}}>
        <AuthStack.Screen name="Login" component={Login}/>
        <AuthStack.Screen name="Register" component={Register}/>
    </AuthStack.Navigator>
  )
}

export default AuthNavigator;