import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
          borderRadius: 30,
          height: 60,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          paddingBottom: 0,
        },
      }}>
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? (colorScheme === 'dark' ? '#333333' : '#f0f0f0') : 'transparent',
                borderRadius: 20,
                height: 40,
                width: 40,
                top: 10,
              }}>
              <IconSymbol size={24} name="map.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="on-campus"
        options={{
          title: 'On Campus',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? (colorScheme === 'dark' ? '#333333' : '#f0f0f0') : 'transparent',
                borderRadius: 20,
                height: 40,
                width: 40,
                top: 10,
              }}>
              <IconSymbol size={24} name="building.2.fill" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
