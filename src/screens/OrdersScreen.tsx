import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { orders } from '../data/orders';
import { useGame } from '../state/GameContext';
import { GameCard } from '../components/GameCard';
import { GameButton } from '../components/GameButton';

export const OrdersScreen = () => {
  const { state, completeOrder } = useGame();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Contracts</Text>
      {orders.map((o, idx) => {
        const done = state.completedOrders.includes(o.id);
        const eligible = state.lifetimeProduced >= o.requirement;
        const difficulty = idx < 1 ? 'Easy' : idx < 3 ? 'Medium' : 'Hard';
        return (
          <GameCard key={o.id}>
            <View style={styles.row}><Text style={styles.title}>{o.title}</Text><Text style={[styles.badge, done ? styles.done : eligible ? styles.ready : styles.locked]}>{done ? 'DONE' : eligible ? 'READY' : 'PENDING'}</Text></View>
            <View style={styles.meta}><MaterialCommunityIcons name="clipboard-check-outline" color="#59c1ff" size={16} /><Text style={styles.text}> Required: {o.requirement.toLocaleString()}</Text></View>
            <View style={styles.meta}><MaterialCommunityIcons name="cash-multiple" color="#61e39d" size={16} /><Text style={styles.text}> Reward: ${o.reward.toLocaleString()}</Text></View>
            <View style={styles.meta}><MaterialCommunityIcons name="speedometer" color="#ffb347" size={16} /><Text style={styles.text}> Difficulty: {difficulty}</Text></View>
            <GameButton text={done ? 'COMPLETED' : 'CLAIM CONTRACT'} onPress={() => completeOrder(o.id)} disabled={done || !eligible} color="#59c1ff" />
          </GameCard>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({screen:{flex:1,backgroundColor:'#0d1117'},content:{padding:16,paddingBottom:30},header:{color:'#eff5fb',fontSize:28,fontWeight:'900',marginBottom:12},row:{flexDirection:'row',justifyContent:'space-between'},title:{color:'#e7f0f8',fontSize:18,fontWeight:'800'},badge:{fontSize:11,fontWeight:'900'},done:{color:'#61e39d'},ready:{color:'#59c1ff'},locked:{color:'#ff9d9d'},meta:{flexDirection:'row',alignItems:'center',marginTop:8},text:{color:'#9db1c4'}});
