import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "#FFFFFF" : "#007AFF",
        tabBarInactiveTintColor: isDark ? "#8E8E93" : "#8E8E93",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: 2,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 35,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: isDark ? 0.5 : 0.15,
          shadowRadius: 8,
          paddingBottom: 0,
          paddingHorizontal: 20,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={Platform.OS === "ios" ? 90 : 100}
            tint={isDark ? "dark" : "light"}
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: 35, overflow: "hidden" },
            ]}
          />
        ),
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol
                size={24}
                name={focused ? "map.fill" : "map"}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="on-campus"
        options={{
          title: "On Campus",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol
                size={24}
                name={focused ? "building.2.fill" : "building.2"}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="grubs"
        options={{
          title: "Grubs",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol
                size={24}
                name={focused ? "fork.knife" : "fork.knife"}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 32,
  },
});
