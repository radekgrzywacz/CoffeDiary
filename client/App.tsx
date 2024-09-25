import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Platform,
    StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./context/AuthContext";
import { COLORS } from "./constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createIconSet } from "@expo/vector-icons";
import glyphMap from "./assets/fonts/unicodesMap.json";
import { BrewerProvider } from "./context/BrewerContext";
import { RecipeProvider } from "./context/RecipeContext";
import { CoffeeProvider } from "./context/CoffeeContext";

export const CoffeeIcon = createIconSet(glyphMap, "Coffee", "Coffee.ttf");

export default function App() {
    const [fontsLoaded] = useFonts({
        regular: require("./assets/fonts/Poppins-Regular.ttf"),
        bold: require("./assets/fonts/Poppins-Bold.ttf"),
        extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
        light: require("./assets/fonts/Poppins-Light.ttf"),
        medium: require("./assets/fonts/Poppins-Medium.ttf"),
        semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
        Coffee: require("./assets/fonts/Coffee.ttf"),
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
                        <BrewerProvider>
                            <RecipeProvider>
                                <CoffeeProvider>
                                    <MainNavigator />
                                </CoffeeProvider>
                            </RecipeProvider>
                        </BrewerProvider>
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
