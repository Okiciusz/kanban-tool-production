import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

export const GameButton = ({ text, onPress, disabled, color = '#f7b940', cannotAfford }: { text: string; onPress: () => void; disabled?: boolean; color?: string; cannotAfford?: boolean }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [styles.btn, { backgroundColor: color }, pressed && !disabled && styles.pressed, disabled && styles.disabled, cannotAfford && styles.cannotAfford] as ViewStyle[]}
  >
    <Text style={[styles.text, cannotAfford && styles.textDim]}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: { borderRadius: 14, paddingVertical: 13, alignItems: 'center', marginTop: 8, shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 8, elevation: 5 },
  pressed: { transform: [{ scale: 0.96 }] },
  disabled: { opacity: 0.45 },
  cannotAfford: { backgroundColor: '#4b5561', borderWidth: 1, borderColor: '#677483' },
  text: { color: '#091017', fontWeight: '900', letterSpacing: 0.4 },
  textDim: { color: '#d5dde6' }
});
