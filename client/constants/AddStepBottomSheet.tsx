import { View, Text, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { COLORS } from "./colors";

interface Props {
    title: string;
}

type Ref = BottomSheetModal;


const AddStepBottomSheet = forwardRef<Ref, Props>((props, ref) => {
    const snapPoints = useMemo(() => ["25%", "45%", "75%"], []);


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
            <View>
                <Text>{props.title}</Text>
            </View>
        </BottomSheetModal>
    );
});

export default AddStepBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
});
