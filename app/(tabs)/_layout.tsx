import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="characters/[id]"
        options={{
          // TODO: get name of character dynamically
          title: 'Character',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
