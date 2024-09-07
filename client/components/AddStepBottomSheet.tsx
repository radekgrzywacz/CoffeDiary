import { View, Text, StyleSheet, Dimensions } from "react-native";
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
    TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { COLORS } from "../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";
import TimerPicker from "./TimerPicker";
import { Step } from "../screens/AddRecipe";

interface Props {
    onAddStep: (step: Step) => void;
    close: () => void;
}

interface TimerValues {
    selectedMinutes: number;
    selectedSeconds: number;
}

type Ref = BottomSheetModal;

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const AddStepBottomSheet = forwardRef<Ref, Props>((props, ref) => {
    const snapPoints = useMemo(() => ["25%", "45%", "75%"], []);
    const [timer, setTimer] = useState<boolean>(false);
    const [timerValues, setTimerValues] = useState<TimerValues>({
        selectedMinutes: 0,
        selectedSeconds: 0,
    });
    const [description, setDescription] = useState("");
    const step = { time: "", title: "", description: "" };

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

    const onSubmit = () => {
        const minutes = Number(timerValues.selectedMinutes); // Ensure numbers
        const seconds = Number(timerValues.selectedSeconds); // Ensure numbers

        // Calculate total time in seconds
        const time = seconds + minutes * 60;
        const newStep: Step = {
            time: time,
            title: "",
            description,
        };

        if (description !== "") {
            props.onAddStep(newStep);
            setDescription("");
            setTimerValues({
                selectedMinutes: 0,
                selectedSeconds: 0,
            });
            setTimer(false);
            props.close();
        } else {
            alert("Please, insert data!");
        }
    };

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
                        onChangeText={setDescription}
                        value={description}
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
                    <TimerPicker
                        timerValues={timerValues}
                        onChange={(newValues: TimerValues) =>
                            setTimerValues(newValues)
                        }
                    />
                )}
                <TouchableOpacity onPress={onSubmit}>
                    <View style={styles.submitButton}>
                        <Text style={styles.mediumText}>Submit</Text>
                    </View>
                </TouchableOpacity>
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
    submitButton: {
        alignSelf: "center",
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        borderColor: COLORS.espresso,
        backgroundColor: COLORS.vanilla,
    },
});
