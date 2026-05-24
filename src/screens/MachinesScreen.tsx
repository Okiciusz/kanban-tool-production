import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { machineDefinitions } from '../data/machines';
import { useGame } from '../state/GameContext';
import { MachineCard } from '../components/MachineCard';
import { formatCompact } from '../services/format';

const machineTheme = {
  laser2d: { icon: 'laser-pointer', color: '#59c1ff' },
  profileLaser: { icon: 'vector-square', color: '#49d7ff' },
  pressBrake: { icon: 'pipe-wrench', color: '#ffb347' },
  weldingStation: { icon: 'welding', color: '#ff8a65' },
  grindingStation: { icon: 'saw-blade', color: '#9ccc65' },
  paintShop: { icon: 'spray', color: '#4dd0e1' },
  warehouse: { icon: 'warehouse', color: '#b39ddb' }
} as const;

export const MachinesScreen = () => {
  const { state, machineUpgradeCost, machineIncome, upgradeMachine, isMachineUnlocked } = useGame();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Machine Floor</Text>
      {machineDefinitions.map((m) => {
        const unlocked = isMachineUnlocked(m.id);
        const progress = m.unlockPrice === 0 ? 1 : state.lifetimeProduced / m.unlockPrice;
        return <MachineCard key={m.id} icon={machineTheme[m.id].icon} color={machineTheme[m.id].color} name={m.name} level={state.machines[m.id]} income={`$${formatCompact(machineIncome(m.id))}`} cost={`$${formatCompact(machineUpgradeCost(m.id))}`} unlockPrice={`$${formatCompact(m.unlockPrice)}`} unlocked={unlocked} progress={progress} onUpgrade={() => upgradeMachine(m.id)} disabled={!unlocked || state.money < machineUpgradeCost(m.id)} cannotAfford={unlocked && state.money < machineUpgradeCost(m.id)} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0d1117' },
  content: { padding: 16, paddingBottom: 30 },
  header: { color: '#eff5fb', fontSize: 28, fontWeight: '900', marginBottom: 12 }
});
