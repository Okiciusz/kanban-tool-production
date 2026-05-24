import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const StartScreen = ({ onStart }: { onStart: () => void }) => {
  const glow = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.45, duration: 1200, useNativeDriver: true })
      ])
    ).start();
  }, [glow]);

  return (
    <View style={styles.screen}>
      <View style={styles.bgOverlay} />
      <MaterialCommunityIcons name="factory" size={80} color="#59c1ff" style={styles.icon} />
      <Animated.Text style={[styles.logo, { opacity: glow }]}>STEEL BOSS</Animated.Text>
      <Text style={styles.subtitle}>Factory Tycoon</Text>

      <TouchableOpacity style={styles.startButton} onPress={onStart} activeOpacity={0.9}>
        <Text style={styles.startText}>START GAME</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.smallBtn} activeOpacity={0.8}>
        <Text style={styles.smallText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.smallBtn} activeOpacity={0.8}>
        <Text style={styles.smallText}>Privacy Policy</Text>
      </TouchableOpacity>

      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#090d12', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0f141a',
    borderTopWidth: 1,
    borderTopColor: '#263747'
  },
  icon: { marginBottom: 12, zIndex: 1 },
  logo: { color: '#d9e7f5', fontSize: 44, fontWeight: '900', letterSpacing: 2.5, textShadowColor: '#59c1ff', textShadowRadius: 18, zIndex: 1 },
  subtitle: { color: '#94a9bd', fontSize: 20, marginTop: 6, marginBottom: 40, zIndex: 1 },
  startButton: {
    width: '100%',
    backgroundColor: '#ffb347',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8
  },
  startText: { color: '#10161d', fontWeight: '900', letterSpacing: 1, fontSize: 18 },
  smallBtn: { paddingVertical: 8, zIndex: 1 },
  smallText: { color: '#8aa2b8', fontSize: 14 },
  version: { position: 'absolute', bottom: 20, color: '#5f7488', fontSize: 12 }
});
