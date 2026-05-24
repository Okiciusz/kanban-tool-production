import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GameCard } from './GameCard';
import { GameButton } from './GameButton';

export const MachineCard = ({ icon, color, name, level, income, cost, unlockPrice, unlocked, progress, onUpgrade, disabled, cannotAfford }: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  name: string;
  level: number;
  income: string;
  cost: string;
  unlockPrice: string;
  unlocked: boolean;
  progress: number;
  onUpgrade: () => void;
  disabled: boolean;
  cannotAfford?: boolean;
}) => {
  const pulse = useRef(new Animated.Value(0.4)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0.4, duration: 800, useNativeDriver: true })
    ])).start();
  }, [pulse]);

  useEffect(() => {
    Animated.timing(progressAnim, { toValue: Math.min(1, Math.max(0, progress)), duration: 500, useNativeDriver: false }).start();
  }, [progress, progressAnim]);

  const handleUpgrade = () => {
    onUpgrade();
    if (unlocked && !disabled) {
      setFlash(true);
      setTimeout(() => setFlash(false), 260);
    }
  };

  const width = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <GameCard style={(!unlocked || flash) ? { ...( !unlocked ? styles.locked : {}), ...(flash ? styles.flash : {}) } : undefined}>
      <View style={styles.top}><View style={styles.left}><MaterialCommunityIcons name={icon} size={26} color={color} /><Text style={styles.name}>{name}</Text></View><Text style={[styles.badge, { color: unlocked ? '#61e39d' : '#ff8f8f' }]}>{unlocked ? 'UNLOCKED' : 'LOCKED'}</Text></View>
      <View style={styles.meta}><Text style={styles.text}>Level <Text style={styles.strong}>{level}</Text></Text><Text style={styles.text}>Income/s <Text style={styles.strongBlue}>{income}</Text></Text><Text style={styles.text}>Upgrade <Text style={styles.strong}>{cost}</Text></Text><Text style={styles.text}>Unlock <Text style={styles.strong}>{unlockPrice}</Text></Text></View>
      <View style={styles.activity}><Animated.View style={[styles.dot, { backgroundColor: color, opacity: pulse }]} /><Text style={styles.activityText}>{unlocked ? 'Machine Active' : 'Awaiting Unlock'}</Text></View>
      {!unlocked && <View style={styles.progressTrack}><Animated.View style={[styles.progressFill, { width }]} /></View>}
      <GameButton text={unlocked ? 'UPGRADE MACHINE' : 'LOCKED'} onPress={handleUpgrade} disabled={disabled} cannotAfford={cannotAfford} color={color} />
    </GameCard>
  );
};

const styles = StyleSheet.create({
  locked: { opacity: 0.8, borderColor: '#4b3030' },
  flash: { borderColor: '#61e39d', shadowOpacity: 0.6 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center' },
  name: { color: '#e7f0f8', fontWeight: '800', fontSize: 18, marginLeft: 8 },
  badge: { fontSize: 11, fontWeight: '900' },
  meta: { marginTop: 10 },
  text: { color: '#9db1c4', marginBottom: 4 },
  strong: { color: '#ffb347', fontWeight: '800' },
  strongBlue: { color: '#59c1ff', fontWeight: '800' },
  activity: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  dot: { width: 8, height: 8, borderRadius: 8, marginRight: 6 },
  activityText: { color: '#8da2b6', fontSize: 12 },
  progressTrack: { height: 8, backgroundColor: '#202b36', borderRadius: 8, marginTop: 8 },
  progressFill: { height: 8, backgroundColor: '#59c1ff', borderRadius: 8 }
});
