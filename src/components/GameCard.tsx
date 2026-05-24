import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export const GameCard = ({ children, style }: { children: ReactNode; style?: ViewStyle }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(22,29,36,0.92)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2f3f4e',
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8
  }
});
