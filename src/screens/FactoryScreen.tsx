import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Panel } from '../components/Panel';
import { PrimaryButton } from '../components/PrimaryButton';
import { useGame } from '../state/GameContext';

export const FactoryScreen = () => {
  const { state, incomePerSecond, produceManual, offlineGain } = useGame();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Steel Boss Command Center</Text>
      <Text style={styles.subtitle}>Premium industrial dashboard</Text>

      <Panel title="Factory Overview">
        <View style={styles.statRow}><Text style={styles.label}>Cash</Text><Text style={styles.value}>${Math.floor(state.money).toLocaleString()}</Text></View>
        <View style={styles.statRow}><Text style={styles.label}>Income/sec</Text><Text style={styles.value}>${incomePerSecond.toFixed(1)}</Text></View>
        <View style={styles.statRow}><Text style={styles.label}>Lifetime Output</Text><Text style={styles.value}>{Math.floor(state.lifetimeProduced).toLocaleString()}</Text></View>
        {offlineGain > 0 && <Text style={styles.good}>Offline Earnings: +${Math.floor(offlineGain).toLocaleString()}</Text>}
        <PrimaryButton text="Manual Production (+1)" onPress={produceManual} />
      </Panel>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0c0f13' },
  content: { padding: 16 },
  title: { color: '#edf3f7', fontSize: 26, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#8ca0b2', marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#9badbc' },
  value: { color: '#f7b940', fontWeight: '700' },
  good: { color: '#55d38a', marginTop: 8, fontWeight: '700' }
});
