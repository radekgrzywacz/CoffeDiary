import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { width } from "../constants/screen";
import InputContainer from "../components/normalInputContainer";
import RNDateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Coffee } from "../types/Coffee";
import useAxios from "../utils/useAxios";
import { API_URL } from "../context/AuthContext";
import { useCoffees } from "../context/CoffeeContext";

const AddCoffee = () => {
    const api = useAxios();
    const { addCoffee } = useCoffees();
    const [name, setName] = useState<string>("");
    const [roastery, setRoastery] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [processing, setProcessing] = useState<string>("");
    const [roastLevel, setRoastLevel] = useState<string>("");
    const [roastDate, setRoastDate] = useState<Date>(new Date());

    const handleRoastDateChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {
        if (event.type === "set" && selectedDate) {
            setRoastDate(selectedDate);
        }
    };

    const onSave = async () => {
        const newCoffee: Coffee = {
            name: name,
            roastery: roastery,
            country: country,
            region: region,
            processing: processing,
            roastLevel: roastLevel,
            roastDate: roastDate,
        };

        if (name === "" || roastery === "") {
            alert("Please insert name and roastery");
        } else {
            try {
                addCoffee(newCoffee);
                setName("");
                setRoastery("");
                setCountry("");
                setRegion("");
                setProcessing("");
                setRoastLevel("");
                setRoastDate(new Date());
            } catch (e: any) {
                const errorMessage =
                    e.response.data.error || "An error occurred";
                return { error: true, msg: errorMessage };
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <TouchableOpacity
                    style={{ alignSelf: "flex-end", flexDirection: "row" }}
                    onPress={onSave}
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
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "medium",
                            fontSize: 19,
                        }}
                    >
                        Roast date:
                    </Text>
                    <RNDateTimePicker
                        value={roastDate}
                        onChange={handleRoastDateChange}
                        style={{ alignSelf: "flex-start" }}
                    />
                </View>
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
