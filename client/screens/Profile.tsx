import {
    View,
    Text,
    SafeAreaView,
    Button,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { API_URL, useAuth } from "../context/AuthContext";
import { Feather } from "@expo/vector-icons";
import useAxios from "../utils/useAxios";
import { COLORS } from "../constants/colors";
import ProfileSection from "../components/ProfileSection";
import { ProfileScreenNavigationProp } from "../types/navigationTypes";
import { width } from "../constants/screen";

export interface ProfileProps {
    navigation: ProfileScreenNavigationProp;
}

const Profile = ({ navigation }: ProfileProps) => {
    let api = useAxios();
    const { onLogout } = useAuth();
    const [test, setTest] = useState("");

    const logout = async () => {
        await api.post(`${API_URL}/logout`);
        if (onLogout) {
            await onLogout();
        } else {
            console.error("onLogout is undefined");
       }
    };

    const testReq = async () => {
        try {
            const result = await api.get(`${API_URL}/test`);
            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
        //setTest(result.data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View>
                    <Text style={styles.mediumText}>Gear:</Text>
                    <View
                        style={[
                            styles.sectionBox,
                            Platform.OS === "ios"
                                ? styles.shadow
                                : styles.elevation,
                        ]}
                    >
                        <ProfileSection
                            feather={false}
                            navigation={navigation}
                            text="Brewers"
                            iconName="icon-Generic-Dripper-Icon"
                            route="Brewers"
                        />
                        <ProfileSection
                            feather={false}
                            navigation={navigation}
                            text="Grinders"
                            iconName="icon-Grinder-icon"
                            route="Grinders"
                        />
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.mediumText}>Settings:</Text>
                    <View 
                        style={[
                            styles.sectionBox,
                            Platform.OS === "ios"
                                ? styles.shadow
                                : styles.elevation,
                        ]}
                    >
                        <ProfileSection
                            feather={true}
                            navigation={navigation}
                            text="Profile settings"
                            iconName="settings"
                            route="Grinders"
                        />
                    </View>
                </View>

                <Button onPress={testReq} title="test" />
                <Button onPress={logout} title="logout" />
                <Button onPress={onLogout} title="safe logout" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.almond,
    },
    mediumText: {
        fontFamily: "medium",
        fontSize: 19,
    },
    sectionBox: {
        backgroundColor: COLORS.vanilla,
        borderRadius: 10,
        marginTop: 5,
        width: width * 0.9,
        flex: 1
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
