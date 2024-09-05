import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Platform,
    StatusBar,
    SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./context/AuthContext";
import { COLORS } from "./constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
    const [fontsLoaded] = useFonts({
        regular: require("./assets/fonts/Poppins-Regular.ttf"),
        bold: require("./assets/fonts/Poppins-Bold.ttf"),
        extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
        light: require("./assets/fonts/Poppins-Light.ttf"),
        medium: require("./assets/fonts/Poppins-Medium.ttf"),
        semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    });

    if (!fontsLoaded) {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.AndroidSafeArea}>
                    <AuthProvider>
                        <MainNavigator />
                    </AuthProvider>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE",
        alignItems: "center",
        justifyContent: "center",
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: COLORS.almond,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
