import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Panel } from '../components/Panel';
import { PrimaryButton } from '../components/PrimaryButton';
import { useGame } from '../state/GameContext';

export const SettingsScreen = () => {
  const { resetSave } = useGame();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Panel title="Game Settings">
        <Text style={styles.text}>Platform target: Android via Expo.</Text>
        <Text style={styles.text}>Save: Local AsyncStorage auto-save enabled.</Text>
        <PrimaryButton text="Reset Save" onPress={resetSave} />
      </Panel>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#101316' },
  content: { padding: 16 },
  text: { color: '#d8e2ea', marginBottom: 6 }
});
