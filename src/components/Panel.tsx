import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Panel = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.panel}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#121820',
    borderWidth: 1,
    borderColor: '#2d3a47',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14
  },
  title: { color: '#f7b940', fontWeight: '800', marginBottom: 10, fontSize: 16 }
});
