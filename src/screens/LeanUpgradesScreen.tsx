import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { leanUpgrades } from '../data/upgrades';
import { useGame } from '../state/GameContext';
import { GameCard } from '../components/GameCard';
import { GameButton } from '../components/GameButton';

const icons = { '5s': 'broom', tpm: 'tools', kaizen: 'chart-line', kanban: 'view-kanban', foreman: 'hard-hat' } as const;

export const LeanUpgradesScreen = () => {
  const { state, buyLeanUpgrade } = useGame();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Lean Upgrades</Text>
      {leanUpgrades.map((u) => {
        const bought = state.leanUpgradesOwned.includes(u.id);
        return <GameCard key={u.id}><View style={styles.row}><View style={styles.left}><MaterialCommunityIcons name={icons[u.id]} size={24} color="#59c1ff" /><Text style={styles.title}>{u.name}</Text></View><Text style={styles.mult}>x{u.incomeMultiplier}</Text></View><Text style={styles.desc}>{u.description}</Text><Text style={styles.cost}>Cost: ${u.cost.toLocaleString()}</Text><GameButton text={bought ? 'PURCHASED' : 'BUY UPGRADE'} onPress={() => buyLeanUpgrade(u.id)} disabled={bought || state.money < u.cost} color="#61e39d" /></GameCard>;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({screen:{flex:1,backgroundColor:'#0d1117'},content:{padding:16,paddingBottom:30},header:{color:'#eff5fb',fontSize:28,fontWeight:'900',marginBottom:12},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},left:{flexDirection:'row',alignItems:'center'},title:{color:'#e7f0f8',fontWeight:'800',fontSize:18,marginLeft:8},mult:{color:'#ffb347',fontWeight:'900'},desc:{color:'#a3b7c9',marginTop:8},cost:{color:'#59c1ff',fontWeight:'700',marginTop:8}});
