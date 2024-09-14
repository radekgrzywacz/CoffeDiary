import { createStackNavigator } from "@react-navigation/stack";
import Brewers from "../screens/Brewers";
import Profile from "../screens/Profile";
import { RootStackParamList } from "../types/navigationTypes";
import Grinders from "../screens/Grinders";

const Stack = createStackNavigator<RootStackParamList>();

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="ProfileScreen" component={Profile} />
            <Stack.Screen name="Brewers" component={Brewers} />
            <Stack.Screen name="Grinders" component={Grinders} />
        </Stack.Navigator>
    );
}

export default ProfileStack;
