import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

// Helper function to create an array of numbers as strings
const createArray = (length: number): string[] => {
    const arr: string[] = [];
    let i = 0;
    while (i < length) {
        arr.push(i.toString());
        i += 1;
    }
    return arr;
};

// Define available minutes and seconds
const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

// Interface for timer values
interface TimerValues {
    selectedMinutes: number;
    selectedSeconds: number;
}

// TimerPicker Component
const TimerPicker = ({ timerValues, onChange }: { timerValues: TimerValues, onChange: (newValues: TimerValues) => void }) => {
    return (
        <View style={styles.pickerContainer}>
            {/* Seconds Picker */}
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={timerValues.selectedSeconds}
                mode="dropdown"
                onValueChange={(seconds: number) => {
                    onChange({
                        ...timerValues,
                        selectedSeconds: seconds,
                    });
                }}
            >
                {AVAILABLE_SECONDS.map((value) => (
                    <Picker.Item key={value} label={value} value={parseInt(value)} />
                ))}
            </Picker>
            <Text style={styles.pickerLabel}>Seconds</Text>

            {/* Minutes Picker */}
            <Picker
                style={styles.picker}
                selectedValue={timerValues.selectedMinutes}
                itemStyle={styles.pickerItem}
                onValueChange={(minutes: number) => {
                    onChange({
                        ...timerValues,
                        selectedMinutes: minutes,
                    });
                }}
            >
                {AVAILABLE_MINUTES.map((value) => (
                    <Picker.Item key={value} label={value} value={parseInt(value)} />
                ))}
            </Picker>
            <Text style={styles.pickerLabel}>Minutes</Text>
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    picker: {
        height: 150, // Adjust height to control how many items are visible
        width: 90,
    },
    pickerItem: {
        fontSize: 15, // Font size of picker items
        height: 110, // Control height of each picker item
    },
    pickerLabel: {
        fontFamily: "regular",
        fontSize: 15,
        textAlign: "center",
        marginTop: 45,
    },
    pickerContainer: {
        flexDirection: "row",
        //alignItems: "center",
        //justifyContent: "space-between",
        //paddingTop: 10,
    },
});

export default TimerPicker;
