import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { width } from "../constants/screen";
import InputContainer from "../components/normalInputContainer";

const AddCoffee = () => {
    const [name, setName] = useState<string>("");
    const [roastery, setRoastery] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [processing, setProcessing] = useState<string>("");
    const [roastLevel, setRoastLevel] = useState<string>("");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <TouchableOpacity
                    style={{ alignSelf: "flex-end", flexDirection: "row" }}
                    onPress={() => console.log("Saving coffee")}
                >
                    <Text
                        style={{
                            fontFamily: "light",
                            fontSize: 15,
                            color: COLORS.espresso,
                        }}
                    >
                        Save{" "}
                    </Text>
                    <Feather name="save" size={20} color={COLORS.espresso} />
                </TouchableOpacity>
                <InputContainer
                    value={name}
                    onChange={setName}
                    placeholder="Name"
                />
                <InputContainer
                    value={roastery}
                    onChange={setRoastery}
                    placeholder="Roastery"
                />
                <InputContainer
                    value={country}
                    onChange={setCountry}
                    placeholder="Country"
                />
                <InputContainer
                    value={region}
                    onChange={setRegion}
                    placeholder="Region"
                />
                <InputContainer
                    value={processing}
                    onChange={setProcessing}
                    placeholder="Processing"
                />
                <InputContainer
                    value={roastLevel}
                    onChange={setRoastLevel}
                    placeholder="Roast level"
                />
            </ScrollView>
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
    innerContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
});
