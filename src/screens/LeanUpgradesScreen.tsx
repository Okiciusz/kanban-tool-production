import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { leanUpgrades } from '../data/upgrades';
import { useGame } from '../state/GameContext';
import { Panel } from '../components/Panel';
import { PrimaryButton } from '../components/PrimaryButton';

export const LeanUpgradesScreen = () => {
  const { state, buyLeanUpgrade } = useGame();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {leanUpgrades.map((upgrade) => {
        const bought = state.leanUpgradesOwned.includes(upgrade.id);
        return (
          <Panel key={upgrade.id} title={upgrade.name}>
            <Text style={styles.text}>{upgrade.description}</Text>
            <Text style={styles.text}>Cost: ${upgrade.cost}</Text>
            <Text style={styles.text}>Multiplier: x{upgrade.incomeMultiplier}</Text>
            <PrimaryButton text={bought ? 'Purchased' : 'Buy Upgrade'} onPress={() => buyLeanUpgrade(upgrade.id)} disabled={bought || state.money < upgrade.cost} />
          </Panel>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#101316' },
  content: { padding: 16 },
  text: { color: '#d8e2ea', marginBottom: 6 }
});
