import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from './src/state/GameContext';
import { FactoryScreen } from './src/screens/FactoryScreen';
import { MachinesScreen } from './src/screens/MachinesScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { LeanUpgradesScreen } from './src/screens/LeanUpgradesScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0c0f13',
    card: '#121820',
    text: '#e4edf2',
    border: '#2d3a47',
    primary: '#f7b940'
  }
};

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#121820', borderTopColor: '#2d3a47' }, tabBarActiveTintColor: '#f7b940', tabBarInactiveTintColor: '#7f92a5' }}>
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
