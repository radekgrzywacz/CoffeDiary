import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { COLORS } from "../constants/colors";
import { height, width } from "../constants/screen";
import { Brewer } from "../types/Brewer";

type Ref = BottomSheetModal;

interface Props {
    onAddBrewer: (brewer: Brewer) => void;
    close: () => void;
}

const AddBrewerBottomSheet = forwardRef<Ref, Props>((props, ref) => {
    const snapPoints = useMemo(() => ["25%", "45%", "75%"], []);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

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
        if (name !== "") {
            const newBrewer: Brewer = {
                id: undefined,
                name: name,
                description: description,
            };
            props.onAddBrewer(newBrewer);
            setName("");
            setDescription("");
            props.close();
        } else {
            alert("Please insert name.");
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
            <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                <Text style={styles.mediumText}>Name:</Text>
                <View style={styles.textInputFrame}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setName}
                        value={name}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                        placeholder="Description"
                    />
                </View>
                <Text style={styles.mediumText}>Description:</Text>
                <View style={[styles.textInputFrame, { height: height * 0.1 }]}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setDescription}
                        value={description}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                        placeholder="Description"
                        //multiline={true}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
                <Text style={styles.mediumText}>Submit</Text>
            </TouchableOpacity>
        </BottomSheetModal>
    );
});

export default AddBrewerBottomSheet;

const styles = StyleSheet.create({
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
