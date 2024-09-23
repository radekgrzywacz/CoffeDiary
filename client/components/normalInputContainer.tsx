import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import { width } from "../constants/screen";

const InputContainer = ({
    value,
    onChange,
    placeholder,
}: {
    value: string;
    onChange: (text: string) => void;
    placeholder: string;
}) => {
    return (
        <View style={{ marginTop: 5 }}>
            <Text style={styles.mediumText}>{placeholder}:</Text>
            <View style={styles.textInputFrame}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    placeholder="Name"
                />
            </View>
        </View>
    );
};

export default InputContainer;

const styles = StyleSheet.create({
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    textInputFrame: {
        borderWidth: 2,
        padding: 3,
        borderRadius: 10,
        borderColor: COLORS.espresso,
        width: width - 40,
        height: 40,
        paddingTop: 5,
    },
    textInput: {
        fontFamily: "regular",
        fontSize: 19,
    },
});
