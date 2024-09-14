import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/colors";
import { RegisterScreenNavigationProp } from "../types/navigationTypes";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";
import { height, width } from "../constants/screen";

interface RegisterProps {
  navigation: RegisterScreenNavigationProp;
}

export default function Register({ navigation }: RegisterProps) {
  const [username, setUsername] = useState("test");
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("Pa$$w0rd");
  const [confirmPassword, setConfirmPassword] = useState("Pa$$w0rd");
  const {onRegister, onLogin} = useAuth();

  const login = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(username, email, password, "USER");
    if(result && result.error) {
      let message = result.msg;
      alert(message.trim());
      console.log(message.trim())
    } else {
      login()
    }
  }

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

      <View style={styles.registerModule}>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 27,
            color: COLORS.espresso,
            alignSelf: "flex-start",
          }}
        >
          Sign up
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
          <Ionicons name="mail" style={styles.icon} />

          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            placeholder="Mail"
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

        <View style={styles.form}>
          <Ionicons name="key" style={styles.icon} />

          <TextInput
            style={styles.textInput}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            placeholder="Confirm password"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity onPress={password === confirmPassword ? register : () => alert("Confirm password must be the same as password")}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Sign up</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bar}>
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            width: width * 0.9,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              borderWidth: 0.6,
              borderColor: COLORS.espresso,
              width: width * 0.4,
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
              width: width * 0.4,
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
      <View style={{ position: "absolute", bottom: height * 0.02 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignSelf: "center" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ fontFamily: "medium" }}>
            Already have an account?{" "}
          </Text>
          <Text style={{ fontFamily: "bold" }}>Sign in!</Text>
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
    width: width * 0.5,
    height: height * 0.3,
  },
  logoFont: {
    fontFamily: "bold",
    fontSize: 36,
    marginTop: -20,
    color: COLORS.espresso,
  },
  registerModule: {
    marginTop: 30,
    alignItems: "center",
  },
  form: {
    height: height * 0.05,
    width: width * 0.8,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: COLORS.espresso,
    backgroundColor: COLORS.vanilla,
    marginTop: height * 0.01,
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
    height: height * 0.05,
    width: width * 0.8,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: COLORS.espresso,
    backgroundColor: COLORS.pistache,
    marginTop: height * 0.01,
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
    marginTop: height * 0.01,
    alignItems: "center",
    width: width * 0.8,
  },
  bar: {
    marginStart: width * 0.05,
    marginTop: height * 0.01,
  },
});
