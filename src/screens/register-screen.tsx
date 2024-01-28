import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../models/auth.store";
import { BadRequestError, CredentialError } from "../services/api.types";
import { spacing } from "../theme/spacing";
import Colors from "../theme/colors";
import { RootStackParamList } from "../navigators/AppNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

interface IData {
  username: string;
  password: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { login, profile, token } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (data: IData) => {
    login(data.username, data.password)
      .then(() => {
        Alert.alert("Success", "Login success");
      })
      .catch((err: CredentialError & BadRequestError) => {
        Alert.alert("Error", err?.message || err?.errors[0]);
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: spacing.xxl + 8,
          fontWeight: "bold",
        }}
      >
        Register
      </Text>

      <Text
        style={{
          marginTop: spacing.xl + 4,
          opacity: 0.5,
          fontSize: spacing.xl,
        }}
      >
        Please fill the form below to create an account.
      </Text>

      <View
        style={{
          marginTop: spacing.xxl + 6,
          flexDirection: "column",
          gap: 20,
        }}
      >
        <TextInput
          value={username}
          autoCapitalize={"none"}
          onChangeText={(text) => setUsername(text)}
          placeholder="Email Address"
          style={styles.input}
          placeholderTextColor={"#4b5563"}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor={"#4b5563"}
        />

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: spacing.xl,
            paddingVertical: spacing.xxl - 12,
            borderRadius: 10,
          }}
          onPress={() => {
            handleSubmit({
              username,
              password,
            });
          }}
        >
          <Text
            style={{ textAlign: "center", color: Colors.white, fontSize: 16 }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: spacing.xl,
          gap: spacing.md,
        }}
      >
        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: Colors.primary, fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: spacing.xl,
    paddingVertical: spacing.xxl,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: spacing.xl,
    paddingVertical: spacing.xxl - 12,
    borderRadius: 10,
    fontSize: 17,
  },
});
