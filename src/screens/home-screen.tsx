import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import Colors from "../theme/colors";
import { spacing } from "../theme/spacing";
import { useAuthStore } from "../models/auth.store";
import { useFocusEffect } from "@react-navigation/native";
import api from "../services/api";

export function HomeScreen() {
  const { logout } = useAuthStore();

  // getJobs;

  useFocusEffect(
    useCallback(() => {
      api
        .getJobs()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  return (
    <View>
      <Text>HomeScreen</Text>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          padding: spacing.xl,
          paddingVertical: spacing.xxl - 12,
          borderRadius: 10,
        }}
        onPress={() => {
          logout();
        }}
      >
        <Text
          style={{ textAlign: "center", color: Colors.white, fontSize: 16 }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
