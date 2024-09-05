import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";

const AddCoffee = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Add coffee</Text>
            
        </SafeAreaView>
    );
};

export default AddCoffee;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        padding: 24,
        backgroundColor: COLORS.almond,
    },
});
