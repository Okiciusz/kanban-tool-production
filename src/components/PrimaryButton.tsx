import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export const PrimaryButton = ({ text, onPress, disabled }: { text: string; onPress: () => void; disabled?: boolean }) => (
  <Pressable style={[styles.button, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
    <Text style={styles.text}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: { backgroundColor: '#f7b940', borderRadius: 10, paddingVertical: 11, paddingHorizontal: 14, marginTop: 8 },
  disabled: { opacity: 0.45 },
  text: { color: '#101316', fontWeight: '800', textAlign: 'center', letterSpacing: 0.2 }
});
