import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { GameCard } from '../components/GameCard';
import { GameButton } from '../components/GameButton';
import { useGame } from '../state/GameContext';

export const SettingsScreen = () => {
  const { resetSave } = useGame();
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}><Text style={styles.header}>Settings</Text><GameCard><Text style={styles.title}>Game</Text><Text style={styles.text}>Version: 1.0.0 (placeholder)</Text><Text style={styles.text}>Platform: Android / Expo</Text></GameCard><GameCard><Text style={styles.title}>Progress</Text><Text style={styles.text}>Reset will wipe local save data.</Text><GameButton text="RESET PROGRESS" onPress={resetSave} color="#ff8a65" /></GameCard></ScrollView>;
};

const styles = StyleSheet.create({screen:{flex:1,backgroundColor:'#0d1117'},content:{padding:16,paddingBottom:30},header:{color:'#eff5fb',fontSize:28,fontWeight:'900',marginBottom:12},title:{color:'#e7f0f8',fontSize:18,fontWeight:'800'},text:{color:'#9db1c4',marginTop:8}});
