import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useGame } from '../state/GameContext';
import { monetizationService, RewardType } from '../services/monetization';
import { GameCard } from '../components/GameCard';
import { GameButton } from '../components/GameButton';

export const ShopScreen = () => {
  const { addMoney, activateDoubleIncome, grantFreeUpgradeCharge, freeUpgradeCharges } = useGame();
  const [status, setStatus] = useState('Idle');
  const [ready, setReady] = useState(false);
  useEffect(() => { monetizationService.getAdAvailability().then((s) => setReady(s.rewardedReady)); }, []);
  const watch = async (t: RewardType) => { const r = await monetizationService.showRewardedAd(t); if (!r) return setStatus('Rewarded ad unavailable'); if (r.type === 'DOUBLE_INCOME_5_MIN') { activateDoubleIncome(5); setStatus('2x Income activated'); } else if (r.type === 'INSTANT_CASH') { addMoney(r.amount ?? 0); setStatus(`+$${r.amount ?? 0} granted`); } else { grantFreeUpgradeCharge(); setStatus('Free upgrade granted'); } };
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}><Text style={styles.header}>Shop</Text><GameCard><Text style={styles.title}>Rewarded Boosts</Text><Text style={styles.text}>Ad ready: {ready ? 'YES' : 'NO'} • Test mode: {monetizationService.isTestMode ? 'ON' : 'OFF'}</Text><GameButton text="Watch ad to double income for 5 minutes" onPress={() => watch('DOUBLE_INCOME_5_MIN')} disabled={!ready} color="#59c1ff" /><GameButton text="Watch ad to get instant cash" onPress={() => watch('INSTANT_CASH')} disabled={!ready} color="#61e39d" /><GameButton text="Watch ad to reduce upgrade cost once" onPress={() => watch('FREE_UPGRADE')} disabled={!ready} color="#ffb347" /><Text style={styles.text}>Free upgrade charges: {freeUpgradeCharges}</Text></GameCard><GameCard><Text style={styles.title}>Premium Currency</Text><Text style={styles.text}>Steel Gems (placeholder): Coming soon.</Text></GameCard><Text style={styles.status}>{status}</Text></ScrollView>;
};
const styles = StyleSheet.create({screen:{flex:1,backgroundColor:'#0d1117'},content:{padding:16,paddingBottom:30},header:{color:'#eff5fb',fontSize:28,fontWeight:'900',marginBottom:12},title:{color:'#e7f0f8',fontSize:18,fontWeight:'800'},text:{color:'#9db1c4',marginTop:8},status:{color:'#61e39d',marginTop:10,fontWeight:'700'}});
