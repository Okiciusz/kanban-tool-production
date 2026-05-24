import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState } from '../types/game';

const SAVE_KEY = 'steel_boss_save_v1';

export const saveGame = async (state: GameState) => {
  await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(state));
};

export const loadGame = async (): Promise<GameState | null> => {
  const raw = await AsyncStorage.getItem(SAVE_KEY);
  return raw ? (JSON.parse(raw) as GameState) : null;
};
