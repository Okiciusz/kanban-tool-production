import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGame } from '../state/GameContext';
import { GameCard } from '../components/GameCard';
import { GameButton } from '../components/GameButton';
import { StatPill } from '../components/StatPill';
import { FloatingReward } from '../components/FloatingReward';
import { formatCompact } from '../services/format';
import { hapticTap } from '../services/haptics';

export const FactoryScreen = () => {
  const { state, incomePerSecond, produceManual, offlineGain, doubleIncomeActiveUntil } = useGame();
  const [trigger, setTrigger] = useState(0);
  const boostActive = Date.now() < doubleIncomeActiveUntil;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Steel Boss</Text>
      <Text style={styles.subtitle}>Factory Tycoon Command Deck</Text>

      <View style={styles.row}>
        <StatPill label="Cash" value={`$${formatCompact(state.money)}`} color="#ffb347" />
        <StatPill label="Income/s" value={`$${formatCompact(incomePerSecond)}`} color="#59c1ff" />
      </View>

      <GameCard>
        <View style={styles.headRow}><Text style={styles.cardTitle}>Production Dashboard</Text>{boostActive && <Text style={styles.boost}>2X BOOST ACTIVE</Text>}</View>
        <Text style={styles.metric}>Lifetime Output: <Text style={styles.metricStrong}>{formatCompact(state.lifetimeProduced)}</Text></Text>
        {offlineGain > 0 && <Text style={styles.offline}>Offline Earnings +${Math.floor(offlineGain).toLocaleString()}</Text>}
        <View style={styles.ctaWrap}>
          <GameButton text="Manual Production +1" onPress={() => { hapticTap(); produceManual(); setTrigger((n) => n + 1); }} color="#ffb347" />
          <FloatingReward amount={1} trigger={trigger} />
        </View>
      </GameCard>

      <GameCard>
        <View style={styles.machineLine}><MaterialCommunityIcons name="factory" size={18} color="#59c1ff" /><Text style={styles.lineText}> Automated lines active and optimized for lean throughput.</Text></View>
      </GameCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0d1117' },
  content: { padding: 16, paddingBottom: 30 },
  title: { fontSize: 34, fontWeight: '900', color: '#ecf3fb' },
  subtitle: { color: '#8399ad', marginBottom: 14, marginTop: 2 },
  row: { flexDirection: 'row', marginBottom: 8 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#e7f0f8', fontSize: 19, fontWeight: '800' },
  boost: { color: '#61e39d', fontSize: 12, fontWeight: '800' },
  metric: { color: '#afc0d0', marginTop: 8 },
  metricStrong: { color: '#ffb347', fontWeight: '900' },
  offline: { color: '#61e39d', marginTop: 8, fontWeight: '700' },
  ctaWrap: { marginTop: 8, minHeight: 70 },
  machineLine: { flexDirection: 'row', alignItems: 'center' },
  lineText: { color: '#9cb2c5' }
});
