export type RewardType = 'DOUBLE_INCOME_5_MIN' | 'INSTANT_CASH' | 'FREE_UPGRADE';

export interface AdAvailabilityState {
  rewardedReady: boolean;
  lastUpdatedAt: number;
}

export interface RewardResult {
  type: RewardType;
  amount?: number;
}

export interface MonetizationService {
  isTestMode: boolean;
  getAdAvailability: () => Promise<AdAvailabilityState>;
  showRewardedAd: (rewardType: RewardType) => Promise<RewardResult | null>;
}

const TEST_AD_STATE: AdAvailabilityState = {
  rewardedReady: true,
  lastUpdatedAt: Date.now()
};

class PlaceholderMonetizationService implements MonetizationService {
  isTestMode = true;

  async getAdAvailability(): Promise<AdAvailabilityState> {
    return { ...TEST_AD_STATE, lastUpdatedAt: Date.now() };
  }

  async showRewardedAd(rewardType: RewardType): Promise<RewardResult | null> {
    const availability = await this.getAdAvailability();
    if (!availability.rewardedReady) return null;

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 800));

    if (rewardType === 'INSTANT_CASH') {
      return { type: rewardType, amount: 300 };
    }

    return { type: rewardType };
  }
}

export const monetizationService: MonetizationService = new PlaceholderMonetizationService();

// Future AdMob integration note:
// Replace PlaceholderMonetizationService internals with SDK-backed loading/show logic,
// keep the same interface to avoid UI/state rewrites.
