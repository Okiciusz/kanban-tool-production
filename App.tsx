import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GameProvider } from './src/state/GameContext';
import { FactoryScreen } from './src/screens/FactoryScreen';
import { MachinesScreen } from './src/screens/MachinesScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { LeanUpgradesScreen } from './src/screens/LeanUpgradesScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { StartScreen } from './src/screens/StartScreen';

const Tab = createBottomTabNavigator();

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#0d1117', card: '#131a22', text: '#e5edf5', border: '#2d3f51', primary: '#ffb347' } };

const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Factory: 'factory',
  Machines: 'cog-outline',
  Orders: 'clipboard-list-outline',
  Lean: 'chart-timeline-variant',
  Shop: 'cart-outline',
  Settings: 'cog'
};

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <>
        <StatusBar style="light" />
        <StartScreen onStart={() => setStarted(true)} />
      </>
    );
  }

  return (
    <GameProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: '#131a22', borderTopColor: '#2d3f51', height: 64, paddingBottom: 8 },
            tabBarActiveTintColor: '#ffb347',
            tabBarInactiveTintColor: '#6e8399',
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />
          })}
        >
          <Tab.Screen name="Factory" component={FactoryScreen} />
          <Tab.Screen name="Machines" component={MachinesScreen} />
          <Tab.Screen name="Orders" component={OrdersScreen} />
          <Tab.Screen name="Lean" component={LeanUpgradesScreen} />
          <Tab.Screen name="Shop" component={ShopScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
