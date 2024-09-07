import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";

const SelectListCustom = ({
    value,
    onChange,
    text,
    data,
}: {
    value: string;
    onChange: Function;
    text: string;
    data: [];
}) => {
    return (
        <View style={{ marginTop: 5 }}>
            <Text style={styles.mediumText}>{text}:</Text>
            <SelectList
                setSelected={(value) => onChange(value)}
                data={data}
                save="value"
                fontFamily="regular"
                arrowicon={
                    <Feather
                        name="arrow-down"
                        size={19}
                        style={{ marginTop: -2 }}
                        color={COLORS.espresso}
                    />
                }
                search={false}
                boxStyles={{
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 1,
                    borderColor: COLORS.espresso,
                    height: 45,
                }}
                inputStyles={{
                    fontSize: 19,
                    marginTop: -6,
                    marginLeft: -15,
                }}
                dropdownStyles={{ borderColor: COLORS.espresso }}
            />
        </View>
    );
};

export default SelectListCustom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: COLORS.almond,
    },
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
});
