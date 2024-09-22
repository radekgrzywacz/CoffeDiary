import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    LayoutChangeEvent,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import TabBarButton from "./TabBarButton";
import { useEffect, useState } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { COLORS } from "../constants/colors";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
    const [layoutReady, setLayoutReady] = useState(false);

    const buttonWidth = dimensions.width / state.routes.length;

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        });
        setLayoutReady(true); // Set layout ready to true after the layout is calculated
    };

    const tabPositionX = useSharedValue(0);

    useEffect(() => {
        // Update tabPositionX only once after the layout is set
        if (layoutReady) {
            tabPositionX.value = buttonWidth * state.index;
        }
    }, [layoutReady]); // Run this effect only when layout is ready

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        };
    });

    return (
        <View onLayout={onTabbarLayout} style={styles.tabBar}>
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        position: "absolute",
                        backgroundColor: COLORS.almond,
                        borderRadius: 20,
                        marginHorizontal: 12,
                        height: dimensions.height - 20,
                        width: buttonWidth - 27.5,
                    },
                ]}
            />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, {
                        duration: 1500,
                    });
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? COLORS.espresso : "#222"}
                        label={label}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.pistache,
        marginHorizontal: 30,
        borderWidth: 2,
        borderColor: COLORS.espresso,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
});
