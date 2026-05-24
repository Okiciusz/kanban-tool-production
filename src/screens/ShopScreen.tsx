import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Panel } from '../components/Panel';
import { PrimaryButton } from '../components/PrimaryButton';
import { monetizationService, RewardType } from '../services/monetization';
import { useGame } from '../state/GameContext';

export const ShopScreen = () => {
  const { addMoney, activateDoubleIncome, grantFreeUpgradeCharge, freeUpgradeCharges, doubleIncomeActiveUntil } = useGame();
  const [status, setStatus] = useState('Idle');
  const [rewardedReady, setRewardedReady] = useState(false);

  useEffect(() => {
    monetizationService.getAdAvailability().then((s) => setRewardedReady(s.rewardedReady));
  }, []);

  const watchAd = async (rewardType: RewardType) => {
    setStatus(`Loading ad for ${rewardType}...`);
    const result = await monetizationService.showRewardedAd(rewardType);
    if (!result) {
      setStatus('Rewarded ad is unavailable right now.');
      return;
    }

    if (result.type === 'DOUBLE_INCOME_5_MIN') {
      activateDoubleIncome(5);
      setStatus('Reward granted: Double income active for 5 minutes.');
      return;
    }

    if (result.type === 'INSTANT_CASH') {
      const gain = result.amount ?? 0;
      addMoney(gain);
      setStatus(`Reward granted: +$${gain} instant cash.`);
      return;
    }

    grantFreeUpgradeCharge();
    setStatus('Reward granted: 1 free upgrade charge.');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Panel title="Monetization Sandbox (AdMob-ready structure)">
        <Text style={styles.text}>Test mode: {monetizationService.isTestMode ? 'ON' : 'OFF'}</Text>
        <Text style={styles.text}>Rewarded ad ready: {rewardedReady ? 'YES' : 'NO'}</Text>
        <Text style={styles.text}>Free upgrade charges: {freeUpgradeCharges}</Text>
        <Text style={styles.text}>
          Double income active: {Date.now() < doubleIncomeActiveUntil ? 'YES' : 'NO'}
        </Text>
      </Panel>

      <Panel title="Rewarded Ads">
        <PrimaryButton text="Watch ad to double income for 5 minutes" onPress={() => watchAd('DOUBLE_INCOME_5_MIN')} disabled={!rewardedReady} />
        <PrimaryButton text="Watch ad to get instant cash" onPress={() => watchAd('INSTANT_CASH')} disabled={!rewardedReady} />
        <PrimaryButton text="Watch ad to reduce upgrade cost once" onPress={() => watchAd('FREE_UPGRADE')} disabled={!rewardedReady} />
      </Panel>

      <Text style={styles.status}>{status}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#101316' },
  content: { padding: 16 },
  text: { color: '#d8e2ea', marginBottom: 6 },
  status: { color: '#55d38a', marginTop: 12 }
});
