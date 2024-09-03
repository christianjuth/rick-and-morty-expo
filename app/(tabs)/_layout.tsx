import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from '@/lib/favorite-characters';

export default function TabLayout() {
  return (
    <Provider>
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
    </Provider>
  );
}
