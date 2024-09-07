import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import React, {
    forwardRef,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { COLORS } from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";

interface Props {
    value: string;
    onChange: (text: string) => void;
    timer: boolean;
}

interface TimerValues {
    selectedMinutes: number;
    selectedSeconds: number;
}

type Ref = BottomSheetModal;

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const createArray = (length: number) => {
    const arr = [];
    let i = 0;
    while (i < length) {
        arr.push(i.toString());
        i += 1;
    }
    return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

const AddStepBottomSheet = forwardRef<Ref, Props>((props, ref) => {
    const snapPoints = useMemo(() => ["25%", "45%", "75%"], []);
    const [timer, setTimer] = useState<boolean>(false);
    const [timerValues, setTimerValues] = useState<TimerValues>({
        selectedMinutes: 0,
        selectedSeconds: 0,
    });

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: COLORS.pistache }}
            handleIndicatorStyle={{ backgroundColor: COLORS.almond }}
        >
            <View style={styles.container}>
                <Text style={styles.mediumText}>Description:</Text>
                <View style={styles.textInputFrame}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={props.onChange}
                        value={props.value}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                        placeholder="Description"
                    />
                </View>
                <BouncyCheckbox
                    size={25}
                    fillColor={COLORS.vanilla}
                    unFillColor={COLORS.pistache}
                    text="Timer?"
                    style={{ marginTop: 15 }}
                    iconStyle={{
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: COLORS.espresso,
                    }}
                    innerIconStyle={{
                        borderRadius: 10,
                        borderColor: COLORS.espresso,
                        borderWidth: 0,
                    }}
                    textStyle={{
                        fontFamily: "Regular",
                        fontSize: 19,
                        color: "black",
                        textDecorationLine: "none",
                    }}
                    onPress={(isChecked: boolean) => {
                        setTimer(isChecked);
                    }}
                />
                {timer && (
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            selectedValue={timerValues.selectedSeconds}
                            mode="dropdown"
                            onValueChange={(seconds: number) => {
                                setTimerValues((prevState) => ({
                                    ...prevState,
                                    selectedSeconds: seconds,
                                }));
                            }}
                        >
                            {AVAILABLE_SECONDS.map((value) => (
                                <Picker.Item
                                    key={value}
                                    label={value}
                                    value={parseInt(value)}
                                />
                            ))}
                        </Picker>
                        <Text style={styles.pickerLabel}>Seconds</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={timerValues.selectedMinutes}
                            itemStyle={styles.pickerItem}
                            onValueChange={(minutes: number) => {
                                setTimerValues((prevState) => ({
                                    ...prevState,
                                    selectedMinutes: minutes,
                                }));
                            }}
                        >
                            {AVAILABLE_MINUTES.map((value) => (
                                <Picker.Item
                                    key={value}
                                    label={value}
                                    value={parseInt(value)}
                                />
                            ))}
                        </Picker>
                        <Text style={styles.pickerLabel}>Minutes</Text>
                    </View>
                )}
            </View>
        </BottomSheetModal>
    );
});

export default AddStepBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    textInputFrame: {
        borderWidth: 2,
        flex: 0,
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
    picker: {
        height: 30, // Adjust the height to show fewer items
        width: 90,
    },
    pickerItem: {
        fontSize: 15, // Increase font size for better readability
        height: 110, // Control the height of each item
    },
    pickerLabel: {
        fontFamily: "regular",
        fontSize: 15,
        textAlign: "center",
        marginTop: 45
    },
    pickerContainer: {
        flexDirection: "row",
        //alignItems: "center",
        //justifyContent: "space-between",
        //paddingTop: 10,
    },
});
