import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor: '#F4BF96'
        },
        headerTintColor: '#1F1717'
    }}>
        <Stack.Screen name='index' options={{ title: 'Pokemon list' }} />
        <Stack.Screen name='(pokemon)/[id]' options={{ title: '' }} />
    </Stack>
}

export default Layout