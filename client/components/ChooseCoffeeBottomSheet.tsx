import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { COLORS } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { width } from "../constants/screen";
import { useCoffees } from "../context/CoffeeContext";
import { Coffee } from "../types/Coffee";
import { Recipe } from "../types/Recipe";

type Ref = BottomSheetModal;

interface Props {
    close: () => void;
    onSubmit: (id: number) => void;
}

const ChooseCoffeeBottomSheet = forwardRef<Ref, Props>((props, ref) => {
    const { coffees } = useCoffees();
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

    type ItemProps = { coffee: Coffee };

    const Item = ({ coffee }: ItemProps) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.onSubmit(coffee.id);
                    props.close();
                }}
            >
                <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={styles.title}>{coffee.name}</Text>
                            <Text style={styles.smallText}>
                                {coffee.country} | {coffee.roastery}
                            </Text>
                        </View>
                    </View>
                    <Feather
                        name="arrow-right"
                        size={19}
                        color={COLORS.black}
                        style={{ alignSelf: "flex-end" }}
                    />
                </View>
            </TouchableOpacity>
        );
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
            <BottomSheetFlatList
                data={coffees}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={({ item }) => <Item coffee={item} />}
                contentContainerStyle={[
                    styles.bottomFlatList,
                    Platform.OS === "ios" ? styles.shadow : styles.elevation,
                ]}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            borderBottomWidth: 2,
                            borderBottomColor: COLORS.espresso,
                            width: width * 0.85,
                            alignSelf: "center",
                        }}
                    ></View>
                )}
            />
        </BottomSheetModal>
    );
});

export default ChooseCoffeeBottomSheet;

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
    smallText: {
        fontFamily: "regular",
        fontSize: 15,
        color: COLORS.matcha,
    },
    item: {
        borderWidth: 0,
        borderColor: COLORS.espresso,
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 19,
        alignSelf: "flex-start",
    },
    bottomFlatList: {
        backgroundColor: COLORS.almond,
        width: width * 0.9,
        alignSelf: "center",
        borderRadius: 10,
    },
    shadow: {
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    elevation: {
        elevation: 5,
    },
});
