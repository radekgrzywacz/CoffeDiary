import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'

const Diary = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Diary</Text>
    </SafeAreaView>
  )
}

export default Diary


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      padding: 24,
      backgroundColor: COLORS.almond,
    },
})
