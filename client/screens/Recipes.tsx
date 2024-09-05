import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'

const Recipes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Recipes</Text>
    </SafeAreaView>
  )
}

export default Recipes


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: COLORS.almond,
    },
})