import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { machineDefinitions } from '../data/machines';
import { useGame } from '../state/GameContext';
import { PrimaryButton } from '../components/PrimaryButton';

export const MachinesScreen = () => {
  const { state, machineUpgradeCost, machineIncome, upgradeMachine, isMachineUnlocked } = useGame();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Machine Lines</Text>
      {machineDefinitions.map((machine) => {
        const cost = machineUpgradeCost(machine.id);
        const level = state.machines[machine.id];
        const unlocked = isMachineUnlocked(machine.id);

        return (
          <View key={machine.id} style={[styles.card, !unlocked && styles.lockedCard]}>
            <View style={styles.rowBetween}>
              <Text style={styles.name}>{machine.name}</Text>
              <Text style={[styles.statePill, unlocked ? styles.stateOpen : styles.stateLocked]}>{unlocked ? 'UNLOCKED' : 'LOCKED'}</Text>
            </View>

            <View style={styles.metricsGrid}>
              <Metric label="Level" value={String(level)} />
              <Metric label="Income/sec" value={`$${machineIncome(machine.id).toFixed(1)}`} />
              <Metric label="Upgrade Cost" value={`$${cost.toLocaleString()}`} />
              <Metric label="Unlock Price" value={`$${machine.unlockPrice.toLocaleString()}`} />
            </View>

            <PrimaryButton text={unlocked ? 'Upgrade Machine' : 'Locked'} onPress={() => upgradeMachine(machine.id)} disabled={!unlocked || state.money < cost} />
          </View>
        );
      })}
      <View style={{ height: 18 }} />
    </ScrollView>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0c0f13' },
  content: { padding: 16 },
  header: { color: '#f4f7fa', fontSize: 26, fontWeight: '800', marginBottom: 14 },
  card: {
    backgroundColor: '#121820',
    borderWidth: 1,
    borderColor: '#2d3a47',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  lockedCard: { opacity: 0.75, borderColor: '#4d2f2f' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  name: { color: '#e5eef7', fontSize: 18, fontWeight: '700' },
  statePill: { fontSize: 11, fontWeight: '800', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, overflow: 'hidden' },
  stateOpen: { color: '#6ae8ad', backgroundColor: '#1b3a33' },
  stateLocked: { color: '#ff9f9f', backgroundColor: '#402626' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  metricCard: { width: '50%', paddingVertical: 6 },
  metricLabel: { color: '#93a3b4', fontSize: 12, marginBottom: 2 },
  metricValue: { color: '#f7b940', fontSize: 16, fontWeight: '700' }
});
