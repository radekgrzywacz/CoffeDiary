import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { COLORS } from "../constants/colors";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LoginScreenNavigationProp } from "../types/navigationTypes";
import { useAuth } from "../context/AuthContext";

const screen = Dimensions.get("screen");

interface LoginProps {
  navigation: LoginScreenNavigationProp; // Type the navigation prop
}

export default function Login({ navigation }: LoginProps) {
  const [username, setUsername] = useState("radox");
  const [password, setPassword] = useState("password");
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      alert(result.msg);
      console.log(result.error)
      console.log(result)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/Dripper-Outline.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.logoFont}>Coffee Diary</Text>
      </View>

      <View style={styles.loginModule}>
        <Text
          style={{ fontFamily: "medium", fontSize: 27, color: COLORS.espresso }}
        >
          Sign in
        </Text>
        <View style={styles.form}>
          <Ionicons name="person" style={styles.icon} />

          <TextInput
            style={styles.textInput}
            onChangeText={setUsername}
            value={username}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            placeholder="Login"
          />
        </View>
        <View style={styles.form}>
          <Ionicons name="key" style={styles.icon} />

          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={login}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Sign in</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => console.log("Forgot Password?")}>
            <Text style={{ fontFamily: "light" }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bar}>
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            width: screen.width * 0.9,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              borderWidth: 0.6,
              borderColor: COLORS.espresso,
              width: screen.width * 0.4,
              height: 1,
              marginTop: 10,
              marginStart: "-3.7%",
            }}
          />
          <Text
            style={{
              fontFamily: "regular",
              paddingHorizontal: 4,
              color: COLORS.espresso,
            }}
          >
            Or
          </Text>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: COLORS.espresso,
              width: screen.width * 0.4,
              height: 1,
              marginTop: 10,
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 1 }}>
        <TouchableOpacity onPress={() => console.log("Facebook login")}>
          <View style={styles.facebook}>
            <Text style={{ fontSize: 25, color: "blue" }}>Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", bottom: screen.height * 0.02 }}>
        <TouchableOpacity
          style={{
            marginTop: screen.height * 0.1,
            flexDirection: "row",
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ fontFamily: "medium" }}>
            You don't have an account?{" "}
          </Text>
          <Text style={{ fontFamily: "bold" }}>Sign up!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: COLORS.almond,
  },
  logo: {
    width: screen.width * 0.5,
    height: screen.height * 0.3,
  },
  logoFont: {
    fontFamily: "bold",
    fontSize: 36,
    marginTop: -20,
    color: COLORS.espresso,
  },
  loginModule: {
    marginTop: 30,
  },
  form: {
    height: screen.height * 0.05,
    width: screen.width * 0.8,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: COLORS.espresso,
    backgroundColor: COLORS.vanilla,
    marginTop: screen.height * 0.01,
    flexDirection: "row",
    paddingStart: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 25,
    fontFamily: "regular",
  },
  icon: {
    fontSize: 25,
    marginTop: 5,
    marginEnd: 6,
    color: COLORS.espresso,
  },
  submitButton: {
    height: screen.height * 0.05,
    width: screen.width * 0.8,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: COLORS.espresso,
    backgroundColor: COLORS.pistache,
    marginTop: screen.height * 0.01,
    alignItems: "center",
  },
  submitText: {
    fontSize: 25,
    fontFamily: "regular",
    color: COLORS.espresso,
  },
  facebook: {
    borderWidth: 3,
    borderRadius: 8,
    borderColor: "blue",
    backgroundColor: "white",
    marginTop: screen.height * 0.01,
    alignItems: "center",
    width: screen.width * 0.8,
  },
  bar: {
    marginStart: screen.width * 0.05,
    marginTop: screen.height * 0.01,
  },
});
