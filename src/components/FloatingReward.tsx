import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export const FloatingReward = ({ amount, trigger }: { amount: number; trigger: number }) => {
  const y = useRef(new Animated.Value(0)).current;
  const o = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!trigger) return;
    y.setValue(0);
    o.setValue(1);
    Animated.parallel([
      Animated.timing(y, { toValue: -30, duration: 700, useNativeDriver: true }),
      Animated.timing(o, { toValue: 0, duration: 700, useNativeDriver: true })
    ]).start();
  }, [trigger]);

  return <Animated.View style={[styles.wrap, { opacity: o, transform: [{ translateY: y }] }]}><Text style={styles.text}>+${amount}</Text></Animated.View>;
};

const styles = StyleSheet.create({ wrap: { position: 'absolute', right: 24, top: 130 }, text: { color: '#61e39d', fontWeight: '900', fontSize: 22 } });
