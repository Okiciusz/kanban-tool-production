import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MACHINE_COST_GROWTH, MACHINE_PRODUCTION_GROWTH, machineDefinitions } from '../data/machines';
import { leanUpgrades } from '../data/upgrades';
import { orders } from '../data/orders';
import { GameState, LeanUpgradeId, MachineId } from '../types/game';
import { loadGame, saveGame } from '../services/storage';

interface GameContextValue {
  state: GameState;
  incomePerSecond: number;
  offlineGain: number;
  doubleIncomeActiveUntil: number;
  freeUpgradeCharges: number;
  produceManual: () => void;
  upgradeMachine: (id: MachineId) => void;
  machineUpgradeCost: (id: MachineId) => number;
  machineIncome: (id: MachineId) => number;
  isMachineUnlocked: (id: MachineId) => boolean;
  buyLeanUpgrade: (id: LeanUpgradeId) => void;
  completeOrder: (id: string) => void;
  addMoney: (amount: number) => void;
  activateDoubleIncome: (minutes: number) => void;
  grantFreeUpgradeCharge: () => void;
  resetSave: () => void;
}

const defaultState: GameState = {
  money: 120,
  lifetimeProduced: 0,
  machines: { laser2d: 1, profileLaser: 0, pressBrake: 0, weldingStation: 0, grindingStation: 0, paintShop: 0, warehouse: 0 },
  leanUpgradesOwned: [],
  completedOrders: [],
  lastSavedAt: Date.now()
};

const GameContext = createContext<GameContextValue | undefined>(undefined);
const getMachineLevelIncome = (baseProduction: number, level: number) => (level <= 0 ? 0 : baseProduction * MACHINE_PRODUCTION_GROWTH ** (level - 1));

const calcIncome = (snapshot: GameState, doubleIncomeMultiplier = 1) => {
  const base = machineDefinitions.reduce((sum, machine) => sum + getMachineLevelIncome(machine.baseProduction, snapshot.machines[machine.id]), 0);
  const leanMult = leanUpgrades.reduce((acc, upgrade) => (snapshot.leanUpgradesOwned.includes(upgrade.id) ? acc * upgrade.incomeMultiplier : acc), 1);
  return base * leanMult * doubleIncomeMultiplier;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GameState>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [offlineGain, setOfflineGain] = useState(0);
  const [doubleIncomeActiveUntil, setDoubleIncomeActiveUntil] = useState(0);
  const [freeUpgradeCharges, setFreeUpgradeCharges] = useState(0);

  const multiplier = useMemo(() => leanUpgrades.reduce((acc, upgrade) => (state.leanUpgradesOwned.includes(upgrade.id) ? acc * upgrade.incomeMultiplier : acc), 1), [state.leanUpgradesOwned]);
  const doubleIncomeMultiplier = Date.now() < doubleIncomeActiveUntil ? 2 : 1;

  const incomePerSecond = useMemo(() => {
    const base = machineDefinitions.reduce((sum, machine) => sum + getMachineLevelIncome(machine.baseProduction, state.machines[machine.id]), 0);
    return base * multiplier * doubleIncomeMultiplier;
  }, [state.machines, multiplier, doubleIncomeActiveUntil]);

  const isMachineUnlocked = (id: MachineId) => {
    const machine = machineDefinitions.find((m) => m.id === id)!;
    return machine.unlockPrice === 0 || state.lifetimeProduced >= machine.unlockPrice;
  };

  useEffect(() => {
    (async () => {
      const existing = await loadGame();
      if (existing) {
        const secondsAway = Math.max(0, Math.floor((Date.now() - existing.lastSavedAt) / 1000));
        const awayIncome = Math.floor(calcIncome(existing) * secondsAway);
        setOfflineGain(awayIncome);
        setState({ ...existing, money: existing.money + awayIncome, lifetimeProduced: existing.lifetimeProduced + awayIncome });
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      setState((prev) => {
        const tickIncome = calcIncome(prev, Date.now() < doubleIncomeActiveUntil ? 2 : 1);
        return { ...prev, money: prev.money + tickIncome, lifetimeProduced: prev.lifetimeProduced + tickIncome };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loaded, doubleIncomeActiveUntil]);

  useEffect(() => {
    if (!loaded) return;
    saveGame({ ...state, lastSavedAt: Date.now() });
  }, [state, loaded]);

  const machineUpgradeCost = (id: MachineId) => {
    const machine = machineDefinitions.find((m) => m.id === id)!;
    const level = state.machines[id];
    return Math.floor(machine.baseCost * MACHINE_COST_GROWTH ** Math.max(0, level - 1));
  };

  const machineIncome = (id: MachineId) => {
    const machine = machineDefinitions.find((m) => m.id === id)!;
    return getMachineLevelIncome(machine.baseProduction, state.machines[id]) * multiplier * doubleIncomeMultiplier;
  };

  const upgradeMachine = (id: MachineId) => {
    setState((prev) => {
      const machine = machineDefinitions.find((m) => m.id === id)!;
      const unlocked = machine.unlockPrice === 0 || prev.lifetimeProduced >= machine.unlockPrice;
      if (!unlocked) return prev;
      const level = prev.machines[id];
      const cost = Math.floor(machine.baseCost * MACHINE_COST_GROWTH ** Math.max(0, level - 1));

      if (freeUpgradeCharges > 0) {
        setFreeUpgradeCharges((c) => Math.max(0, c - 1));
        return { ...prev, machines: { ...prev.machines, [id]: prev.machines[id] + 1 } };
      }

      if (prev.money < cost) return prev;
      return { ...prev, money: prev.money - cost, machines: { ...prev.machines, [id]: prev.machines[id] + 1 } };
    });
  };

  const buyLeanUpgrade = (id: LeanUpgradeId) => {
    const upgrade = leanUpgrades.find((u) => u.id === id)!;
    setState((prev) => (prev.money >= upgrade.cost && !prev.leanUpgradesOwned.includes(id) ? { ...prev, money: prev.money - upgrade.cost, leanUpgradesOwned: [...prev.leanUpgradesOwned, id] } : prev));
  };

  const completeOrder = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    setState((prev) => (prev.lifetimeProduced >= order.requirement && !prev.completedOrders.includes(id) ? { ...prev, money: prev.money + order.reward, completedOrders: [...prev.completedOrders, id] } : prev));
  };

  const addMoney = (amount: number) => setState((prev) => ({ ...prev, money: prev.money + amount, lifetimeProduced: prev.lifetimeProduced + amount }));
  const activateDoubleIncome = (minutes: number) => setDoubleIncomeActiveUntil(Date.now() + minutes * 60_000);
  const grantFreeUpgradeCharge = () => setFreeUpgradeCharges((c) => c + 1);
  const produceManual = () => setState((prev) => ({ ...prev, money: prev.money + 1, lifetimeProduced: prev.lifetimeProduced + 1 }));
  const resetSave = () => {
    setState(defaultState);
    setFreeUpgradeCharges(0);
    setDoubleIncomeActiveUntil(0);
  };

  return <GameContext.Provider value={{ state, incomePerSecond, offlineGain, doubleIncomeActiveUntil, freeUpgradeCharges, produceManual, upgradeMachine, machineUpgradeCost, machineIncome, isMachineUnlocked, buyLeanUpgrade, completeOrder, addMoney, activateDoubleIncome, grantFreeUpgradeCharge, resetSave }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
};
