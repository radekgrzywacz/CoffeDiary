import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { COLORS } from "./colors";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;


const SmallInputContainer = ({ value, onChange, isMargin, placeholder }: { value: number, onChange: (text: string) => void, isMargin: boolean, placeholder: string }) => {
    return (
        <View style={{ marginTop: 5 }}>
            <View style={[styles.smallTextInputFrame, { marginLeft: isMargin ? 40 : 0 }]}>
                {Number(value) > 0 && (
                    <Text style={{ fontFamily: "light", fontSize: 10 }}>{placeholder}</Text>
                )}
                <TextInput
                    style={[styles.textInput, { marginTop: Number(value) > 0 ? 0 : 5 }]}  // Corrected marginTop logic
                    onChangeText={onChange}
                    value={value} // Ensure it's a string
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    placeholder={placeholder}
                    inputMode="numeric"
                />
            </View>
        </View>
    );
};

export default SmallInputContainer;

const styles = StyleSheet.create({
    textInput: {
        fontFamily: "regular",
        fontSize: 19,
    },
    smallTextInputFrame: {
        borderWidth: 2,
        flex: 1,
        padding: 3,
        borderRadius: 10,
        borderColor: COLORS.espresso,
        width: width * 0.4,
        height: height * 0.06,
        paddingTop: 5,
    },
});
