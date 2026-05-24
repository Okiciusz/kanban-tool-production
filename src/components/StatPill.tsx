import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatPill = ({ label, value, color = '#5fb6ff' }: { label: string; value: string; color?: string }) => (
  <View style={styles.pill}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  pill: { backgroundColor: '#131a22', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: '#2b3947', flex: 1, marginRight: 8 },
  label: { color: '#8ea2b5', fontSize: 11, textTransform: 'uppercase' },
  value: { fontSize: 16, fontWeight: '800', marginTop: 4 }
});
